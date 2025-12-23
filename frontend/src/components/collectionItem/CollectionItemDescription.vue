<script setup lang="ts">
import { inject } from 'vue';
const description = inject<string>('nftDescription')!;
</script>
<template>
  <div class="nft-desc">
    {{ description }}
  </div>
</template>
<style scoped>
.nft-desc {
  padding: 20px 10px 10px 10px;
  font-size: 14px;
}
</style>