import queryString from 'query-string';
import { LocationInterface, LocationGetQueryInterface } from 'interfaces/location';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLocations = async (
  query?: LocationGetQueryInterface,
): Promise<PaginatedInterface<LocationInterface>> => {
  return fetcher('/api/locations', {}, query);
};

export const createLocation = async (location: LocationInterface) => {
  return fetcher('/api/locations', { method: 'POST', body: JSON.stringify(location) });
};

export const updateLocationById = async (id: string, location: LocationInterface) => {
  return fetcher(`/api/locations/${id}`, { method: 'PUT', body: JSON.stringify(location) });
};

export const getLocationById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/locations/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteLocationById = async (id: string) => {
  return fetcher(`/api/locations/${id}`, { method: 'DELETE' });
};
