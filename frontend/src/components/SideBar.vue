<script setup lang="ts">
import { ref } from 'vue';
// import { useCommonStore } from "@/stores/useCommonStore";

// const commonStore = useCommonStore()

const isVisible = ref(false);
</script>
<template>
  <div
    class="activity-sidebar"
    :class="{'show': isVisible}"
  >
    <div class="activity-title">🔥 Live Activity</div>
    <div id="activityFeed">
      <div class="activity-item">
        <div class="activity-avatar"></div>
        <div class="activity-details">
          <div class="activity-text">User1 purchased Cosmic #142</div>
          <div class="activity-time">2m ago</div>
        </div>
      </div>
      <div class="activity-item">
        <div class="activity-avatar"></div>
        <div class="activity-details">
          <div class="activity-text">User2 listed Abstract #89</div>
          <div class="activity-time">5m ago</div>
        </div>
      </div>
      <div class="activity-item">
        <div class="activity-avatar"></div>
        <div class="activity-details">
          <div class="activity-text">User3 purchased Neon #456</div>
          <div class="activity-time">8m ago</div>
        </div>
      </div>
      <div class="activity-item">
        <div class="activity-avatar"></div>
        <div class="activity-details">
          <div class="activity-text">User4 listed Digital #23</div>
          <div class="activity-time">12m ago</div>
        </div>
      </div>
    </div>
  </div>
  <button
    @click="isVisible = !isVisible"
    class="toggle-activity"
  >
    {{ isVisible ? "✕" : "📊" }}
  </button>
</template>
<style scoped>
  .activity-sidebar {
    position: fixed;
    right: 0;
    top: 80px;
    width: 320px;
    height: calc(100vh - 80px);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 0.3s;
    z-index: 999;
  }

  .activity-sidebar.show {
    transform: translateX(0);
  }

  .activity-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    color: white;
  }

  .activity-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    margin-bottom: 12px;
    align-items: center;
  }

  .activity-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .activity-details {
    flex: 1;
  }

  .activity-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 4px;
  }

  .activity-time {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }

  .toggle-activity {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    transition: all 0.3s;
    z-index: 1000;
  }

  .toggle-activity:hover {
    transform: scale(1.1);
  }
</style>