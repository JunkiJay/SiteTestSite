import { faker } from '@faker-js/faker/locale/en';
import { nullable, primaryKey } from '@mswjs/data';

export const MemberModel = {
  id: primaryKey(() => faker.string.uuid()),
  login: () => faker.internet.userName(),
  image: nullable(() => faker.image.avatar()),
};
