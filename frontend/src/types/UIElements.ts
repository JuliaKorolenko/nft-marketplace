export const filters = [
  { label: 'All', value: 'all' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Mythical', value: 'mythical' },
  { label: 'Nebula', value: 'nebula' },
  { label: 'Surrealism', value: 'surrealism' },
] as const

export type FilterValue = typeof filters[number]['value']
export const sortByOptions = [
  { label: 'Price: Low to High', value: 'up' },
  { label: 'Price: High to Low', value: 'down' },
] as const

export type SortByValue = typeof sortByOptions[number]['value']