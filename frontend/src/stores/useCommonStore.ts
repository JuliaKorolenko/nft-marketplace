import { defineStore} from 'pinia';
import { type SortBy } from '@/types/UIElements'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    activeFilter : 'all',
    searchQuery: '',
    sortBy: { type: '', value: null } as SortBy,
  }),
  getters: {
    getActiveFilter: (state) => state.activeFilter,
    getSearchQuery: (state) => state.searchQuery,
    getSortBy: (state) => state.sortBy,
  },
  actions: {
    setActiveFilter(filter: string ) {
      this.activeFilter = filter;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setSortBy(obj: SortBy) {
      const { type, value } = obj;
      const typeValue = value ? type : '';
      this.sortBy = { type: typeValue, value };
    }
  },
});