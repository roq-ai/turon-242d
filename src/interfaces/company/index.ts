import { CarInterface } from 'interfaces/car';
import { FleetManagerInterface } from 'interfaces/fleet-manager';
import { LocationInterface } from 'interfaces/location';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  car?: CarInterface[];
  fleet_manager?: FleetManagerInterface[];
  location?: LocationInterface[];
  user?: UserInterface;
  _count?: {
    car?: number;
    fleet_manager?: number;
    location?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
