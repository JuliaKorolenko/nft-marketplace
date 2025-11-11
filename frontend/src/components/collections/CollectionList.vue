<script setup lang="ts">
import CollectionItem from './CollectionItem.vue';
import { useGetNftData } from '@/composables/useGetNftData';

const filter = defineModel<string>('selectedFilters', { default: 'all'});
const sort = defineModel<string>('selectedSortBy', { default: 'up' });

const { isLoading, sortedFilteredCollection } = useGetNftData({ filter, sort });

// console.log(">>> collections", collections.value);
// const collectionsData = collections.value?.nfts || []

const nfts = [
  {
    id: 1,
    name: "Cosmic Dreamer #142",
    collection: "Cosmic Dreams",
    price: 2.5,
    likes: 234,
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    status: "On Sale",
  },
  {
    id: 2,
    name: "Abstract Mind #89",
    collection: "Abstract Minds",
    price: 1.8,
    likes: 189,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    status: "On Sale",
  },
  {
    id: 3,
    name: "Neon City #456",
    collection: "Neon Cities",
    price: 3.2,
    likes: 567,
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
    status: "Hot",
  },
  {
    id: 4,
    name: "Digital Sunset #23",
    collection: "Digital Skies",
    price: 1.5,
    likes: 145,
    image:
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop",
    status: "On Sale",
  },
  {
    id: 5,
    name: "Cyber Punk #78",
    collection: "Cyber World",
    price: 4.1,
    likes: 892,
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop",
    status: "Hot",
  },
  {
    id: 6,
    name: "Galaxy Explorer #991",
    collection: "Space Odyssey",
    price: 2.9,
    likes: 423,
    image:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&h=400&fit=crop",
    status: "On Sale",
  },
  {
    id: 7,
    name: "Ethereal Being #334",
    collection: "Ethereal Collection",
    price: 5.5,
    likes: 1024,
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop&sat=-100",
    status: "Hot",
  },
  {
    id: 8,
    name: "Pixel Dreams #127",
    collection: "Pixel Art",
    price: 0.9,
    likes: 67,
    image:
      "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&h=400&fit=crop",
    status: "On Sale",
  },
];
</script>
<template>
  <div class="nft-grid" id="nftGrid">
    <CollectionItem
      v-for="item in sortedFilteredCollection"
      :key="item.name"
      :item="item"
    />
  </div>
</template>
<style scoped>
  .nft-grid {
    padding: 20px 60px 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }

</style>