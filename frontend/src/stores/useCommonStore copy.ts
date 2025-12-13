import { defineStore} from 'pinia';
import { type SortBy, SortByType } from '@/types/UIElements'
import type { NFTCard } from '@/types/common'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    activeFilter : 'all',
    searchQuery: '',
    sortBy: { type: '', value: null } as SortBy,
    collectionList: null as NFTCard[] | null,
  }),

  getters: {
    getActiveFilter: (state) => state.activeFilter,
    getSearchQuery: (state) => state.searchQuery,
    getSortBy: (state) => state.sortBy,
    getTotalQuantity: (state) => state.collectionList?.length ?? 0,

    getFilteredCollection(state) {
      const arr = state.collectionList ?? []
      if(state.activeFilter !== 'all') {
        return arr.filter((item: NFTCard) => {
          return item.collection.toLowerCase().includes(state.activeFilter.toLowerCase());
        });
      }
      return arr
    },

    getsortedFilteredCollection() {
      console.log(">>> sort", this.sortBy.type);
      let sortedKey: string = this.sortBy.type
      const base = this.getFilteredCollection ?? [];
      const sorted = [...base];
      // const sorted = [...(this.getFilteredCollection ?? [])]

      if(this.sortBy.value === 'asc') {
        return  sorted.sort((a, b) => Number(a[sortedKey]) - Number(b[sortedKey]));
      }

      return sorted
    },

    getCollection() {
      return this.getsortedFilteredCollection
    },
    
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
    },

    setCollection(arr: any) {
      if(this.collectionList) this.collectionList = null
      this.collectionList = arr;
    }
  },
});