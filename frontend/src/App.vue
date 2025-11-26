<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import HeroStats from '@/components/HeroStats.vue';
import FiltersSection from '@/components/FiltersSection.vue';
import CollectionList from '@/components/CollectionList.vue';
import Footer from '@/components/Footer.vue';
import { type FilterValue, type SortByValue  } from '@/types/UIElements';

const selectedFilters = ref<FilterValue>('all');
const selectedSortBy = ref<SortByValue>('up');
const searchQuery = ref<string>('');

</script>

<template>
  <div class="container">
    <NavBar />
    <SideBar />
    <HeroStats />
    <FiltersSection
      v-model:selectedFilters="selectedFilters"
      v-model:selectedSortBy="selectedSortBy"
      v-model:searchQuery="searchQuery"
    />
    <CollectionList
      :selectedFilters="selectedFilters"
      :selectedSortBy="selectedSortBy"
      :searchQuery="searchQuery"
    />
    <Footer />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
