import { factory } from '@mswjs/data';
import { AccountModel, BoostModel, CompanyModel, EarnModel } from './models';
import { EARN_EVENTS } from './constants/earn-events';
import { MemberModel } from './models/member-model';
import { BOOSTS } from './constants/boosts';
import { GameModel } from './models/game-model';

export function createDb() {
  const db = factory({
    boost: BoostModel,
    earn: EarnModel,
    account: AccountModel,
    game: GameModel,
    member: MemberModel,
    company: CompanyModel,
  });

  BOOSTS.forEach((boost) => db.boost.create(boost));
  EARN_EVENTS.forEach((event) => db.earn.create(event));

  for (let i = 0; i < 2; i++) {
    db.member.create();
  }
  const members = db.member.getAll();

  for (let i = 0; i < 10; i++) {
    db.company.create({ members });
  }

  db.game.create({
    id: 'game',
    boosts: db.boost.getAll(),
    capital: 100000,
  });

  return db;
}
