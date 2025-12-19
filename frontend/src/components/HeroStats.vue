<script setup lang="ts">
import { computed } from 'vue';
import { ethers } from 'ethers';
import { useCommonStore} from '@/stores/useCommonStore'

const commonStore = useCommonStore()

const available = computed(() => commonStore.getAvailableTokensQuantity ? commonStore.getAvailableTokensQuantity : 0)
const maxPrice = computed(() => commonStore.getMaxTokenPrice ? ethers.formatEther(commonStore.getMaxTokenPrice) : 0)
const minPrice = computed(() => commonStore.getMinTokenPrice ? ethers.formatEther(commonStore.getMinTokenPrice) : 0)
const totalSales = computed(() => commonStore.getTotalSales ? ethers.formatEther(commonStore.getTotalSales) : 0)

</script>
<template>
  <div class="hero-stats">
    <div class="stat-card">
      <div class="stat-label">Available Tokens</div>
      <div class="stat-value">{{ available }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Floor Price</div>
      <div class="stat-value">{{ minPrice }} ETH</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Ceiling price</div>
      <div class="stat-value">{{ maxPrice }} ETH</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Total sales</div>
      <div class="stat-value">{{ totalSales }} ETH</div>
    </div>
  </div>
</template>
<style scoped>
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 40px 60px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.5);
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
