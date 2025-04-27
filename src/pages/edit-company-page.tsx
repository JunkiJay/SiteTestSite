import React, { useCallback, useMemo } from 'react';
import { FormEditCompany } from '@features/edit-company/ui';
import { PageTemplate } from '@src/shared/ui/templates';
import { EditCompanyRequestPayload, useEditCompanyMutation, useFetchCompanyQuery } from '@entities/company/api';
import { SubmitHandler } from 'react-hook-form';
import { CompanyFormValues } from '@entities/company/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '@pages/paths';
import { DEFAULT_COMPANY_FORM_VALUES } from '@entities/company/constants';

export const EditCompanyPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editCompany, { isLoading }] = useEditCompanyMutation();
  const { data } = useFetchCompanyQuery(id);

  const onSubmit: SubmitHandler<CompanyFormValues> = useCallback(
    (data) => {
      const requestPayload: EditCompanyRequestPayload = { field: data.field, name: data.name, id };

      if (data.image instanceof File) {
        requestPayload.image = data.image;
      }

      editCompany(requestPayload).then(({ data }) => {
        if (data?.id) {
          navigate(`${PATHS.companies}/${data.id}`, { replace: true });
        }
      });
    },
    [editCompany, id, navigate],
  );

  const currentCompanyValues = useMemo(() => {
    if (!data) {
      return DEFAULT_COMPANY_FORM_VALUES;
    }

    const { name, field, image } = data;

    return { name, field, image };
  }, [data]);

  return (
    <PageTemplate header="Edit Company" withBackButton>
      <FormEditCompany onSubmit={onSubmit} isLoading={isLoading} defaultValues={currentCompanyValues} />
    </PageTemplate>
  );
};
