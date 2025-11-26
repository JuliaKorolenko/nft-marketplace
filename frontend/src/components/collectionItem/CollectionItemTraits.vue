<script setup lang="ts">
import { inject } from 'vue';
const traits = inject<any[]>('nftTraits')!;
</script>
<template>
  <div class="details-list">
    <div
      class="detail-row"
      v-for="(trait, index) in traits"
      :key="trait.trait_type"
    >
        <span class="detail-label">{{ trait.trait_type }}</span>
        <span class="detail-value">{{ trait.value }}</span>
    </div>
  </div>
</template>
<style scoped>
.details-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding-right: 5px;
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

.detail-link {
  color: #667eea;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.details-list::-webkit-scrollbar {
  width: 6px;
}
.details-list::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
.details-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.details-list::-webkit-scrollbar-track {
  background: transparent;
}
</style>