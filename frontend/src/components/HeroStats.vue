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
  <div class="hero-stats content-container">
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    padding-top: 40px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s;
    flex: 1;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.5);
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin-bottom: 8px;
    white-space: nowrap;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
  }

    @media (max-width: 980px) {
      .stat-card {
        flex: 48%;
      }
    }
    @media (max-width: 700px) {
      .hero-stats  {
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 7px;
        margin: 10px 20px;
        width: auto;
        gap: 0;
      }
      .stat-card {
        flex: 100%;
        padding: 2px 0px;
        display: flex;
        align-items: end;
        justify-content: space-between;
        border-radius: 0;
        background: none;
        border: none;
        backdrop-filter: none;
      }
      .stat-value {
        font-size: 18px;
      }
    }
    @media (max-width: 500px) {
      .hero-stats  {
        margin: 10px;
      }
    }
</style>
