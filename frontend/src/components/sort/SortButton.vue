<script setup lang="ts">
import { computed } from 'vue';
import { type SortBy, sortByOptions } from '@/types/UIElements';
import SvgPrice from './SvgPrice.vue';
import SvgRating from './SvgRating.vue';

const props = defineProps<{
  type: 'price' | 'rank'
}>()

const sortBy = defineModel<SortBy>();

const buttonValue = computed(() => {  
  if (sortBy.value?.value === 'asc') {
    return '↑';
  } else if (sortBy.value?.value === 'desc') {
    return '↓';
  }
});

const currentLabel = computed(() => {
  return sortByOptions.find(o => o.value === sortBy.value?.value)?.label || 'Sort'
})

const curIcon = computed(() => {
  switch(props.type) {
    case 'price':
      return SvgPrice;
    case 'rank':
      return SvgRating;
    default:
      return null    
  }
})

const isButtonActive = computed(() => props.type === sortBy.value?.type)

const sortHandler = () => {
  if (!sortBy.value) {
    sortBy.value = { type: props.type, value: 'asc' };
    return;
  }
  if (!sortBy.value.value) {
    sortBy.value = { type: props.type, value: 'asc' }
  } else if (sortBy.value.value === 'asc') {
    sortBy.value = { type: props.type, value: 'desc' }
  } else {
    sortBy.value = { type: props.type, value: null }
  }
};
</script>
<template>
  <button
    class="sort-btn"
    :class="{ active: sortBy?.value && isButtonActive}"
    :title="currentLabel"
    @click="sortHandler"
  >
    <component :is="curIcon" />
    <span class="sort-arrow">
      {{ isButtonActive ? buttonValue : '↓↑' }}
    </span>
  </button>
</template>
<style scoped>
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
  min-width: 12px;
}

@media (max-width: 500px) {
  .sort-btn {
    width: calc(49% - 5px);
    order: 2;
    border-radius: 7px;
  }
}
</style>