"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Calendar, AlertCircle, CheckCircle, X } from 'lucide-react';
import Navbar from '../Navbar';

// Sample notifications data
const allNotifications = [
  {
    id: 1,
    type: 'appointment',
    message: 'Upcoming appointment with Dr. Wilson tomorrow at 10:00 AM',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: 2,
    type: 'reminder',
    message: 'Don\'t forget to bring your medical records',
    time: '3 hours ago',
    isRead: false
  },
  {
    id: 3,
    type: 'update',
    message: 'Dr. Chen has confirmed your appointment request',
    time: '5 hours ago',
    isRead: true
  },
  {
    id: 4,
    type: 'appointment',
    message: 'Your appointment with Dr. Rodriguez has been rescheduled',
    time: '1 day ago',
    isRead: true
  },
  {
    id: 5,
    type: 'reminder',
    message: 'Time to schedule your follow-up appointment',
    time: '2 days ago',
    isRead: true
  },
  {
    id: 6,
    type: 'update',
    message: 'Dr. Thompson has added new appointment slots',
    time: '3 days ago',
    isRead: true
  }
];

const NotificationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(allNotifications);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    ));
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm bg-custom-blue1 text-black px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-custom-blue1 hover:underline text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-4">
            {['all', 'unread', 'read'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-custom-blue1 text-black'
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'unread' && unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No notifications found
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${
                  !notification.isRead ? (isDarkMode ? 'ring-1 ring-custom-blue1' : 'bg-blue-50') : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === 'appointment' ? (
                        <Calendar className="w-6 h-6 text-custom-blue1" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-custom-blue1" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5 text-custom-blue1" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      title="Delete notification"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;