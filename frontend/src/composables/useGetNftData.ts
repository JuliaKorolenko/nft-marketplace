
import { ref, onMounted, computed, onUpdated, watchEffect } from 'vue';
import type { Ref } from 'vue';

export const useGetNftData = (params:{ 
  filter: Ref<string>, 
  sort: Ref<string>
 }) => {

  onUpdated(() => {
    // console.log(">>> updated composable", params.filter.value, params.sort.value);
  })

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
      const response = await fetch('/data/collections.json');

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
    let filtered: any[] = [];

    // Apply filter
    if (params.filter.value && params.filter.value !== 'all') {      
      filtered = [...collections.value[params.filter.value].items];      
    }
    else {
      // No filter applied, include all items from all categories
      Object.values(collections.value).forEach((collection: any) => {
        filtered = filtered.concat(collection.items);
      });
    }

    console.log(">>> res", filtered);
    return filtered;
  });

  const sortedFilteredCollection = computed(() => {
    if (!filteredCollections.value) {
      return null;
    }
    let sorted = [...filteredCollections.value];

    // Apply sorting
    if (params.sort.value === 'up') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (params.sort.value === 'down') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  })


  // watchEffect(() => {
  //   // console.log(">>> watchEffect composable", params.filter.value, params.sort.value);
  //   console.log(">>> watchEffect composable", filteredCollections.value);
  // })



  return {
    collections,
    isLoading,
    sortedFilteredCollection
  };
};