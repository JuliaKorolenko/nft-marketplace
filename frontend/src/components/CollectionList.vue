<script setup lang="ts">
import { computed, provide } from 'vue';
import CollectionItem from '@/components/collectionItem/CollectionItem.vue';
import { useGetNftData } from '@/composables/useGetNftData';
import { useCommonStore } from '@/stores/commonStore';

const commonStore = useCommonStore();
// import { useContract } from '@/composables/useContract';

// const filter = defineModel<string>('selectedFilters', { default: 'all'});
// const sort = defineModel<string>('selectedSortBy', { default: 'up' });
// const searchQuery = defineModel<string>('searchQuery', { default: ''});

const filter = computed(() => commonStore.getActiveFilter);
const searchQuery = computed(() => commonStore.getSearchQuery);
const sort = computed(() => commonStore.getSortBy);

const { isLoading, getCollection, totalQuantity } = useGetNftData({ filter, sort, searchQuery });

provide('totalQuantity', totalQuantity);
</script>
<template>
  <div class="nft-grid" id="nftGrid" v-if="getCollection?.length">
    <CollectionItem
      v-for="item in getCollection"
      :key="item.name"
      :item="item"
    />
  </div>
  <div class="empty-result" v-else>
    There's no result
  </div>
</template>
<style scoped>
  .nft-grid {
    padding: 20px 60px 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }
  .empty-result {
    text-align: center;
    color: #bfbfbf;
  }

</style>