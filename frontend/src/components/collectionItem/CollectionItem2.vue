<script setup lang="ts">
import { ref } from 'vue';
import { useContract } from '@/composables/useContract';
import { useWallet } from '@/composables/useWallet';
import { type NFTCard } from '@/types/common';

const { isConnected } = useWallet();

const { getCurItemPrice } = useContract();
const price = ref<string>("");
const isFlipped = ref<boolean>(false);

const activeTab = ref('Traits')
const tabs = ['Traits', 'Details']

const props = defineProps<{
  item: NFTCard,
}>();

const test = async () => {
  // console.log(">>> clicked item:", props.item);
  const tokenId = props.item.tokenId;
  const dataHash = props.item.metadataIpfsHash;
  const rarityScore = props.item.attributes.find((attr: any) => attr.trait_type === 'Rarity Score')?.value;
  // console.log(">>> test", tokenId, dataHash, rarityScore);
  
  price.value = await getCurItemPrice({ tokenId, dataHash, rarityScore });
}
</script>
<template>
  <div 
    class="nft-card-container" 
    :class="{ flipped: isFlipped }"
    @click="isFlipped = !isFlipped"
  >
    <div class="flipper">
        <!-- Б1 - Передняя сторона -->
        <div class="front">
            <div class="icon">🎴</div>
            <h2>Передняя сторона</h2>
            <p>Наведите курсор, чтобы перевернуть карточку</p>
        </div>
        
        <!-- Б2 - Задняя сторона -->
        <div class="back">
            <div class="icon">✨</div>
            <h2>Задняя сторона</h2>
            <p>Вот так работает эффект переворота!</p>
        </div>
    </div>
  </div>
</template>
<style scoped>
        .nft-card-container {
            width: 300px;
            height: 400px;
            perspective: 1000px; /* Создает 3D пространство */
            cursor: pointer;
        }
        .flipper {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        .front, .back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden; /* Скрывает обратную сторону элемента */
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* Б1 - передняя сторона */
        .front {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            z-index: 2;
        }

        /* Б2 - задняя сторона */
        .back {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            transform: rotateY(180deg); /* Изначально повернута на 180° */
        }

        h2 {
            margin: 0 0 20px 0;
            font-size: 28px;
        }

        p {
            text-align: center;
            line-height: 1.6;
            margin: 0;
        }

        .icon {
            font-size: 80px;
            margin-bottom: 20px;
        }

        .nft-card-container.flipped .flipper {
            transform: rotateY(180deg);
        }




  /* .nft-card-container {
      position: relative;
      width: 100%;
      height: 600px;
      cursor: pointer;
  } */
/* .nft-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.nft-card-container.flipped .nft-card {
    transform: rotateY(180deg);
} */

/* Front and Back */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
}

/* Front Side */
.card-front {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.nft-card-container:hover .card-front {
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.nft-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  overflow: hidden;
}

.nft-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.nft-card-container:hover .nft-image {
    transform: scale(1.05);
}

.status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 14px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
}

.status-badge.available {
    color: #4ade80;
}

.status-badge.sold {
    color: #ff6b6b;
}

.rarity-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
}

.flip-hint {
    position: absolute;
    bottom: 12px;
    right: 12px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

.card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.collection-name {
    color: #667eea;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.nft-name {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
    color: white;
}

.quick-traits {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.quick-trait {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
}

.price-section {
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.price-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    margin-bottom: 6px;
}

.price-value {
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.buy-button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
}

.buy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.buy-button.sold {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
}

/* Back Side */
.card-back {
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: rotateY(180deg);
    padding: 24px;
    overflow-y: auto;
}

.back-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-title {
    font-size: 20px;
    font-weight: 700;
}

.close-button {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
}

.tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.tab {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.tab.active {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.5);
    color: white;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

/* Traits Grid */
.traits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.trait-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 12px;
}

.trait-type {
    color: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.trait-value {
    font-size: 14px;
    font-weight: 700;
    color: white;
    margin-bottom: 6px;
}

.trait-rarity {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
}

.rarity-percent {
    color: #667eea;
    font-weight: 600;
}

.rarity-bar {
    flex: 1;
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
}

.rarity-fill {
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.6s ease;
}

/* Details List */
.details-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
}

.detail-value {
    color: white;
    font-weight: 600;
    font-size: 13px;
}

.detail-link {
    color: #667eea;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Rarity Score */
.rarity-score-card {
    background: rgba(102, 126, 234, 0.1);
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.rarity-number {
    font-size: 42px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
}

.rarity-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    margin-bottom: 8px;
}

.rarity-rank {
    color: white;
    font-weight: 600;
    font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
    .nft-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
    }

    .nft-card-container {
        height: 550px;
    }

    .traits-grid {
        grid-template-columns: 1fr;
    }
}






  .nft-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .nft-card:hover {
    transform: translateY(-10px);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  }

  .nft-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  }

  .nft-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .nft-card:hover .nft-image {
    transform: scale(1.1);
  }

  .nft-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #4ade80;
  }

  .nft-content {
    padding: 20px;
  }

  .nft-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 12px;
  }

  .nft-title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
  }

  .nft-collection {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  .nft-likes {
    display: flex;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
  }

  .nft-price-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .price-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 4px;
  }

  .price-value {
    font-size: 20px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .eth-icon {
    width: 16px;
    height: 16px;
  }

  .buy-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .buy-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
</style>