
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LoginForm from '@/components/LoginForm';
import Hero from '@/components/Hero';

const Index = () => {
  // Add animation delays for content appearance
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="h-screen w-full flex flex-col bg-tech-darker text-tech-text overflow-hidden">
      {/* Navbar */}
      <Navbar activeTab="dashboard" />
      
      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left side: Hero/Video */}
        <div className="h-full relative">
          <Hero />
        </div>
        
        {/* Right side: Login form */}
        <div className="h-full bg-tech-navy flex items-center justify-center p-6 sm:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
