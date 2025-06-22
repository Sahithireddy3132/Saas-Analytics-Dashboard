import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'High CPU Usage Detected',
      message: 'Server load has exceeded 85% for the past 15 minutes',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Data Export Completed',
      message: 'Monthly analytics report has been successfully generated',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'New User Registered',
      message: 'John Smith has joined your analytics workspace',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Storage Limit Warning',
      message: 'You are approaching 80% of your storage limit',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Weekly Report Available',
      message: 'Your weekly performance summary is ready for review',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      alert: 'AlertTriangle',
      success: 'CheckCircle',
      warning: 'AlertCircle',
      info: 'Info'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error-600';
    
    const colorMap = {
      alert: 'text-error-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      info: 'text-accent-600'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={toggleNotifications}
        className={`relative p-2 rounded-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'hover:bg-secondary-50'
        }`}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon 
          name="Bell" 
          size={20} 
          className={`transition-colors duration-200 ${
            isOpen ? 'text-primary-600' : 'text-text-secondary hover:text-text-primary'
          }`}
        />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-600 text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="dropdown-menu animation-fade-in w-96 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <Icon name="Bell" size={32} className="text-text-secondary mb-2" />
                <p className="text-sm text-text-secondary text-center">
                  No notifications yet
                </p>
                <p className="text-xs text-text-muted text-center mt-1">
                  We'll notify you when something important happens
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative px-4 py-3 border-b border-border last:border-b-0 transition-colors duration-200 ${
                    !notification.isRead 
                      ? 'bg-primary-25 hover:bg-primary-50' :'hover:bg-secondary-25'
                  }`}
                >
                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <div className="absolute left-2 top-4 w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}

                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 mt-0.5 ${getNotificationColor(notification.type, notification.priority)}`}>
                      <Icon 
                        name={getNotificationIcon(notification.type)} 
                        size={16} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200"
                              title="Mark as read"
                            >
                              <Icon name="Check" size={12} className="text-text-secondary" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200"
                            title="Delete notification"
                          >
                            <Icon name="X" size={12} className="text-text-secondary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border bg-secondary-25">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => console.log('View all notifications')}
                  className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
                >
                  View all notifications
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-text-secondary hover:text-error-600 font-medium transition-colors duration-200"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;