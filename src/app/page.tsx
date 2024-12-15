"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, Bell, Sun, Moon, Clock } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Update localStorage and document class when theme changes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 w-full max-w-md border`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </h2>
          <button onClick={() => setShowAuthModal(false)} className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input 
              type="email" 
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
              required 
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input 
              type="password" 
              className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
              required 
            />
          </div>
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
              <input 
                type="password" 
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                required 
              />
            </div>
          )}
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/"><img 
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
                <button className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'}`}>
                  <Bell className="w-5 h-5" />
                </button>
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
              <button className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'}`}>
                <Bell className="w-5 h-5" />
              </button>
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

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to DocAlert
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Schedule your medical appointments with ease
          </p>
          <Link href="/doctors">
              <button className="bg-custom-blue1 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-custom-blue2 transition-colors">
                Book an Appointment
              </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>13+</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expert Doctors</p>
          </div>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>1K+</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Happy Patients</p>
          </div>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>24/7</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Available Support</p>
          </div>
        </div>

        {/* Features Section */}
        <div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose DocAlert?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Booking</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Book appointments in less than 2 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Smart & AI Powered Reminders</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Never miss your appointments</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <User className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expert Doctors</h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access to qualified specialists</p>
        </div>
      </div>
    </div>
  </div>

  {/* Call to Action */}
  <div className={`rounded-xl p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
    <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      Ready to Get Started?
    </h2>
    <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      Join thousands of patients who trust DocAlert for their healthcare needs
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
    <Link href="/doctors">
      <button className="bg-custom-blue1 text-black px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue2 transition-colors">
        Find a Doctor
      </button>
      </Link>
      <Link href="./learnmore">
      <button className={`border-2 border-custom-blue1 px-8 py-3 rounded-lg font-semibold 
        ${isDarkMode ? 'text-white hover:text-black' : 'text-gray-900 hover:text-black'} 
        hover:bg-custom-blue1 transition-colors`}>
        About Us
      </button>
      </Link>
      
    </div>
    
  </div>
  {/* Project Details */}
  <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="mb-4">
                © 2024 DocAlert. All rights reserved.
              </p>
  </div>
</main>
    </div>
  );
};

export default Page;