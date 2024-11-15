import React from 'react';
import { Bell, X, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'error' | 'info';
  timestamp: Date;
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'High Molten Metal Holding Time',
      message: 'Furnace 2 holding time exceeds optimal duration by 45 minutes',
      type: 'warning',
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Low Mold Availability',
      message: 'Part #A123 mold availability below 15% threshold',
      type: 'error',
      timestamp: new Date(),
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New efficiency metrics have been added to the dashboard',
      type: 'info',
      timestamp: new Date(),
    },
  ]);

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-primary-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <span className="text-sm font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
          {notifications.length} new
        </span>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 rounded-lg ${
                  notification.type === 'error'
                    ? 'bg-red-50 border border-red-100'
                    : notification.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-100'
                    : 'bg-blue-50 border border-blue-100'
                } hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${
                      notification.type === 'error'
                        ? 'text-red-500'
                        : notification.type === 'warning'
                        ? 'text-yellow-500'
                        : 'text-blue-500'
                    }`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}