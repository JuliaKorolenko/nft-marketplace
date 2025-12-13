// composables/useNotification.ts
import { ref, type Ref } from 'vue';

// Типы уведомлений
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Интерфейс для параметров уведомления
export interface NotificationOptions {
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}

// Интерфейс для объекта уведомления
export interface Notification {
  id: number;
  type: NotificationType;
  title?: string;
  message: string;
  duration: number;
}

// Интерфейс для методов компонента Notification
export interface NotificationComponent {
  addNotification: (options: NotificationOptions) => number;
  removeNotification: (id: number) => void;
  success: (message: string, title?: string, duration?: number) => number;
  error: (message: string, title?: string, duration?: number) => number;
  warning: (message: string, title?: string, duration?: number) => number;
  info: (message: string, title?: string, duration?: number) => number;
}

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