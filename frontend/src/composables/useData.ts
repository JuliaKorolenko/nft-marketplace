import { ref } from "vue";
import { type Collection } from '@/types/common'
import { useConnect } from './useConnect'
import { useCommonStore } from "@/stores/useCommonStore";
import { notify } from '@/composables/useNotification';
import type { NFTCard } from '@/types/common';

const BASE_URL = import.meta.env.VITE_IPFS_BASE_URL;

const isCollectionLoading = ref<boolean>(false)

export function useData() {
  
  const { curContract, connectWallet, disconnectWallet, buyToken } = useConnect()

  const commonStore = useCommonStore()

  async function connectWalletHandler() {
    try {
      await connectWallet()
      
    } catch(e) {
      console.log(">>> connect wallet error", e);
    }
  }

  async function disconnecttWalletHandler() {
    try {
      disconnectWallet()
      
    } catch(e) {
      console.log(">>> disconnect wallet error", e);
    } 
  }

  async function getCollectionsData() {
    isCollectionLoading.value = false
    
    const collections = await _fetchAllTokens()

    const res = await Promise.all(
      collections.map(async (el: Collection, id: number) => {
        const metadataUrl = `${BASE_URL}${el.uri}`
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        const imgUrl = metadata.image?.replace("ipfs://", BASE_URL) || "";

        const attributesArray = (metadata.attributes || []).map((attr: any) => ({
          name: attr.trait_type,
          value: attr.value
        }));

        const name = metadata.name || ''
        const description = metadata.description || ''
        const collection = metadata.collection || ''

        // console.log(">>> imgUrl", el);
        return {
          id,
          tokenId: el.tokenId,
          name,
          collection,
          rarity: el.rarity,
          price: el.price,
          isMinted: el.isMinted,
          imgUrl,
          description,
          attributes: attributesArray
        }
      })
    )

    const resRank= _setRank(res)

    console.log(">>> getCollectionsData", resRank);
    commonStore.setCollection(res)
    isCollectionLoading.value = true
    // return resRank
  }

  const _setRank = (arr: any[]) => {
    if(!arr) {
      return null;
    }
    const curArr = [...arr];
    const sorted = [...curArr].sort((a, b) => b.rarity - a.rarity);

    let currentRank = 1;
    let lastScore = sorted[0]?.rarity;

    sorted.forEach((item) => {
      if (item.rarity !== lastScore) {
        currentRank++;    // новый уникальный score → следующий ранг
        lastScore = item.rarity;
      }
      item.rank = currentRank;
    });

    return curArr;
  }

  async function buyTokenHandler(tokenId: number) {
    try {
      notify.info('Minting NFT...', 'Please wait');
      await buyToken(tokenId)
      await getCollectionsData()
      notify.success('NFT minted successfully!', 'Success');

    } catch(e) {
      console.log("buyTokenHandler Error", e);
      notify.error(
        e instanceof Error ? e.message : 'Unknown error',
        'Minting Failed'
      );
      
    }
  }
  
  async function _fetchAllTokens() {
    const tokensInfo = await curContract.value?.getAllTokensInfo!();
    const [tokenIds, uris, rarities, prices, mintedStatuses] = tokensInfo;

    const tokens = tokenIds.map((id: bigint, index: number) => ({
      tokenId: Number(id),
      uri: uris[index],
      rarity: Number(rarities[index]),
      price: prices[index],
      isMinted: mintedStatuses[index],
    }));

    return tokens
  }

  return {
    isCollectionLoading,
    connectWalletHandler,
    disconnecttWalletHandler,
    getCollectionsData,
    buyTokenHandler
  }

}