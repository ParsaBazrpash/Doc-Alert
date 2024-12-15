"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '../Navbar';

// Sample appointments data - in a real app, this would come from your backend
const sampleAppointments = [
  {
    id: 1,
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Cardiologist",
    date: "2024-12-20",
    time: "10:00 AM",
    location: "New York Medical Center",
    status: "upcoming",
    doctorImage: "/images/doc1.png"
  },
  {
    id: 2,
    doctorName: "Dr. Sarah Chen",
    doctorSpecialty: "Dermatologist",
    date: "2024-12-15",
    time: "2:30 PM",
    location: "Downtown Medical Hub",
    status: "completed",
    doctorImage: "/images/doc2.png"
  },
  {
    id: 3,
    doctorName: "Dr. Robert Becker",
    doctorSpecialty: "Pediatrician",
    date: "2024-12-18",
    time: "3:45 PM",
    location: "Children's Medical Group",
    status: "cancelled",
    doctorImage: "/images/doc10.png"
  }
];

const AppointmentsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filter, setFilter] = useState('all');
  const [appointments, setAppointments] = useState(sampleAppointments);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const getFilteredAppointments = () => {
    if (filter === 'all') return appointments;
    return appointments.filter(apt => apt.status === filter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <AlertCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Appointments
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and view your appointments
          </p>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-8">
          {['all', 'upcoming', 'completed', 'cancelled'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterOption
                  ? 'bg-custom-blue1 text-black'
                  : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {getFilteredAppointments().map((appointment) => (
            <div
              key={appointment.id}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={appointment.doctorImage}
                    alt={appointment.doctorName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {appointment.doctorName}
                    </h3>
                    <p className="text-custom-blue1">
                      {appointment.doctorSpecialty}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Calendar className="w-5 h-5 mr-2" />
                    {appointment.date}
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock className="w-5 h-5 mr-2" />
                    {appointment.time}
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPin className="w-5 h-5 mr-2" />
                    {appointment.location}
                  </div>
                  <div className={`flex items-center ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-2 capitalize">{appointment.status}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {appointment.status === 'upcoming' && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      // Handle cancellation
                      setAppointments(appointments.map(apt =>
                        apt.id === appointment.id ? { ...apt, status: 'cancelled' } : apt
                      ));
                    }}
                    className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Cancel Appointment
                  </button>
                  <button
                    className="px-4 py-2 bg-custom-blue1 text-black rounded-lg hover:bg-custom-blue2 transition-colors"
                  >
                    Reschedule
                  </button>
                </div>
              )}
            </div>
          ))}

          {getFilteredAppointments().length === 0 && (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No appointments found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;