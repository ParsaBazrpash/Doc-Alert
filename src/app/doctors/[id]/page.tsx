"use client";

import React, { useState, useEffect, use } from 'react';
import { Star, Calendar, Phone, Mail, MapPin, Clock, Award, ThumbsUp, Stethoscope } from 'lucide-react';
import Navbar from '../../Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  // ... rest of your doctors array
];

const DoctorProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();
  
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

  if (!doctor) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Doctor not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className={`mb-8 flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          ← Back to Doctors
        </button>

        {/* Profile Header */}
        <div className={`rounded-xl overflow-hidden shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative pt-[100%]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {doctor.name}
                  </h1>
                  <p className="text-custom-blue1 text-xl font-medium mb-2">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="bg-custom-blue1 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  {doctor.availability}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{doctor.location}</span>
                </div>
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Award className="w-5 h-5 mr-2" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{doctor.email}</span>
                </div>
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{doctor.phone}</span>
                </div>
              </div>
              <Link href={`/doctors/${doctor.id}/book`}>
                <button className="w-full bg-custom-blue1 text-black py-3 rounded-lg hover:bg-custom-blue2 transition-colors text-lg font-semibold">
                Book Appointment
                </button>
               </Link>
            </div>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Stethoscope className="w-5 h-5 mr-2" />
              About
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {doctor.name} is a highly qualified {doctor.specialty.toLowerCase()} with {doctor.experience} of experience in treating patients. Specializing in various aspects of {doctor.specialty.toLowerCase()} care, they have consistently maintained excellent patient satisfaction ratings and pioneered innovative treatment approaches.
            </p>
          </div>

          {/* Office Hours */}
          <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Clock className="w-5 h-5 mr-2" />
              Office Hours
            </h2>
            <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;