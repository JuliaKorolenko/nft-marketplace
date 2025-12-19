<script setup lang="ts">
  import { ethers } from 'ethers';
import { ref, provide, computed } from 'vue';
import type { Component } from 'vue';
import { type NFTCard } from '@/types/common';
import { type nftDetails, type TabKey, TABS } from '@/types/UIElements';
import CollectionItemTraits from './CollectionItemTraits.vue';
import CollectionItemDetails from './CollectionItemDetails.vue';
import CollectionItemDescription from './CollectionItemDescription.vue';
import { useConnectStore } from "@/stores/useConnectStore";

const emit = defineEmits();

const props = defineProps<{
  item: NFTCard,
}>();

const connectStore = useConnectStore() 

const tabComponentMap: Record<TabKey, Component> = {
  description: CollectionItemDescription,
  traits: CollectionItemTraits,
  details: CollectionItemDetails,
}

const curTab = ref<TabKey>('description');

const curTabComponent = computed(() => tabComponentMap[curTab.value])

const curPrice = computed(() => {
  return Number(ethers.formatEther(props.item.price));
})

const curDetails = computed<nftDetails>(() => {
  return {
    contract_address: connectStore.getCurContractAddress || '-',
    token_id: `#${props.item.tokenId}`,
    token_standart: 'ERC-721',
    blockchain: connectStore.curNetwork || '-',
  } 
})

provide('nftTraits', props.item.attributes);
provide('nftDescription', props.item.description);
provide('nftDetails', curDetails)

</script>
<template>
<div class="card-back">
  <div class="back-header">
    <div class="back-title">{{ item.name }}</div>
    <button class="close-button" @click="emit('closeCard')">
        ✕
    </button>
    </div> 
    <div class="rarity-price-card">
      <div class="price-label">Real-time Price</div>
        <div class="price-number">{{ curPrice }} ETH</div>
        <div class="price-info">Calculated via smart contract</div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        @click="curTab = tab.key"
        class="tab"
        :class="{ active: curTab === tab.key }"
      >
        {{ tab.label }}
      </button>
    </div>
    <!-- Tab Contents -->
     <keep-alive>
       <component :is="curTabComponent" />
     </keep-alive>
</div>
</template>
<style scoped>
.back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  transform: rotateY(180deg);
  padding: 20px;  
}

.card-back {
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: rotateY(180deg);
  padding: 20px;
}

.back-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.back-title {
  font-size: 20px;
  font-weight: 700;
}

.close-button {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
}

.tab {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab.active {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.5);
  color: white;
}

.tab-content {
  display: none;
  width: 100%;
}

.tab-content.active {
  display: block;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.trait-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
}

.trait-type {
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.trait-value {
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}

.trait-rarity {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.rarity-percent {
  color: #667eea;
  font-weight: 600;
}

.rarity-bar {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.rarity-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.6s ease;
}

.rarity-price-card {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  padding: 12px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

.price-number {
  font-size: 36px;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(to right, #60a5fa, #c084fc);
  -webkit-background-clip: text; 
  background-clip: text
}

.price-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.price-info {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;  
}

.rarity-number {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.rarity-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin-bottom: 8px;
}

.rarity-rank {
  color: white;
  font-weight: 600;
  font-size: 14px;
}
</style>