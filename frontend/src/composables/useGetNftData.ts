
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { type SortBy } from '@/types/UIElements';

export const useGetNftData = (params:{ 
  filter?: Ref<string>, 
  sort?: Ref<SortBy>,
  searchQuery?: Ref<string>
 }) => {

  onMounted(async () => {    
    await loadCollections();
  });

  type CollectionMap = Record<string, any>;
  const collections = ref<CollectionMap | null>(null);
  const isLoading = ref(false);  
  
  const filteredCollections = computed(() => {    
    if (!collections.value) {
      return null;
    }
    // Apply filter
    if (params?.filter?.value && params.filter.value !== 'all') {
      let res = collections.value.filter((item: any) => {
        // console.log(">>--", item.collection.toLowerCase(), params.filter.value.toLowerCase());
        return item.collection.toLowerCase().includes(params?.filter?.value.toLowerCase());
      });
      // console.log(">>> res", res);
      return res;
   }
   return collections.value;

  });

  const sortedFilteredCollection = computed(() => {
    if (!filteredCollections.value) {
      return null;
    }
    let sorted = [...filteredCollections.value];
    
    const sortValue = params?.sort?.value.value;

    let sorted_key = '';

    if(sortValue) {
      sorted_key = params?.sort?.value.type==='price' ? 'preview_price' : 'score';
    }


    if (sortValue === 'asc') {
      sorted.sort((a, b) => a[sorted_key] - b[sorted_key]);

    } else if (sortValue === 'desc') {
      sorted.sort((a, b) => b[sorted_key] - a[sorted_key]);
    }
    else {
      return filteredCollections.value
    }

    // console.log(">>> sort", sorted);
    return sorted;
  })

  const searchedSortedFilteredCollection = computed(() => {
    const search = (params?.searchQuery?.value)?.toLowerCase()
    let res;
    if(!search) {
      res = sortedFilteredCollection.value;
    }
    else {
      res = sortedFilteredCollection.value?.filter((item: any) => {
        return item.name.toLowerCase().includes(search);
      });
    }

    // console.log(">>> searchedSortedFilteredCollection", res);
    return res;
    
  });

  const totalQuantity = computed(() => 
    collections.value?.length ?? 0
  );

  const loadCollections = async() => {
    if(collections.value) {
      
      return collections.value;
    };
    isLoading.value = true;    
    
    try {
      // const response = await fetch('/data/collections.json');
      const response = await fetch('/data/flat_nft_list.json');

      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      // collections.value = await response.json();

      let res = await response.json();


      const scored = res?.map((item: any, index: number) => {
        const rarityScoreAttr = item.attributes.find((attr: any) => attr.trait_type === "Rarity Score");        
        return {
          score: rarityScoreAttr ? Number(rarityScoreAttr.value) : 0,
          originalIndex: index,
          ...item
        };
      });

      collections.value = setRank(scored)

    } catch (err) {
      console.error('Error loading collections:', err);

    } finally {
      isLoading.value = false;
    }
  };

  const setRank = (arr: any[]) => {
    if(!arr) {
      return null;
    }
    const curArr = [...arr];
    const sorted = [...curArr].sort((a, b) => b.score - a.score);

    let currentRank = 1;
    let lastScore = sorted[0]?.score;

    sorted.forEach((item) => {
      if (item.score !== lastScore) {
        currentRank++;    // новый уникальный score → следующий ранг
        lastScore = item.score;
      }
      item.rank = currentRank;
    });

    return curArr;
  }

  return {
    isLoading,
    totalQuantity,
    getCollection: searchedSortedFilteredCollection,
  };
};