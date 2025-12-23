<script setup lang="ts">
import { onMounted, computed } from 'vue';
import CollectionItem from '@/components/collectionItem/CollectionItem.vue';
import { useCommonStore } from '@/stores/useCommonStore';
import { useData } from '@/composables/useData';
import Sceleton from './Sceleton.vue';

const commonStore = useCommonStore();
const { isCollectionLoading, getCollectionsData } = useData()

onMounted(async () => {
  await getCollectionsData()
})

const collection = computed(() => commonStore.getCollection);

</script>
<template>
  <template v-if="isCollectionLoading">
    <div class="nft-grid content-container" v-if="collection?.length">
      <CollectionItem
        v-for="item in collection"
        :key="item.name"
        :item="item"
      />
    </div>
    <div class="empty-result" v-else>
      There's no result
    </div>
  </template>
  <Sceleton v-else />
</template>
<style scoped>
  .nft-grid {
    padding-top: 20px;
    padding-bottom: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 25px;
  }
  .empty-result {
    text-align: center;
    color: #bfbfbf;
  }

</style>