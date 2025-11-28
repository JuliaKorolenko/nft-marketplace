<script setup lang="ts">
import { onMounted, computed, inject, type Ref } from 'vue';
import { type NFTCard } from '@/types/common';
import { useContract } from '@/composables/useContract';

const { getCurItemInfo } = useContract();


const emit = defineEmits();

onMounted(async () => {

});

const item = inject<NFTCard>('nftItem')!;
const isConnected = inject<Ref<boolean>>('isConnected')!;
const isItemMinted = inject<Ref<boolean>>('isItemMinted')!;

const curRarityName = computed(() => {
  return item.attributes.find((attr: any) => attr.trait_type === 'Rarity')?.value || 'N/A';
})

const curRarityScore = computed(() => {
  return item.attributes.find((attr: any) => attr.trait_type === 'Rarity Score')?.value || 'N/A';
})

// console.log(">>> iten", item.tokenId);
</script>
<template>
<div class="front">
  <div class="nft-image-container">
    <img
      :src="item.image"
      class="nft-image"
      :alt="item.name"
    >
    <div class="nft-rarity-badge">{{ curRarityName }}</div>
    <div
      v-if="isConnected"
      class="nft-bage nft-badge__status"
      :class="[isItemMinted ? 'sold' : 'available']"
    >
      {{ isItemMinted ? 'Sold' : 'Available' }}
      <!-- <div>Available</div> -->
      <!-- <div v-if="isConnected">Click to view details</div> -->
      <!-- <div
        class="info-text"
        :class="{isActive: isConnected}"
      >
        <span
          v-if="isConnected"
          @click="emit('openCard')"
        >
          Click to view details
        </span>
        <span v-else>To view details, please connect your wallet</span>
      </div> -->
    </div>
    <div
      class="nft-bage nft-badge__flip"
      :class="{ active: isConnected}"
    >
     <div class=""@click="emit('openCard')" v-if="isConnected">
       <span>👆</span> Click for details
     </div>
     <div v-else>
       To view details, please connect your wallet
     </div>
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
        <div class="price-value">{{ item.preview_price  }} ETH </div>
      </div>
      <div class="nft-price-section">
        <div class="price-label">
            Rarity Score
        </div>
        <div class="price-value">{{ curRarityScore }}</div>
      </div>
      <div class="nft-price-section">
        <div class="price-label">
            Rank
        </div>
        <div class="price-value">#3 of 500</div>
      </div>
    </div>
    <button
      class="buy-btn"
      :class="{disabled: !isConnected}"
      :disabled="!isConnected"
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

  @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
  }

  .nft-content {
    padding: 20px;
    width: 100%;
  }

  .nft-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 16px;
  }

  .nft-content-info {
    margin-bottom: 16px;
  }

  .nft-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* gap: 2px; */
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
    margin-bottom: 4px;
  }

  .price-value {
    /* font-size: 20px; */
    font-size: 14px;
    font-weight: 700;
    /* color: white; */
    color: #60a5fa; 
    display: flex;
    align-items: center;
    gap: 6px;
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
    color: rgba(255, 255, 255, 0.6);
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