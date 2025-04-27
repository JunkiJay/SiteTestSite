import React, { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CompanyFields } from '@entities/company/ui';
import { Button } from '@src/shared/ui/atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompanyFormValues } from '@entities/company/types';
import { DEFAULT_COMPANY_FORM_VALUES, validationSchemaFormCompany } from '@entities/company/constants';

const FormStyled = styled('form')`
  display: grid;
  grid-auto-rows: max-content 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

interface FormCreateCompanyProps {
  onSubmit: SubmitHandler<CompanyFormValues>;
  isLoading: boolean;
}

export const FormCreateCompany: FC<FormCreateCompanyProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<CompanyFormValues>({
    defaultValues: DEFAULT_COMPANY_FORM_VALUES,
    resolver: yupResolver<CompanyFormValues>(validationSchemaFormCompany),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const isDisabledSubmitButton = isLoading || Object.keys(errors).length > 0;

  return (
    <FormProvider {...form}>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <CompanyFields />
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography variant="h1" color="primary">
            PAY
          </Typography>
          <Typography variant="subtitle2" color="primary">
            $ 1,000,000
          </Typography>
        </Stack>
        {errors.image && <Typography>{errors.image.message}</Typography>}
        <Button type="submit" variant="contained" disabled={isDisabledSubmitButton}>
          Create
        </Button>
      </FormStyled>
    </FormProvider>
  );
};
