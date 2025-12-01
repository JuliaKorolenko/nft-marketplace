<script setup lang="ts">
import { computed } from 'vue';
import { useCommonStore } from '@/stores/commonStore';

const commonStore = useCommonStore();

const searchQuery = computed<string>({
  get() {
    return commonStore.getSearchQuery;
  },
  set(value: string) {
    commonStore.setSearchQuery(value);
  }
});
</script>
<template>
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input
      placeholder="Search NFTs by name"
      type="text"
      v-model="searchQuery"
    >
    <span class="clear-icon" @click="searchQuery=''">x</span>
  </div>
</template>
<style scoped>
 .search-box {
    flex: 1;
    min-width: 300px;
    max-width: 500px;
    position: relative;
    margin-right: auto;
  }

  .search-box input {
    width: 100%;
    padding: 14px 20px 14px 45px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: white;
    font-size: 15px;
    transition: all 0.3s;
  }

  .search-box input:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.5);
    background: rgba(255, 255, 255, 0.1);
  }

  .search-icon, .clear-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .search-icon {
    left: 16px;
    color: rgba(255, 255, 255, 0.5);
  }

  .clear-icon  {
    right: 16px;
    font-size: large;
    opacity: 0.3;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .clear-icon:hover {
    opacity: 0.7;
  }
</style>