<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Notification from '@/components/Notification.vue';
import NavBar from '@/components/NavBar.vue';
import HeroStats from '@/components/HeroStats.vue';
import FiltersSection from '@/components/FiltersSection.vue';
import CollectionList from '@/components/CollectionList.vue';
import Footer from '@/components/Footer.vue';
import { useNotification } from './composables/useNotification';
import { type NotificationComponent } from '@/types/UIElements'

const { setNotificationRef } = useNotification();

const notificationRef = ref<NotificationComponent | null>(null);

onMounted(() => {
  if(notificationRef.value) {
    setNotificationRef(notificationRef.value);
  }
});
</script>

<template>
  <Notification ref="notificationRef" />
  <div class="container">
    <NavBar />
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
