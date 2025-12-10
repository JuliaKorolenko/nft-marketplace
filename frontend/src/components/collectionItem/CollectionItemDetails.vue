<script setup lang="ts">
import { inject } from 'vue';
// import { nftDetail } from '@/types/UIElements'

// const curItemDetail = inject<Record<string, any>>('itemDetail', {})
// defineProps<{
//   details: object | null
//   loading: boolean
// }>()
const details = inject<object>('nftDetails')!;
const isLoad = inject<boolean>('nftDetailsIsLoad')!;
</script>
<template>
<div v-if="isLoad">Loading details...</div>
<div class="details-list" v-else>
  <div
    class="detail-row"
    v-for="(item, key) in details"
    :key="key"
  >
      <span
        class="detail-label"
      >
        {{ key }}
      </span>
      <span
        class="detail-value"
        :class="{'detail-value__address': key === 'contract_address'}"
      >
        {{ item }}
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
  /* scrollbar-width: thin;          /* Firefox */
  /* scrollbar-color: #888 #eee;  */
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