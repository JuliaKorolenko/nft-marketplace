<script setup lang="ts">
import { onMounted, watch, computed, provide } from 'vue';
import CollectionItem from '@/components/collectionItem/CollectionItem.vue';
import { useGetNftData } from '@/composables/useGetNftData';
import { useCommonStore } from '@/stores/useCommonStore';
import { useNftStore } from '@/stores/useNftStore';
import { useContract } from '@/composables/useContract';
import { useWallet } from '@/composables/useWallet';

const commonStore = useCommonStore();
const nftStore = useNftStore()

const { isConnected } = useWallet();
const { fetchAvailableTokens, fetchAllTokenIds } = useContract()

// const filter = defineModel<string>('selectedFilters', { default: 'all'});
// const sort = defineModel<string>('selectedSortBy', { default: 'up' });
// const searchQuery = defineModel<string>('searchQuery', { default: ''});

// onMounted(() => {
//   if(!isConnected) {
//     listenToMintEvents()
//   }
// })


watch(isConnected, async (newValue) => {
  if(newValue) {
    await initNftStatuses()
  }
})

const filter = computed(() => commonStore.getActiveFilter);
const searchQuery = computed(() => commonStore.getSearchQuery);
const sort = computed(() => commonStore.getSortBy);

const { isLoading, getCollection, totalQuantity } = useGetNftData({ filter, sort, searchQuery });

provide('totalQuantity', totalQuantity);

async function initNftStatuses() {
  const availableTokens: bigint[] = await fetchAvailableTokens();
  const allTokens: bigint[] = await fetchAllTokenIds();

  console.log(">>> tokens", availableTokens);
  console.log(">>> allTokens", allTokens);

  allTokens.forEach((tokenId) => {
    const isMinted = !availableTokens.some(t => t === tokenId);
    nftStore.setNftStatus(Number(tokenId), {
      status: isMinted,
      owner: null,
      price: null,
    });
  });
  

  // for(let i=0; i<totalQuantity.value; i++) {
  //   nftStore.setNftStatus(i, {
  //     status: !tokens.map(t => Number(t)).includes(i),
  //     owner: null,
  //     price: null
  //   });

  // }
  


  console.log(">>>> nftStatuses", nftStore.nftStatuses);
  
}
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