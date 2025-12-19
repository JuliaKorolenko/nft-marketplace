<script setup lang="ts">
import { inject } from 'vue';
import { type nftDetails, nftDetail } from '@/types/UIElements';

const details = inject<nftDetails>('nftDetails')!; 
</script>
<template>
<div class="details-list">
  <div
    class="detail-row"
    v-for="item in nftDetail"
    :key="item.value"
  >
      <span
        class="detail-label"
      >
        {{ item.label }}
      </span>
      <span
        class="detail-value"
        :class="{'detail-value__address': item.value === 'contract_address'}"
      >
        {{ details[item.value] }}
      </span>
  </div>
</div>
</template>
<style scoped>
.details-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding-right: 7px;
  overflow-y: auto;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.detail-value {
  color: white;
  font-weight: 600;
  font-size: 13px;
}

.detail-value__address {
  color: #22d3ee;
}
</style>