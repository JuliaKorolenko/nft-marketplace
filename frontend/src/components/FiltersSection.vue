<script setup lang="ts">
import { computed } from 'vue';
import { filters, sortByOptions} from '@/types/UIElements';


const filter = defineModel<string>('selectedFilters');
const sort = defineModel<string>('selectedSortBy');
const searchQuery = defineModel<string>('searchQuery');


const sortValue = computed(() => {
  return sortByOptions.find(option => option.value === sort.value)?.label || '';
});


</script>

<template>
  <div class="filters-section">
    <div class="filters-container">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          placeholder="Search NFTs by name"
          type="text"
          v-model="searchQuery"
        >
        <span class="clear-icon" @click="searchQuery=''">x</span>
      </div>
      <div class="filter-group">
        <button
          class="filter-btn"
          :class="{'active': filter===value.value}"
          v-for="value in filters"
          :key="value.label"
          @click="filter = value.value"
        >
        {{ value.label }}
        </button>
      </div>
      <div class="filter-group">
        <button
          class="filter-btn"
          @click="sort === 'up' ? sort = 'down' : sort = 'up'"
        >
          {{ sortValue }}
        </button>
        <!-- <button class="filter-btn">Recently Listed</button> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
  .filters-section {
    padding: 0 60px 30px;
  }

  .filters-container {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 300px;
    position: relative;
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
  
</style>