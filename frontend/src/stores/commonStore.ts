import { defineStore} from 'pinia';

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    loadData: false,
    activeFilter : 'all',
  }),
  getters: {
    isLoadData: (state) => state.loadData,
    getActiveFilter: (state) => state.activeFilter,
  },
  actions: {
    setIsLoadData(val: boolean) {
      this.loadData = val;
    },

    setActiveFilter(filter: string ) {
      this.activeFilter = filter;
    },
  },
});