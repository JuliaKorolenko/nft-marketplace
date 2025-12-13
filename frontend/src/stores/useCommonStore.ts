import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { SortBy } from '@/types/UIElements';
import type { NFTCard } from '@/types/common';

export const useCommonStore = defineStore('commonStore', () => {
  // --- STATE ---
  const activeFilter = ref<string>('all');
  const searchQuery = ref<string>('');
  const sortBy = ref<SortBy>({ type: '', value: null });
  const collectionList = ref<NFTCard[]>([]); // всегда массив, null нет

  // --- GETTERS ---
  const getActiveFilter = computed(() => activeFilter.value);
  const getSearchQuery = computed(() => searchQuery.value);
  const getSortBy = computed(() => sortBy.value);
  const getTotalQuantity = computed(() => collectionList.value.length);
  const getAvailableTokensQuantity = computed(() => collectionList.value.filter(el => !el.isMinted).length)
  
  const getTotalSales = computed(() => {
    return collectionList.value
            .filter(el => el.isMinted)
            .reduce((sum, el) => sum + BigInt(el.price), 0n)
  })

  const getMaxTokenPrice = computed(() => {
    return collectionList.value
            .reduce((max, el) => BigInt(el.price) > max ? BigInt(el.price) : max, 0n)
  })

  const getMinTokenPrice = computed(() => {
    const firstElPrice = collectionList.value[0]?.price!
    return firstElPrice && collectionList.value
            .reduce((min, el) => BigInt(el.price) < min ? BigInt(el.price) : min, BigInt(firstElPrice))
  })

  // const getMaxTokenPrice = computed(() => {

  // const getFilteredCollection = computed<NFTCard[]>(() => {
  //   const arr = [...collectionList.value];

  //   const filtered =
  //     activeFilter.value !== 'all'
  //       ? arr.filter((item) =>
  //           item.collection
  //             .toLowerCase()
  //             .includes(activeFilter.value.toLowerCase())
  //         )
  //       : arr;

  //   if (!searchQuery.value.trim()) return filtered;

  //   return filtered.filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  //   );
  // });

  // const getSortedFilteredCollection = computed<NFTCard[]>(() => {
  //   const sortedKey = sortBy.value.type as keyof NFTCard;
  //   const base = [...getFilteredCollection.value];

  //   if (!sortBy.value.value) return base;

  //   if (sortBy.value.value === 'asc') {
  //     return base.sort(
  //       (a, b) => Number(a[sortedKey]) - Number(b[sortedKey])
  //     );
  //   }

  //   if (sortBy.value.value === 'desc') {
  //     return base.sort(
  //       (a, b) => Number(b[sortedKey]) - Number(a[sortedKey])
  //     );
  //   }

  //   return base;
  // });

  const filteredAndSortedCollection = computed<NFTCard[]>(() => {
    // берем исходный массив
    let arr = collectionList.value;

    // --- фильтр по коллекции ---
    if (activeFilter.value !== 'all') {
      arr = arr.filter((item) =>
        item.collection.toLowerCase().includes(activeFilter.value.toLowerCase())
      );
    }

    // --- фильтр по поиску ---
    if (searchQuery.value.trim()) {
      arr = arr.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    // --- сортировка ---
    const key = sortBy.value.type as keyof NFTCard;
    if (sortBy.value.value === 'asc') {
      arr = [...arr].sort((a, b) => Number(a[key]) - Number(b[key]));
    } else if (sortBy.value.value === 'desc') {
      arr = [...arr].sort((a, b) => Number(b[key]) - Number(a[key]));
    }

    // --- возвращаем мемоизированный массив ---
    return arr;
  });

  const getCollection = computed(() => filteredAndSortedCollection.value);

  // --- ACTIONS ---
  function setActiveFilter(filter: string) {
    activeFilter.value = filter;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
  }

  function setSortBy(obj: SortBy) {
    const { type, value } = obj;
    const typeValue = value ? type : '';
    sortBy.value = { type: typeValue, value };
  }

  function setCollection(arr: NFTCard[]) {
    collectionList.value = [...arr];
  }

  return {
    // state
    activeFilter,
    searchQuery,
    sortBy,
    collectionList,

    // getters
    getActiveFilter,
    getSearchQuery,
    getSortBy,
    getTotalQuantity,
    getCollection,
    getAvailableTokensQuantity,
    getTotalSales,
    getMaxTokenPrice,
    getMinTokenPrice,

    // actions
    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setCollection,
  };
});
