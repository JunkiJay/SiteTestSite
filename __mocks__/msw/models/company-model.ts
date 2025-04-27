import { manyOf, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker/locale/en';

export const CompanyModel = {
  earned: () => faker.number.int({ max: 1000000 }),
  id: primaryKey(() => faker.string.uuid()),
  image: () => faker.image.urlLoremFlickr({ category: 'cryptocurrency' }),
  name: () => faker.company.name(),
  field: () => 'crypto',
  members: manyOf('member'),
};
