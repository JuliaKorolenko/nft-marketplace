// composables/useNotification.ts
import { ref, type Ref } from 'vue';
import type { NotificationComponent, NotificationOptions } from '@/types/UIElements'

// Глобальная ссылка на компонент уведомлений
const notificationRef: Ref<NotificationComponent | null> = ref(null);

export function useNotification() {
  // Установить ссылку на компонент
  const setNotificationRef = (ref: NotificationComponent | null): void => {
    notificationRef.value = ref;
  };

  // Объект с методами для отображения уведомлений
  const notify = {
    /**
     * Показать успешное уведомление
     * @param message - Текст сообщения
     * @param title - Заголовок (опционально)
     * @param duration - Длительность в миллисекундах (по умолчанию 5000)
     */
    success: (message: string, title: string = '', duration: number = 5000): void => {
      notificationRef.value?.success(message, title, duration);
    },

    /**
     * Показать уведомление об ошибке
     * @param message - Текст сообщения
     * @param title - Заголовок (опционально)
     * @param duration - Длительность в миллисекундах (по умолчанию 5000)
     */
    error: (message: string, title: string = '', duration: number = 5000): void => {
      notificationRef.value?.error(message, title, duration);
    },

    /**
     * Показать предупреждение
     * @param message - Текст сообщения
     * @param title - Заголовок (опционально)
     * @param duration - Длительность в миллисекундах (по умолчанию 5000)
     */
    warning: (message: string, title: string = '', duration: number = 5000): void => {
      notificationRef.value?.warning(message, title, duration);
    },

    /**
     * Показать информационное уведомление
     * @param message - Текст сообщения
     * @param title - Заголовок (опционально)
     * @param duration - Длительность в миллисекундах (по умолчанию 5000)
     */
    info: (message: string, title: string = '', duration: number = 5000): void => {
      notificationRef.value?.info(message, title, duration);
    },

    /**
     * Кастомное уведомление с полным контролем
     * @param options - Опции уведомления
     */
    custom: (options: NotificationOptions): void => {
      notificationRef.value?.addNotification(options);
    }
  };

  return {
    setNotificationRef,
    notify
  };
}

// Экспорт для прямого использования без composable
export const notify = {
  success: (message: string, title?: string, duration?: number): void => {
    notificationRef.value?.success(message, title, duration);
  },
  error: (message: string, title?: string, duration?: number): void => {
    notificationRef.value?.error(message, title, duration);
  },
  warning: (message: string, title?: string, duration?: number): void => {
    notificationRef.value?.warning(message, title, duration);
  },
  info: (message: string, title?: string, duration?: number): void => {
    notificationRef.value?.info(message, title, duration);
  },
  custom: (options: NotificationOptions): void => {
    notificationRef.value?.addNotification(options);
  }
};