<script setup lang="ts">
import { computed } from 'vue';
import { useCommonStore } from '@/stores/useCommonStore';
import DropDown from '@/components/DropDown.vue';
import Search from '@/components/Search.vue';
import SortButton from '@/components/sort/SortButton.vue';

const store = useCommonStore()

const searchQuery = computed({
  get() {
    return store.getSearchQuery;
  },
  set(val) {
    store.setSearchQuery(val);
  }
})

const sortByOptions = computed({
  get(){
    return store.getSortBy;
  },
  set(value){
    store.setSortBy(value)
  }
})

const filterOption = computed({
  get() {
    return store.getActiveFilter;
  },
  set(val) {
    store.setActiveFilter(val);
  }
})
</script>
<template>
  <div class="filters-section">
    <div class="filters-container">
      <Search
        v-model="searchQuery"
      />
      <DropDown
        v-model="filterOption"
      />
      <SortButton
        type="price"
        v-model="sortByOptions"
      />
      <SortButton
        type="rank"
        v-model="sortByOptions"
      />
    </div>
  </div>
</template>
<style scoped>
  .filters-section {
    padding: 0 60px 30px;
    position: relative;
    z-index: 50;
  }

  .filters-container {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }  
</style>