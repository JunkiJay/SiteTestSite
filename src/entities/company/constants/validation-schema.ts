import * as yup from 'yup';
import { CompanyFormValues } from '@entities/company/types';

export const validationSchemaFormCompany: yup.ObjectSchema<CompanyFormValues> = yup.object({
  image: yup.mixed<File>().required(),
  name: yup.string().required(),
  field: yup.string().required(),
});
