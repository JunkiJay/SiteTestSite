export interface Member {
  login: string;
  id: string;
  image?: string;
}

export interface Company {
  id: string;
  image: string;
  name: string;
  field: string;
  earned: number;
  members: Member[];
}

export interface CompanyFormValues {
  image: File | string;
  name: string;
  field: string;
}
