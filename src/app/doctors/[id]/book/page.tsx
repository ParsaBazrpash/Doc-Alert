"use client";

import React, { useState, useEffect, use } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, ArrowLeft } from 'lucide-react';
import Navbar from '../../../Navbar';
import { useRouter } from 'next/navigation';

const doctors = [
    {
      id: 1,
      name: "Dr. James Wilson",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.8,
      reviews: 127,
      availability: "Mon - Fri",
      image: "/images/doc1.png",
      location: "New York Medical Center",
      email: "dr.wilson@docalert.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Dr. Sarah Chen",
      specialty: "Dermatologist",
      experience: "12+ years",
      rating: 4.9,
      reviews: 189,
      availability: "Mon - Sat",
      image: "/images/doc2.png",
      location: "Downtown Medical Hub",
      email: "dr.chen@docalert.com",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      name: "Dr. Fareed Rodriguez",
      specialty: "Pediatrician",
      experience: "10+ years",
      rating: 4.7,
      reviews: 156,
      availability: "Tue - Sat",
      image: "/images/doc3.png",
      location: "Children's Wellness Center",
      email: "dr.rodriguez@docalert.com",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      name: "Dr. John Peterson",
      specialty: "Neurologist",
      experience: "18+ years",
      rating: 4.9,
      reviews: 210,
      availability: "Mon - Fri",
      image: "/images/doc4.png",
      location: "Brain & Spine Institute",
      email: "dr.peterson@docalert.com",
      phone: "+1 (555) 456-7890"
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Dermatologist",
      experience: "8+ years",
      rating: 4.6,
      reviews: 98,
      availability: "Wed - Sun",
      image: "/images/doc5.png",
      location: "Skin Care Clinic",
      email: "dr.thompson@docalert.com",
      phone: "+1 (555) 567-8901"
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialty: "Orthopedic",
      experience: "20+ years",
      rating: 4.9,
      reviews: 245,
      availability: "Mon - Fri",
      image: "/images/doc6.png",
      location: "Orthopedic & Sports Medicine",
      email: "dr.kim@docalert.com",
      phone: "+1 (555) 678-9012"
    },
    {
      id: 7,
      name: "Dr. Joe Green",
      specialty: "Psychiatrist",
      experience: "14+ years",
      rating: 4.8,
      reviews: 167,
      availability: "Tue - Sat",
      image: "/images/doc8.png",
      location: "Mental Health Center",
      email: "dr.green@docalert.com",
      phone: "+1 (555) 789-0123"
    },
    {
      id: 8,
      name: "Dr. Maria Anderson",
      specialty: "Cardiologist",
      experience: "16+ years",
      rating: 4.7,
      reviews: 178,
      availability: "Mon - Fri",
      image: "/images/doc9.png",
      location: "Heart & Vascular Institute",
      email: "dr.anderson@docalert.com",
      phone: "+1 (555) 890-1234"
    },
    {
      id: 9,
      name: "Dr. Robert Becker",
      specialty: "Pediatrician",
      experience: "11+ years",
      rating: 4.8,
      reviews: 143,
      availability: "Mon - Sat",
      image: "/images/doc10.png",
      location: "Children's Medical Group",
      email: "dr.becker@docalert.com",
      phone: "+1 (555) 901-2345"
    },
    {
      id: 10,
      name: "Dr. Jane Noel",
      specialty: "Neurologist",
      experience: "22+ years",
      rating: 4.9,
      reviews: 289,
      availability: "Wed - Sun",
      image: "/images/doc11.png",
      location: "Neuroscience Center",
      email: "dr.noel@docalert.com",
      phone: "+1 (555) 012-3456"
    },
    {
      id: 11,
      name: "Dr. Sam Lee",
      specialty: "Ophthalmologist",
      experience: "13+ years",
      rating: 4.7,
      reviews: 156,
      availability: "Mon - Fri",
      image: "/images/doc12.png",
      location: "Vision Care Center",
      email: "dr.lee@docalert.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 12,
      name: "Dr. Kellie Taylor",
      specialty: "Orthopedic",
      experience: "19+ years",
      rating: 4.8,
      reviews: 198,
      availability: "Tue - Sat",
      image: "/images/doc13.png",
      location: "Joint & Spine Center",
      email: "dr.taylor@docalert.com",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 13,
      name: "Dr. Jack Martinez",
      specialty: "Psychiatrist",
      experience: "15+ years",
      rating: 4.8,
      reviews: 167,
      availability: "Mon - Fri",
      image: "/images/doc14.png",
      location: "Behavioral Health Institute",
      email: "dr.martinez@docalert.com",
      phone: "+1 (555) 345-6789"
    }
  ];

// Available time slots
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const BookingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  
  // Form state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;
  
  // Find the doctor based on the unwrapped ID
  const doctor = doctors.find(d => d.id === parseInt(doctorId));

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      doctor: doctor?.name,
      date: selectedDate,
      time: selectedTime,
      ...formData
    });
    // You would typically send this to your backend

    // Show success message and redirect
    alert("Appointment booked successfully!");
    router.push('/doctors');
  };

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className={`mb-8 flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Doctor Profile
        </button>

        {/* Booking Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Book Appointment
          </h1>
          <div className="flex items-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <p className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {doctor.name}
              </p>
              <p className="text-custom-blue1">
                {doctor.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Time Selection */}
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Select Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Patient Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FileText className="w-4 h-4 inline mr-2" />
                  Reason for Visit
                </label>
                <textarea
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  rows={4}
                  placeholder="Please describe your symptoms or reason for visit"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-custom-blue1 text-black py-3 rounded-lg hover:bg-custom-blue2 transition-colors text-lg font-semibold"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;