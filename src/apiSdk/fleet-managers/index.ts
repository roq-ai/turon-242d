import queryString from 'query-string';
import { FleetManagerInterface, FleetManagerGetQueryInterface } from 'interfaces/fleet-manager';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFleetManagers = async (
  query?: FleetManagerGetQueryInterface,
): Promise<PaginatedInterface<FleetManagerInterface>> => {
  return fetcher('/api/fleet-managers', {}, query);
};

export const createFleetManager = async (fleetManager: FleetManagerInterface) => {
  return fetcher('/api/fleet-managers', { method: 'POST', body: JSON.stringify(fleetManager) });
};

export const updateFleetManagerById = async (id: string, fleetManager: FleetManagerInterface) => {
  return fetcher(`/api/fleet-managers/${id}`, { method: 'PUT', body: JSON.stringify(fleetManager) });
};

export const getFleetManagerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/fleet-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteFleetManagerById = async (id: string) => {
  return fetcher(`/api/fleet-managers/${id}`, { method: 'DELETE' });
};
