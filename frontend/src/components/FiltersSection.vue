<script setup lang="ts">
import { computed } from 'vue';
import { filters, sortByOptions} from '@/types/UIElements';
import DropDown from './filters/DropDown.vue';
import Search from './filters/Search.vue';


// const selectedFilters = defineModel<string>('selectedFilters');
const sort = defineModel<string>('selectedSortBy');
// const searchQuery = defineModel<string>('searchQuery');


const sortValue = computed(() => {
  return sortByOptions.find(option => option.value === sort.value)?.label || '';
});

// sort 'desc' / 'asc'


</script>

<template>
  <div class="filters-section">
    <div class="filters-container">
      <Search />
      <DropDown />

      




      <!-- Sort by Price -->
      <button class="sort-btn" id="sortPriceBtn" title="Sort by Price">
        <svg class="icon" viewBox="0 0 24 24">
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <span class="sort-arrow" id="priceSortArrow"></span>
      </button>

      <!-- Sort by Rating -->
      <button class="sort-btn" id="sortRatingBtn" title="Sort by Rating">
        <svg class="icon" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span class="sort-arrow" id="ratingSortArrow"></span>
      </button>





      <!-- <div class="filter-group">
        <button
          class="filter-btn"
          :class="{'active': filter===value.value}"
          v-for="value in filters"
          :key="value.label"
          @click="filter = value.value"
        >
        {{ value.label }}
        </button>
      </div> -->
      <!-- <div class="filter-group">
        <button
          class="filter-btn"
          @click="sort === 'up' ? sort = 'down' : sort = 'up'"
        >
          {{ sortValue }}
        </button>
      </div> -->
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

    .sort-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(71, 85, 105, 0.5);
      color: #cbd5e1;
      cursor: pointer;
      transition: all 0.3s;
    }

    .sort-btn:hover {
      background: rgba(51, 65, 85, 0.8);
      color: white;
    }

    .sort-btn.active {
      background: #4f46e5;
      color: white;
      border-color: #4f46e5;
    }

    .sort-arrow {
      font-size: 0.75rem;
    }

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