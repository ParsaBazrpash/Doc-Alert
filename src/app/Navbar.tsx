"use client";

import React, { useState } from 'react';
import { Menu, X, User, Bell, Sun, Moon, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Recent notifications data
const recentNotifications = [
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
  }
];

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b relative`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src="/logo.svg" 
                alt="DocAlert Logo" 
                className="h-14 w-14"
              />
            </Link>
            <Link href="/">
              <span className="ml-2 text-xl font-bold text-custom-blue1">DocAlert</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}>
              Home
            </Link>
            <Link href="/doctors" className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}>
              Doctors
            </Link>
            <Link href="/appointments" className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}>
              My Appointments
            </Link>
            <Link href="/contact" className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}>
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'}`}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {/* Notification dot */}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden
                    ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Recent Notifications
                        </h3>
                        <Link href="/notifications" className="text-custom-blue1 text-sm hover:underline">
                          View All
                        </Link>
                      </div>
                      <div className="space-y-3">
                        {recentNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start p-2 rounded-lg ${
                              !notification.isRead ? 
                                (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : 
                                ''
                            }`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {notification.type === 'appointment' ? (
                                <Calendar className="w-5 h-5 text-custom-blue1" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-custom-blue1" />
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-custom-blue1'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-custom-blue1 px-4 py-2 rounded hover:bg-custom-blue2 flex items-center text-black"
              >
                <User className="w-4 h-4 mr-2" />
                Login / Sign Up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="relative">
              <button 
                className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Mobile Notifications Dropdown */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden
                  ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  {/* Same notifications content as desktop */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Recent Notifications
                      </h3>
                      <Link href="/notifications" className="text-custom-blue1 text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start p-2 rounded-lg ${
                            !notification.isRead ? 
                              (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : 
                              ''
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {notification.type === 'appointment' ? (
                              <Calendar className="w-5 h-5 text-custom-blue1" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-custom-blue1" />
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Link href="/" className={`block px-3 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              Home
            </Link>
            <Link href="/doctors" className={`block px-3 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              Doctors
            </Link>
            <Link href="/appointments" className={`block px-3 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              My Appointments
            </Link>
            <Link href="/contact" className={`block px-3 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              Contact
            </Link>
            <button 
              onClick={() => {
                setShowAuthModal(true);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User className="w-4 h-4 mr-2" />
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;