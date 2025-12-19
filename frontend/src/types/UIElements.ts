//  Filter and sort options
export const filters = [
  { label: 'All', value: 'all' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Mythical', value: 'mythical' },
  { label: 'Nebula', value: 'nebula' },
  { label: 'Surrealism', value: 'surrealism' },
] as const

export type FilterValue = typeof filters[number]['value']

export const sortByOptions = [
  { label: 'Low to High', value: 'asc' },
  { label: 'High to Low', value: 'desc' },
  { label: '', value: null },
] as const

export type SortByValue = 'asc' | 'desc' | null;
export type SortByType = 'price' | 'rank' | '';
export interface SortBy {
  type: SortByType;
  value: SortByValue;
}


// Tabs for NFT details view
export const TABS = [
  { key: 'description', label: 'Description' },
  { key: 'traits', label: 'Traits' },
  { key: 'details', label: 'Details' }
] as const;

export type TabKey = typeof TABS[number]['key'];

// NFT detail fields
export const nftDetail = [
  { label: 'Contract Address', value: 'contract_address' },
  { label: 'Token ID', value: 'token_id' },
  { label: 'Token Standart', value: 'token_standart' },
  { label: 'Blockchain', value: 'blockchain' },
] as const

export type nftDetailKey = typeof nftDetail[number]['value']
export  type nftDetails = Record<nftDetailKey, string>;


// Notification types and interfaces
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export interface NotificationOptions {
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}
export interface Notification {
  id: number;
  type: NotificationType;
  title?: string;
  message: string;
  duration: number;
}

export interface NotificationComponent {
  addNotification: (options: NotificationOptions) => number;
  removeNotification: (id: number) => void;
  success: (message: string, title?: string, duration?: number) => number;
  error: (message: string, title?: string, duration?: number) => number;
  warning: (message: string, title?: string, duration?: number) => number;
  info: (message: string, title?: string, duration?: number) => number;
}
