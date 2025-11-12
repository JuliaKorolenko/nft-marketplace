
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';

export const useGetNftData = (params:{ 
  filter: Ref<string>, 
  sort: Ref<string>,
  searchQuery?: Ref<string>
 }) => {

  onMounted(async () => {    
    await loadCollections();
  });

  type CollectionMap = Record<string, any>;
  const collections = ref<CollectionMap | null>(null);
  const isLoading = ref(false);

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
      collections.value = await response.json();

    } catch (err) {
      console.error('Error loading collections:', err);

    } finally {
      isLoading.value = false;
    }
  };

  const filteredCollections = computed(() => {
    if (!collections.value) {
      return null;
    }
    // Apply filter
    if (params.filter.value && params.filter.value !== 'all') {
      let res = collections.value.filter((item: any) => {
        // console.log(">>--", item.collection.toLowerCase(), params.filter.value.toLowerCase());
        return item.collection.toLowerCase().includes(params.filter.value.toLowerCase());
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

    // Apply sorting
    if (params.sort.value === 'up') {
      sorted.sort((a, b) => a.preview_price - b.preview_price);
    } else if (params.sort.value === 'down') {
      sorted.sort((a, b) => b.preview_price - a.preview_price);
    }
    return sorted;
  })

  const resultCollections = computed(() => {
    const search = (params.searchQuery?.value)?.toLowerCase()
    let res = sortedFilteredCollection.value?.filter((item: any) => {
      // console.log(">>> res", item.name.toLowerCase().includes(search), item.collection.toLowerCase().includes(search));
      // return item.name.toLowerCase().includes(search) || item.collection.toLowerCase().includes(search);
      return item.name.toLowerCase().includes(search);
    });

    // console.log(">>> res", res);
    return res
    
  });



  return {
    isLoading,
    resultCollections
  };
};