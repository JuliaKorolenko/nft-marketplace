<script setup lang="ts">
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import HeroStats from './components/HeroStats.vue';
import FiltersSection from './components/FiltersSection.vue';
import CollectionList from './components/collections/CollectionList.vue';
import Footer from './components/Footer.vue';


</script>

<template>
  <div class="container">
    <NavBar />
    <SideBar />
    <HeroStats />
    <FiltersSection />
    <CollectionList />
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
