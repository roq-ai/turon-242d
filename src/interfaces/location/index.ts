import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface LocationInterface {
  id?: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  street: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface LocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  street?: string;
  company_id?: string;
}
