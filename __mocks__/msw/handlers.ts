import { http, HttpResponse } from 'msw';
import { createDb, isAuthenticated } from './index';
import { parseInitData } from '@tma.js/sdk';
import { CreateCompanyRequestPayload } from '@entities/company/api';
import { sleep } from '@shared/libs';
import { EBoostType, EGameEventType, SyncMutationPayload } from '@entities/game/types';
import { GAME_CONFIG } from '@entities/game/constants/game-config';

const db = createDb();
const companiesHandlers = [...db.company.toHandlers('rest')];

const commonHandlers = [
  http.get('/account', async ({ request }) => {
    await isAuthenticated(request);

    const userHash = request.headers.get('Authorization')?.split(' ')[1];

    const account = db.account.findFirst({ where: { id: { equals: userHash } } });

    return HttpResponse.json(account);
  }),
  http.get('/game', async ({ request }) => {
    await isAuthenticated(request);

    const game = db.game.getAll()[0];

    return HttpResponse.json(game);
  }),
  http.post<never, SyncMutationPayload>('/game/sync', async ({ request }) => {
    await isAuthenticated(request);
    const body = await request.json();

    const userHash = request.headers.get('Authorization')?.split(' ')[1];

    if (userHash) {
      const multiTapBoost = db.boost.findFirst({ where: { id: { equals: EBoostType.multiTap } } });
      const rechargingBoost = db.boost.findFirst({ where: { id: { equals: EBoostType.rechargingSpeed } } });
      const maxEnergyBoost = db.boost.findFirst({ where: { id: { equals: EBoostType.rechargingSpeed } } });
      const autoClickerBoost = db.boost.findFirst({ where: { id: { equals: EBoostType.autoClicker } } });
      const game = db.game.findFirst({ where: { id: { equals: 'game' } } });

      if (multiTapBoost && rechargingBoost && maxEnergyBoost && game && autoClickerBoost) {
        const maxEnergy = maxEnergyBoost.level * GAME_CONFIG.energyMultiplier;

        db.game.update({
          where: { id: { equals: 'game' } },
          data: {
            capital: (prevValue) =>
              prevValue + multiTapBoost.level * body.tap + body[EGameEventType.autoClick] * autoClickerBoost.level,
            energy: (prevValue) => {
              const newEnergy = prevValue - body.tap * multiTapBoost.level + body.regen * rechargingBoost.level;

              return newEnergy > maxEnergy ? maxEnergy : newEnergy;
            },
          },
        });
      }
    }

    await sleep(250);
    const game = db.game.findFirst({ where: { id: { equals: 'game' } } });
    const respBody = { energy: game?.energy, capital: game?.capital, id: body.id };

    return HttpResponse.json(respBody);
  }),
  http.patch<{ id: string }>('/game/boosts/:id', async ({ request, params }) => {
    await isAuthenticated(request);

    const userHash = request.headers.get('Authorization')?.split(' ')[1];
    const boost = db.boost.findFirst({ where: { id: { equals: params.id } } });

    if (userHash && boost) {
      db.boost.update({
        where: { id: { equals: params.id } },
        data: {
          level: (prevValue) => prevValue + 1,
        },
      });
      db.game.update({
        where: { id: { equals: 'game' } },
        data: {
          capital: (prevValue) => prevValue - boost?.price,
        },
      });
    }

    const updatedBoost = db.boost.findFirst({ where: { id: { equals: params.id } } });
    await sleep(250);

    return HttpResponse.json(updatedBoost);
  }),
  http.post<never, { launchParams: string }>('/auth', async ({ request }) => {
    const { launchParams } = await request.json();
    const parsedLaunchParams = parseInitData(launchParams);
    const userHash = parsedLaunchParams.hash;

    if (userHash) {
      const company = db.company.getAll()[0];
      db.account.create({
        currentCompany: company,
        ownerCompanyId: company.id,
        friends: db.member.getAll(),
        id: userHash,
      });
    }

    return HttpResponse.json({ accessToken: userHash, refreshToken: 'refresh123' });
  }),
  http.get('/refreshToken', async () => {
    const accessToken = 'access123';
    const refreshToken = 'refresh123';

    return HttpResponse.json({ accessToken, refreshToken });
  }),
  http.get('/dictionaries', async ({ request }) => {
    await isAuthenticated(request);
    const dictionaries = { earnEvents: db.earn.getAll() };
    return HttpResponse.json(dictionaries);
  }),
  http.patch('/companies/:id/leave', async ({ request }) => {
    await isAuthenticated(request);

    const userHash = request.headers.get('Authorization')?.split(' ')[1];

    if (userHash) {
      db.account.update({ where: { id: { equals: userHash } }, data: { currentCompany: null } });
    }

    return HttpResponse.json();
  }),
  http.patch('/companies/:id/join', async ({ request, params }) => {
    await isAuthenticated(request);

    const userHash = request.headers.get('Authorization')?.split(' ')[1];

    const company = db.company.findFirst({ where: { id: { equals: params.id as string } } });

    if (userHash) {
      db.account.update({ where: { id: { equals: userHash } }, data: { currentCompany: company } });
    }

    return HttpResponse.json(company);
  }),
  http.post<never, CreateCompanyRequestPayload>('/companies', async ({ request }) => {
    await isAuthenticated(request);
    const userHash = request.headers.get('Authorization')?.split(' ')[1];
    const body = await request.json();

    const createdCompany = db.company.create({ name: body.name, earned: 0, field: body.field });

    if (userHash) {
      db.account.update({
        where: { id: { equals: userHash } },
        data: { currentCompany: createdCompany, ownerCompanyId: createdCompany.id },
      });
    }

    return HttpResponse.json(createdCompany);
  }),
  http.post<{ id: string }, never>('/claimReward/:id', async ({ request, params }) => {
    await isAuthenticated(request);

    await sleep(2000);

    const earnEvent = db.earn.findFirst({ where: { id: { equals: params.id } } });

    if (params.id && earnEvent) {
      db.earn.update({
        where: { id: { equals: params.id } },
        data: {
          isCompleted: true,
        },
      });
      db.game.update({
        where: { id: { equals: 'game' } },
        data: {
          capital: (prevValue) => prevValue + earnEvent.reward,
        },
      });
    } else {
      return new HttpResponse('', { status: 500 });
    }

    return HttpResponse.json();
  }),
];

export const handlers = [...companiesHandlers.filter((handler) => handler.info.method !== 'POST'), ...commonHandlers];
