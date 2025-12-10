<script setup lang="ts">
import { ref, onMounted, watch, computed, provide } from 'vue';
import CollectionItem from '@/components/collectionItem/CollectionItem.vue';
import { useGetNftData } from '@/composables/useGetNftData';
import { useCommonStore } from '@/stores/useCommonStore';
import { useNftStore } from '@/stores/useNftStore';
import { useContract } from '@/composables/useContract';
import { useWallet } from '@/composables/useWallet';
import { useThematicNFT } from '@/composables/useThematicNFT'
import { type NFTCard } from '@/types/common'

const commonStore = useCommonStore();
const nftStore = useNftStore()

const { isConnected } = useWallet();
// const { fetchAvailableTokens, fetchAllTokenIds } = useContract()
// const { fetchAllTokens, fetchAllTokenIds, fetchAvailableTokens, getCollectionsData } = useThematicNFT()

// const filter = defineModel<string>('selectedFilters', { default: 'all'});
// const sort = defineModel<string>('selectedSortBy', { default: 'up' });
// const searchQuery = defineModel<string>('searchQuery', { default: ''});
const collectionData = ref<NFTCard[] | null>(null)

onMounted(async () => {
  // let res1 = await fetchAllTokens()
  // let res2 = await fetchAllTokenIds()
  // let res3 = await fetchAvailableTokens()
  // collectionData.value = await getCollectionsData()
  // console.log(">>>> ress 1", res1);
  // console.log(">>>> ress 2", res2);
  // console.log(">>>> ress 4", collectionData.value);

  // https://emerald-elegant-scorpion-153.mypinata.cloud/ipfs/bafkreictgdjrvs4m5xbdohymdath6a6zl4roekj7rxu6726noo65mgq7ge/image
  
})





// watch(isConnected, async (newValue) => {
//   if(newValue) {
//     await initNftStatuses()
//   }
// })

const filter = computed(() => commonStore.getActiveFilter);
const searchQuery = computed(() => commonStore.getSearchQuery);
const sort = computed(() => commonStore.getSortBy);

const { isLoading, getCollection, totalQuantity } = useGetNftData({ filter, sort, searchQuery });

provide('totalQuantity', totalQuantity);

console.log(">>> ress", getCollection);

// async function initNftStatuses() {
//   const availableTokens: bigint[] = await fetchAvailableTokens();
//   const allTokens: bigint[] = await fetchAllTokenIds();

//   console.log(">>> tokens", availableTokens);
//   console.log(">>> allTokens", allTokens);

//   allTokens.forEach((tokenId) => {
//     const isMinted = !availableTokens.some(t => t === tokenId);
//     nftStore.setNftStatus(Number(tokenId), {
//       status: isMinted,
//       owner: null,
//       price: null,
//     });
//   });
  

//   // for(let i=0; i<totalQuantity.value; i++) {
//   //   nftStore.setNftStatus(i, {
//   //     status: !tokens.map(t => Number(t)).includes(i),
//   //     owner: null,
//   //     price: null
//   //   });

//   // }
  


//   console.log(">>>> nftStatuses", nftStore.nftStatuses);
  
// }
</script>
<template>
  <div class="nft-grid" v-if="getCollection?.length">
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