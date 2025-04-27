import { Company, Member } from '@entities/company/types';

export interface AccountState {
  currentCompany: Company | null;
  friends: Member[];
  ownerCompanyId: string | null;
}

export interface FetchAccountDataResponse {
  currentCompany: Company | null;
  friends: Member[];
  ownerCompanyId: string | null;
}
