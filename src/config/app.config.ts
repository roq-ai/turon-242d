interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Fleet Manager', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'Turon',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage personal user information',
    'Book a car for rental',
    'View car details',
    'View rental history',
  ],
  ownerAbilities: [
    'Manage company information',
    'Manage car information',
    'Manage rental information',
    'Manage location information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/4febe9c4-ebc2-4c5a-8bf1-5ab88dd8317b',
};
