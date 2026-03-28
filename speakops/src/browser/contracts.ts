export interface BrowserPolicy {
  allowNavigation: boolean;
  maxPages: number;
  allowedHosts: string[];
}

export const defaultBrowserPolicy: BrowserPolicy = {
  allowNavigation: true,
  maxPages: 5,
  allowedHosts: ['example.com']
};
