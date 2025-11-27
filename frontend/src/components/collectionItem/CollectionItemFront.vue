<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { type NFTCard } from '@/types/common';

const emit = defineEmits();

// const props = defineProps<{
//   item: NFTCard,
//   isConnected: boolean,
// }>();

const item = inject<NFTCard>('nftItem')!;
const isConnected = inject<Ref<boolean>>('isConnected')!;
</script>
<template>
<div class="front">
  <div class="nft-image-container">
    <img
      :src="item.image"
      class="nft-image"
      :alt="item.name"
    >
    <div class="nft-badge">
      <!-- <div>On Sale</div> -->
      <!-- <div v-if="isConnected">Click to view details</div> -->
      <div
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
        <!-- {{ isConnected ? 'Click to view details' : 'To view details, please connect your wallet' }} -->
      </div>
    </div>
  </div>
  <div class="nft-content">
    <div class="nft-header">
      <div>
          <div class="nft-title">{{ item.name }}</div>
          <div class="nft-collection">{{ item.collection }}</div>
      </div>
    </div>
    <div class="nft-price-section">
      <div>
          <div class="price-label">
              Preview Price
          </div>
          <div class="price-value">
              <svg class="eth-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"></path>
              </svg>
              {{ item.preview_price  }} ETH 
          </div>
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

  .nft-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .nft-content {
    padding: 20px;
    width: 100%;
  }

  .nft-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 12px;
  }

  .nft-title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
  }

  .nft-collection {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  .nft-likes {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
  }

  .nft-price-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .price-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 4px;
  }

  .price-value {
    font-size: 20px;
    font-weight: 700;
    color: white;
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