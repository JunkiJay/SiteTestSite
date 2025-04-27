import { faker } from '@faker-js/faker/locale/en';
import { manyOf, primaryKey } from '@mswjs/data';

export const GameModel = {
  id: primaryKey(String),
  boosts: manyOf('boost'),
  capital: () => faker.number.int({ max: 1000000000, min: 100 }),
  energy: () => faker.number.int({ min: 70, max: 80 }),
  rank: () => 'student',
};
