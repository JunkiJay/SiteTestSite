import { faker } from '@faker-js/faker/locale/en';
import { manyOf, nullable, oneOf, primaryKey } from '@mswjs/data';

export const AccountModel = {
  id: primaryKey(() => faker.string.uuid()),
  currentCompany: nullable(oneOf('company')),
  friends: manyOf('member'),
  ownerCompanyId: nullable(String),
};
