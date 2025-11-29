import { defineStore} from 'pinia';

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    activeFilter : 'all',
    searchQuery: '',
  }),
  getters: {
    getActiveFilter: (state) => state.activeFilter,
    getSearchQuery: (state) => state.searchQuery,
  },
  actions: {
    setActiveFilter(filter: string ) {
      this.activeFilter = filter;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    }
  },
});