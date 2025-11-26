<script setup lang="ts">
import { ref, provide, inject, type Ref, computed } from 'vue';
import { type NFTCard } from '@/types/common';
import CollectionItemTraits from './CollectionItemTraits.vue';
import CollectionItemDetails from './CollectionItemDetails.vue';
import CollectionItemDescription from './CollectionItemDescription.vue';

const emit = defineEmits();

const item = inject<NFTCard>('nftItem')!;
const price = inject<Ref<string>>('itemPrice')!;

const curTab = ref<string>('description');

const curTabComponent = computed(() => {
  // return curTab.value === 'traits' ? CollectionItemTraits : CollectionItemDetails;
  switch (curTab.value) {
    case 'description':
      return CollectionItemDescription;
    case 'traits':
      return CollectionItemTraits;
    case 'details':
      return CollectionItemDetails;
    default:
      return null;
    }   
  });

// const curRank = computed(() => {
//   return item.attributes.find((attr: any) => attr.trait_type === 'Rarity Score')?.value || 'N/A';
// })

provide('nftTraits', item.attributes);
provide('nftDescription', item.description);

</script>
<template>
<div class="card-back">
    <div class="back-header">
        <div class="back-title">{{ item.name }}</div>
        <button class="close-button" @click="emit('closeCard')">
            ✕
        </button>
    </div>

    <!-- Rarity Score -->
     <!-- {{ item.attributes }} -->
    <!-- <div class="rarity-score-card">
        <div class="rarity-number">{{ curRank }}</div>
        <div class="rarity-label">Rarity Score</div>
        <div class="rarity-rank">Rank #3 of 500</div>
    </div> -->
    <div class="rarity-price-card">
      <div class="price-label">Real-time Price</div>
        <div class="price-number">{{ price }} ETH</div>
        <div class="price-info">Calculated via smart contract</div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
        <button
          @click="curTab = 'description'"
          class="tab"
          :class="{ active: curTab === 'description' }"
        >
          Description
        </button>
        <button
          @click="curTab = 'traits'"
          class="tab"
          :class="{ active: curTab === 'traits' }"
        >
          Traits
        </button>
        <button
          @click="curTab = 'details'"
          class="tab"
          :class="{ active: curTab === 'details' }"
        >
          Details
        </button>
    </div>
    <!-- Tab Contents -->
    <component :is="curTabComponent" />

    <!-- <div class="tab-content " id="traits-3">
        <div class="traits-grid">
            <div class="trait-card">
                <div class="trait-type">Flower Type</div>
                <div class="trait-value">Orchid</div>
                <div class="trait-rarity">
                    <span class="rarity-percent">4%</span>
                    <div class="rarity-bar">
                        <div class="rarity-fill" style="width: 40%"></div>
                    </div>
                </div>
            </div>
            <div class="trait-card">
                <div class="trait-type">Color</div>
                <div class="trait-value">Rainbow</div>
                <div class="trait-rarity">
                    <span class="rarity-percent">1%</span>
                    <div class="rarity-bar">
                        <div class="rarity-fill" style="width: 10%"></div>
                    </div>
                </div>
            </div>
            <div class="trait-card">
                <div class="trait-type">Effect</div>
                <div class="trait-value">Magic Aura</div>
                <div class="trait-rarity">
                    <span class="rarity-percent">0.9%</span>
                    <div class="rarity-bar">
                        <div class="rarity-fill" style="width: 9%"></div>
                    </div>
                </div>
            </div>
            <div class="trait-card">
                <div class="trait-type">Art Style</div>
                <div class="trait-value">3D Render</div>
                <div class="trait-rarity">
                    <span class="rarity-percent">10%</span>
                    <div class="rarity-bar">
                        <div class="rarity-fill" style="width: 10%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="tab-content active" id="details-3">
        <div class="details-list">
            <div class="detail-row">
                <span class="detail-label">Token ID</span>
                <span class="detail-value">567</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Owner</span>
                <span class="detail-value">0x8a3c...9f21</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Contract</span>
                <a href="#" class="detail-link" onclick="event.stopPropagation()">
                    0x742d...5e38 ↗
                </a>
            </div>
            <div class="detail-row">
                <span class="detail-label">Blockchain</span>
                <span class="detail-value">Sepolia</span>
            </div>
        </div>
    </div> -->
</div>
</template>
<style scoped>
.back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  transform: rotateY(180deg); /* Изначально повернута на 180° */
  padding: 20px;
}

.card-back {
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: rotateY(180deg);
  padding: 20px;
  /* overflow-y: auto; */
  transform: rotateY(180deg); 
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

/* Traits Grid */
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

/* Details List */


/* Rarity Score */
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
  color: transparent;       /* text-transparent */
  background: linear-gradient(to right, #60a5fa, #c084fc); /* blue-400 → purple-400 */
  -webkit-background-clip: text; /* bg-clip-text */
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