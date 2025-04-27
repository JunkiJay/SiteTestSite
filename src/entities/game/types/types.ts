export type Rank = 'boss' | 'student';

export enum EBoostType {
  rechargingSpeed = 'rechargingSpeed',
  multiTap = 'multiTap',
  maxEnergy = 'maxEnergy',
  autoClicker = 'autoClicker',
}

export interface Boost {
  price: number;
  level: number;
  type: EBoostType;
}

export type GameBoosts = Record<keyof typeof EBoostType, Boost>;

export enum EGameEventType {
  tap = 'tap',
  regen = 'regen',
  autoClick = 'autoClick',
}

export interface GameEvent {
  type: EGameEventType;
  id: number;
}

export interface GameSliceState {
  energy: number;
  capital: number;
  gameEvents: GameEvent[];
  boosts: GameBoosts;
  lastSyncId: number;
  rank: Rank;
}

export interface SyncMutationPayload {
  [EGameEventType.tap]: number;
  [EGameEventType.regen]: number;
  [EGameEventType.autoClick]: number;
  id: number;
}

export interface SyncMutationResponse {
  energy: number;
  capital: number;
  id: number;
}

export interface FetchGameDataResponse {
  energy: number;
  capital: number;
  boosts: Boost[];
  rank: Rank;
}

export interface ClaimRewardPayload {
  id: string;
  reward: number;
}
