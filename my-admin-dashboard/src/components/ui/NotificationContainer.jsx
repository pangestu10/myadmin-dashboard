import React, { useEffect } from 'react';
import { useNotificationStore } from '@/lib/stores/notificationStore';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 5000); // Auto remove after 5 seconds

    return () => clearInterval(timer);
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(({ id, type, message }) => {
        const icons = {
          success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
          error: <XCircleIcon className="w-6 h-6 text-red-500" />,
          warning: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />,
          info: <ExclamationTriangleIcon className="w-6 h-6 text-blue-500" />,
        };
        const bgColors = {
          success: 'bg-green-100 border-green-400 text-green-700',
          error: 'bg-red-100 border-red-400 text-red-700',
          warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
          info: 'bg-blue-100 border-blue-400 text-blue-700',
        };

        return (
          <div
            key={id}
            className={`flex items-center p-4 border rounded-lg shadow-lg ${bgColors[type]}`}
            role="alert"
          >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={() => removeNotification(id)}
              className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 rounded-lg"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export { NotificationContainer };