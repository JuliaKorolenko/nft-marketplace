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

// export type SortByValue = typeof sortByOptions[number]['value']

export type SortByValue = 'asc' | 'desc' | null;
export type SortByType = 'price' | 'rating' | '';
export interface SortBy {
  type: SortByType;
  value: SortByValue;
}