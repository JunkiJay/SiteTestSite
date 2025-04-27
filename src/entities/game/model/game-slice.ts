import { createSlice } from '@reduxjs/toolkit';
import { GAME_SLICE_INITIAL_STATE, INITIAL_BOOSTS_STATE } from '../constants';
import { ClaimRewardPayload, EBoostType, EGameEventType, GameBoosts, SyncMutationResponse } from '../types';
import { gameApi } from '@entities/game/api';
import { GAME_CONFIG } from '@entities/game/constants/game-config';

export const gameSlice = createSlice({
  name: 'game',
  initialState: GAME_SLICE_INITIAL_STATE,
  reducers: {
    processTapEvent: (state) => {
      const multiTapLevel = state.boosts[EBoostType.multiTap].level;

      state.energy -= multiTapLevel;
      state.capital += multiTapLevel;
      state.lastSyncId += 1;
      state.gameEvents.push({ type: EGameEventType.tap, id: state.lastSyncId });
    },

    processRegenEvent: (state) => {
      const rechargingLevel = state.boosts[EBoostType.rechargingSpeed].level;
      const maxEnergy = state.boosts[EBoostType.maxEnergy].level * GAME_CONFIG.energyMultiplier;

      if (state.energy < maxEnergy) {
        const newEnergy = state.energy + rechargingLevel;
        state.energy = newEnergy > maxEnergy ? maxEnergy : newEnergy;

        state.lastSyncId += 1;
        state.gameEvents.push({ type: EGameEventType.regen, id: state.lastSyncId });
      }
    },

    processAutoClickEvent: (state) => {
      const autoClickerLevel = state.boosts[EBoostType.autoClicker].level;

      if (autoClickerLevel <= 0) {
        return;
      }

      state.capital += autoClickerLevel;
      state.lastSyncId += 1;
      state.gameEvents.push({ type: EGameEventType.autoClick, id: state.lastSyncId });
    },

    approveSyncId: (state, { payload }: { payload: SyncMutationResponse }) => {
      const lastApprovedEventIndex = state.gameEvents.findIndex(({ id }) => id === payload.id);
      const multiTapLevel = state.boosts[EBoostType.multiTap].level;
      const rechargingLevel = state.boosts[EBoostType.rechargingSpeed].level;
      const maxEnergyLevel = state.boosts[EBoostType.maxEnergy].level;
      const autoClickerLevel = state.boosts[EBoostType.autoClicker].level;
      const maxEnergy = maxEnergyLevel * GAME_CONFIG.energyMultiplier;

      if (lastApprovedEventIndex !== -1) {
        const lastApprovedState = { energy: payload.energy, capital: payload.capital };

        state.gameEvents.splice(0, lastApprovedEventIndex + 1);

        const predictedState = state.gameEvents.reduce((accum, event) => {
          if (event.type === EGameEventType.tap) {
            accum.capital += multiTapLevel;
            accum.energy -= multiTapLevel;
          }

          if (event.type === EGameEventType.regen) {
            accum.energy += rechargingLevel;
          }

          if (event.type === EGameEventType.autoClick) {
            accum.capital += autoClickerLevel;
          }

          return accum;
        }, lastApprovedState);

        state.energy = predictedState.energy > maxEnergy ? maxEnergy : predictedState.energy;
        state.capital = predictedState.capital;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(gameApi.endpoints.fetchGameData.matchFulfilled, (state, { payload }) => {
      const boosts: GameBoosts = payload.boosts.reduce<GameBoosts>(
        (accum, boost) => {
          accum[boost.type] = boost;
          return accum;
        },
        { ...INITIAL_BOOSTS_STATE },
      );

      state.energy = payload.energy;
      state.capital = payload.capital;
      state.boosts = boosts;
    });
    builder.addMatcher(gameApi.endpoints.levelUpBoost.matchFulfilled, (state, { payload }) => {
      state.capital -= state.boosts[payload.type].price;
      state.boosts[payload.type] = payload;
    });
    builder.addMatcher<{ type: string; payload: ClaimRewardPayload }>(
      gameApi.endpoints.claimReward.matchFulfilled,
      (state, { payload }) => {
        if (payload) {
          state.capital += payload.reward;
        }
      },
    );
  },
});

export const { processRegenEvent, approveSyncId, processTapEvent, processAutoClickEvent } = gameSlice.actions;
