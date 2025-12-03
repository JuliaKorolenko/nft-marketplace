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
  font-size: 13px;
}
</style>