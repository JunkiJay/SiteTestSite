import React from 'react';
import { PageTemplate } from '@shared/ui/templates';
import { FormCreateCompany } from '@features/create-company/ui';
import { SubmitHandler } from 'react-hook-form';
import { CreateCompanyRequestPayload, useCreateCompanyMutation } from '@entities/company/api';
import { useNavigate } from 'react-router-dom';
import { CompanyFormValues } from '@entities/company/types';
import { PATHS } from '.';

export const CreateCompanyPage = () => {
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CompanyFormValues> = (data) => {
    const requestPayload: CreateCompanyRequestPayload = { field: data.field, name: data.name };

    if (data.image instanceof File) {
      requestPayload.image = data.image;
    }
    createCompany(requestPayload).then(({ data }) => {
      if (data?.id) {
        navigate(`${PATHS.companies}/${data.id}`, { replace: true });
      }
    });
  };

  return (
    <PageTemplate header="Create New Company" withBackButton>
      <FormCreateCompany onSubmit={onSubmit} isLoading={isLoading} />
    </PageTemplate>
  );
};
