import { PageTemplate } from '@shared/ui/templates';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@app/model/root-store';
import { OwnerCompany, ParticipantCompany } from '@entities/company/ui';
import { selectOwnerCompanyId } from '@entities/account/model';

export const CompanyPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const ownerId = useAppSelector(selectOwnerCompanyId);

  const isOwner = ownerId === id;

  return (
    <PageTemplate withBackButton>{isOwner ? <OwnerCompany id={id} /> : <ParticipantCompany id={id} />}</PageTemplate>
  );
};
