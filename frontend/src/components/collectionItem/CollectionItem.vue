<script setup lang="ts">
import { ref } from 'vue';
import { type NFTCard } from '@/types/common';
import CollectionItemFront from '@/components/collectionItem/CollectionItemFront.vue';
import CollectionItemBack from '@/components/collectionItem/CollectionItemBack.vue';

defineProps<{
  item: NFTCard,
}>();

const isFlipped = ref<boolean>(false);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
}
</script>
<template>
  <div
  class="nft-card-container"
  :class="{ flipped: isFlipped }"
  >
    <div class="nft-card">
      <CollectionItemFront
        class="nft-card__side"
        :item="item"
        @openCard="flipCard"
      />
      <CollectionItemBack
        class="nft-card__side"
        :item="item"
        @closeCard="flipCard"
      />
    </div>
  </div>
</template>
<style scoped>
  .nft-card-container {
    max-width: 280px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    perspective: 1000px;
    position: relative;
    width: 100%;
    height: 550px;
  }

  .nft-card-container:not(.nft-card_disabled):hover {
    transform: translateY(-10px);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  }

  .nft-card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
    transform-style: preserve-3d;
  }

  .nft-card-container.flipped .nft-card {
    transform: rotateY(180deg);
  }

  .nft-card__side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
</style>