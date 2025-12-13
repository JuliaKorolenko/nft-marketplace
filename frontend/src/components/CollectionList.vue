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
    <div class="nft-grid" v-if="collection?.length">
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