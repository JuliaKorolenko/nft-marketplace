<script setup lang="ts">
import { ethers } from 'ethers';
import { onMounted, computed, inject, type Ref } from 'vue';
import { type NFTCard } from '@/types/common';
import { useContract } from '@/composables/useContract';
import { useNftStore } from '@/stores/useNftStore';

const { BuyToken } = useContract();
const nftStore = useNftStore();

const totalQuantity = inject<Ref<number>>('totalQuantity')!;

const props = defineProps<{
  item: NFTCard,
}>();


const emit = defineEmits();

onMounted(async () => {

});

const prevPrice = computed(() => {
  let res = Number(ethers.formatEther(props.item.price));
  return res.toFixed(2);
})

// const item = inject<NFTCard>('nftItem')!;
const isConnected = inject<Ref<boolean>>('isConnected')!;
// const isItemMinted = inject<Ref<boolean>>('isItemMinted')!;
// const itemPrice = inject<string>('itemPrice')!;

// const isItemMinted = computed(() => {
//   return nftStore.isNftMinted(props.item.tokenId)
// })

// const curRarityName = computed(() => {
//   return item.attributes.find((attr: any) => attr.name === 'Rarity')?.value || 'N/A';
// })

// const curRarityScore = computed(() => {
//   return item.attributes.find((attr: any) => attr.trait_type === 'Rarity Score')?.value || 'N/A';
// })

const BuyTokenHandler = async () => {
  try {
    await BuyToken(props.item.tokenId)

    // console.log(">>> t", itemPrice.value);
    

  } catch(e) {
    console.log(">>> BuyToken Error", e);
    
  }
}

// console.log(">>> iten", isItemMinted.value);
</script>
<template>
<div class="front">
  <div class="nft-image-container">
    <img
      :src="item.imgUrl"
      class="nft-image"
      :alt="item.name"
    >
    <div class="nft-rarity-badge">{{ item.name }}</div>
    <div
      class="nft-bage nft-badge__status"
      :class="[item.isMinted ? 'sold' : 'available']"
    >
      {{ item.isMinted ? 'Sold' : 'Available' }}
    </div>
    <div
      class="nft-bage nft-badge__flip active"
      >
      <!-- :class="[ isConnected ? 'active' : 'not-active' ]" -->
     <div class=""@click="emit('openCard')">
       <span>👆</span> Click for details
     </div>
     <!-- <div v-else>
       To view details, please connect your wallet
     </div> -->
    </div>
  </div>
  <div class="nft-content">
    <div class="nft-header">
      <div class="nft-info">
          <div class="nft-title">{{ item.name }}</div>
          <div class="nft-collection">{{ item.collection }}</div>
      </div>
    </div>
    <div class="nft-content-info">
      <div class="nft-price-section">
        <div class="price-label">
            Preview Price
        </div>
        <div class="price-value">{{ prevPrice }} ETH </div>
      </div>
      <div class="nft-price-section">
        <div class="price-label">
            Rarity Score
        </div>
        <div class="price-value">{{ item.rarity }}</div>
      </div>
      <div class="nft-price-section">
        <div class="price-label">
            Rank
        </div>
        <!-- <div class="price-value">#{{ item?.rank ? item?.rank : 56 }} of {{ totalQuantity }}</div> -->
        <div class="price-value">#{{ item.rank }} of {{ totalQuantity }}</div>
      </div>
    </div>
    <button
      class="buy-btn"
      :class="{disabled: !isConnected}"
      :disabled="!isConnected"
      @click="BuyTokenHandler"
    >
      Buy Now
    </button>
  </div>
</div>
</template>
<style scoped>
  .front {
    z-index: 2;
  }
  .nft-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  }

  .nft-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .nft-card:hover .nft-image {
    transform: scale(1.1);
  }

  .nft-bage {
    position: absolute;
    right: 12px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;    
  }
  
  .nft-badge__status {
    top: 12px;
  }

  .nft-badge__status.available {
    color: #4ade80;
  }

  .nft-badge__status.sold {
    color: #ff6b6b;
  }

  .nft-rarity-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .nft-badge__flip {
    bottom: 12px;
  }
  .nft-badge__flip.active {
    animation: pulse 2s infinite;
  }

  .nft-badge__flip.not-active {
    right: 0;
    left: 50%;
    width: 96%;
    transform: translateX(-50%);
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
  }

  @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
  }

  .nft-content {
    padding: 8px 12px;
    width: 100%;
  }

  .nft-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 12px;
  }

  .nft-content-info {
    margin-bottom: 12px;
  }

  .nft-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    width: 100%;
  }

  .nft-title {
    font-size: 18px;
    font-weight: 700;
    color: white;
  }

  .nft-collection {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  .nft-price-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .price-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  .price-value {
    font-size: 14px;
    font-weight: 700;
    color: #60a5fa; 
  }

  .eth-icon {
    width: 16px;
    height: 16px;
  }

  .buy-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .buy-btn.disabled {
    background: rgba(102, 126, 234, 0.3);
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.4);
  }

  .buy-btn:not(.disabled):hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  .info-text {
    color: #cdcdcd;
  }

  .info-text.isActive {
    color: #4ade80;
  }
</style>