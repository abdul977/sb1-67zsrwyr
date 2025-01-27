import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';
import { formatDate } from '../lib/utils';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    subscribeToNotifications,
  } = useNotificationStore();

  React.useEffect(() => {
    fetchNotifications();
    const unsubscribe = subscribeToNotifications();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchNotifications, subscribeToNotifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return '⏰';
      case 'mention':
        return '@';
      case 'assignment':
        return '📋';
      case 'status_change':
        return '🔄';
      case 'approval':
        return '✅';
      default:
        return '📢';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-80 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm">{notification.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}