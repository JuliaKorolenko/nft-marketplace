<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { filters } from '@/types/UIElements';

const curFilter = defineModel<string>();

const isShown = ref<boolean>(false);
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
  isShown.value = false;
});

const setCurrentFilter = (filterValue: string) => {
  curFilter.value = filterValue
};
</script>
<template>
  <div class="filter-dropdown">
    <button
      class="filter-btn"
      @click="isShown = !isShown"
    >
      <svg class="icon" viewBox="0 0 24 24">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span class="filter-label">
        {{ curFilter }}
      </span>
      <svg
        class="icon chevron"
        :class="{ rotated: isShown }"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
    <div
      class="dropdown-menu"
      :class="{ open: isShown}"
      ref="dropdownRef"
    >
      <button
        class="dropdown-item"
        :class="{ active: curFilter === value.value }"
        @click="setCurrentFilter(value.value)"
        v-for="value in filters"
      >
        {{ value.label }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 150px;
}

.filter-btn:hover {
  background: rgba(51, 65, 85, 0.8);
}

.filter-label {
  flex: 1;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 50;
  display: none;
}

.dropdown-menu.open {
  display: block;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.3s;
}

.dropdown-item:hover {
  background: #334155;
  color: white;
}

.dropdown-item.active {
  background: #4f46e5;
  color: white;
  font-weight: 600;
}
</style>