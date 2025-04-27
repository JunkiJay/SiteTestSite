import { faker } from '@faker-js/faker/locale/en';
import { primaryKey } from '@mswjs/data';

export const EarnModel = {
  id: primaryKey(() => faker.string.uuid()),
  title: String,
  reward: Number,
  link: String,
  isCompleted: Boolean,
};
