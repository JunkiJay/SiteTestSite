import { primaryKey } from '@mswjs/data';

export const BoostModel = {
  price: Number,
  level: Number,
  type: String,
  id: primaryKey(String),
};
