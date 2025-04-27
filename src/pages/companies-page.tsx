import { PageTemplate } from '@shared/ui/templates';
import { CompaniesList } from '@src/entities/company/ui';
import { useFetchCompaniesListQuery } from '@src/entities/company/api';
import { Progress } from '@shared/ui/atoms/progress';
import { Button, Link, Panel } from '@src/shared/ui/atoms';
import { PATHS } from '.';
import { useAppSelector } from '@app/model';
import { selectIsSomeCompanyMember } from '@entities/account/model';

export const CompaniesPage = () => {
  const isSomeCompanyMember = useAppSelector(selectIsSomeCompanyMember);
  const { data = [], isFetching } = useFetchCompaniesListQuery();

  return (
    <PageTemplate header="Join The Company" withBackButton>
      {isFetching ? (
        <Progress />
      ) : (
        <Panel sx={{ display: 'grid', overflowY: 'auto' }}>
          <CompaniesList companies={data} />
        </Panel>
      )}
      <Button
        to={`${PATHS.companies}/create`}
        variant="contained"
        component={Link}
        sx={{ marginBottom: '20px' }}
        disabled={isSomeCompanyMember}
      >
        Create New Company
      </Button>
    </PageTemplate>
  );
};
