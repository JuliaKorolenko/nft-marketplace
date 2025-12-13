<script setup lang="ts">
import { ref } from 'vue';
const cardCount = ref(4);
</script>
<template>
  <div class="skeleton-container">    
    <div class="skeleton-grid">
      <div 
        v-for="index in cardCount" 
        :key="index" 
        class="skeleton-card"
      >
        <div class="skeleton-image">
          <div class="skeleton-spinner"></div>
          <div class="skeleton-shimmer"></div>
        </div>
        
        <!-- Card Content -->
        <!-- <div class="skeleton-content">
          <div class="skeleton-line skeleton-line-title"></div>
          
          <div class="skeleton-description">
            <div class="skeleton-line skeleton-line-medium"></div>
            <div class="skeleton-line skeleton-line-short"></div>
          </div>
          
          <div class="skeleton-footer">
            <div class="skeleton-price">
              <div class="skeleton-line skeleton-line-label"></div>
              <div class="skeleton-line skeleton-line-price"></div>
            </div>
            <div class="skeleton-button"></div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.skeleton-container {
  /* min-height: 100vh; */
  /* background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); */
  padding: 2rem;
}

.skeleton-grid {
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); */
  gap: 1.5rem;
  /* max-width: 1400px; */
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.skeleton-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #334155;
  transition: transform 0.3s ease;
  flex: 1;
  height: 300px;
}

.skeleton-card:hover {
  transform: translateY(-4px);
}

.skeleton-image {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 100%;
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  overflow: hidden;
}

.skeleton-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  border: 4px solid #475569;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(148, 163, 184, 0.2) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

/* .skeleton-content {
  padding: 1.25rem;
} */

/* .skeleton-line {
  background: linear-gradient(90deg, #475569 0%, #334155 100%);
  border-radius: 0.5rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-line-title {
  height: 1.5rem;
  margin-bottom: 1rem;
}

.skeleton-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skeleton-line-medium {
  height: 1rem;
  width: 75%;
}

.skeleton-line-short {
  height: 1rem;
  width: 50%;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #334155;
}

.skeleton-price {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skeleton-line-label {
  height: 0.75rem;
  width: 3rem;
}

.skeleton-line-price {
  height: 1.25rem;
  width: 5rem;
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%);
}

.skeleton-button {
  height: 2.5rem;
  width: 6rem;
  background: linear-gradient(90deg, #475569 0%, #334155 100%);
  border-radius: 0.5rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
} */

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .skeleton-container {
    padding: 1rem;
  }
  
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>