<script setup  lang="ts">
import { ref } from 'vue';
import type {
  Notification,
  NotificationOptions,
  NotificationComponent
} from '@/types/UIElements'

// Состояние уведомлений
const notifications = ref<Notification[]>([]);
let notificationId = 0;

// Добавить уведомление
const addNotification = (options: NotificationOptions): number => {

  const {
    type = 'info',
    title = '',
    message,
    duration = 5000
  } = options

  const id = ++notificationId;
  
  notifications.value.push({
    id,
    type,
    title,
    message,
    duration
  });
  
  setTimeout(() => {
    removeNotification(id);
  }, duration);
  
  return id;
};

const removeNotification = (id: number): void => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

const success = (message: string, title?: string, duration?: number) =>
  addNotification({ type: 'success', message, title, duration })

const error = (message: string, title?: string, duration?: number) =>
  addNotification({ type: 'error', message, title, duration })

const warning = (message: string, title?: string, duration?: number) =>
  addNotification({ type: 'warning', message, title, duration })

const info = (message: string, title?: string, duration?: number) =>
  addNotification({ type: 'info', message, title, duration })

defineExpose<NotificationComponent>({
  addNotification,
  removeNotification,
  success,
  error,
  warning,
  info
})
</script>
<template>
  <Teleport to="body">
    <TransitionGroup
      name="notification"
      tag="div"
      class="notification-container"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-icon">
          <svg v-if="notification.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="notification.type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else-if="notification.type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div class="notification-content">
          <div v-if="notification.title" class="notification-title">
            {{ notification.title }}
          </div>
          <div class="notification-message">
            {{ notification.message }}
          </div>
        </div>
        
        <button 
          class="notification-close"
          @click.stop="removeNotification(notification.id)"
          aria-label="Close notification"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div 
          class="notification-progress"
          :style="{ animationDuration: `${notification.duration}ms` }"
        ></div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>
<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
  pointer-events: none;
}

.notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  min-width: 300px;
  max-width: 400px;
  pointer-events: all;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.notification:hover {
  transform: translateX(-4px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

.notification-success {
  border-left-color: #10b981;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.notification-error {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
}

.notification-warning {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.notification-info {
  border-left-color: #3b82f6;
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
}

.notification-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-success .notification-icon {
  color: #10b981;
  background: #d1fae5;
}

.notification-error .notification-icon {
  color: #ef4444;
  background: #fee2e2;
}

.notification-warning .notification-icon {
  color: #f59e0b;
  background: #fef3c7;
}

.notification-info .notification-icon {
  color: #3b82f6;
  background: #dbeafe;
}

.notification-icon svg {
  width: 1rem;
  height: 1rem;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.notification-message {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.4;
  word-wrap: break-word;
}

.notification-close {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #4b5563;
}

.notification-close svg {
  width: 1rem;
  height: 1rem;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform-origin: left;
  animation: progress linear forwards;
}

.notification-success .notification-progress {
  background: #10b981;
}

.notification-error .notification-progress {
  background: #ef4444;
}

.notification-warning .notification-progress {
  background: #f59e0b;
}

.notification-info .notification-progress {
  background: #3b82f6;
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Анимации появления/исчезновения */
.notification-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(100%) scale(0.8);
    opacity: 0;
  }
}

/* Мобильная адаптация */
@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
  
  .notification {
    min-width: 0;
    max-width: none;
  }
}
</style>