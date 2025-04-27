import React, { FC, memo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CompanyFields } from '@entities/company/ui';
import { Button } from '@shared/ui/atoms';
import { styled } from '@mui/material/styles';
import { CompanyFormValues } from '@entities/company/types';
import { DEFAULT_COMPANY_FORM_VALUES, validationSchemaFormCompany } from '@entities/company/constants';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormEditCompanyProps {
  onSubmit: SubmitHandler<CompanyFormValues>;
  isLoading: boolean;
  defaultValues: CompanyFormValues;
}

const FormStyled = styled('form')`
  display: grid;
  grid-template-rows: 1fr max-content;
  gap: 16px;
  margin-bottom: 20px;
`;

export const FormEditCompany: FC<FormEditCompanyProps> = memo(
  ({ onSubmit, isLoading, defaultValues = DEFAULT_COMPANY_FORM_VALUES }) => {
    const form = useForm<CompanyFormValues>({
      defaultValues,
      resolver: yupResolver(validationSchemaFormCompany),
    });

    const {
      handleSubmit,
      formState: { errors },
    } = form;

    const isDisabledSubmitButton = isLoading || Object.keys(errors).length > 0;

    return (
      <FormProvider {...form}>
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <CompanyFields />
          <Button type="submit" variant="contained" disabled={isDisabledSubmitButton}>
            Save
          </Button>
        </FormStyled>
      </FormProvider>
    );
  },
);
