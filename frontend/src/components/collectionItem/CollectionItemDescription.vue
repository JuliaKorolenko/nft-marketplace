<script setup lang="ts">
import { inject } from 'vue';
const description = inject<string>('nftDescription')!;
</script>
<template>{{ description }}</template>
<style scoped></style>