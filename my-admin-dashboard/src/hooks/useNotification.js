import { useNotificationStore } from '../lib/stores/notificationStore';

export const useNotification = () => {
  const { addNotification } = useNotificationStore();

  const notify = ({ type = 'info', message, duration = 3000 }) => {
    addNotification({ type, message });
    setTimeout(() => {
      // Hapus notifikasi setelah durasi tertentu
      // Logika penghapusan ada di komponen NotificationContainer
    }, duration);
  };

  return { notify };
};