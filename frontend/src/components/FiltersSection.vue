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
        type="rating"
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

 
  .filter-group {
    display: flex;
    gap: 12px;
  }

  .filter-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 500;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(102, 126, 234, 0.5);
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

/* dropdown */

  

    /* Sort */

    

     /* Icons SVG */
    .icon {
      width: 1.25rem;
      height: 1.25rem;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

  
</style>