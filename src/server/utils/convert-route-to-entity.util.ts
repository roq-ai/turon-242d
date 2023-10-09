const mapping: Record<string, string> = {
  cars: 'car',
  companies: 'company',
  'fleet-managers': 'fleet_manager',
  locations: 'location',
  rentals: 'rental',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
