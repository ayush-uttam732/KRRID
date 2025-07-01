'use client';
import { useState } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-white via-sky-300 to-white text-black overflow-hidden">
      {/* Moving Animation Container */}
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center justify-center py-2 px-4  min-w-full">
          <span className="text-sm md:text-base font-medium">
            🚀 <strong>EXCITING NEWS!</strong> Krrid is launching new verticals soon: 
            <span className="mx-2">🧩 Rubik&apos;s Cube</span> • 
            <span className="mx-2">💻 Coding & Programming</span> • 
            <span className="mx-2">🤖 Artificial Intelligence (AI)</span> 
           
            <span className="ml-10">
            🚀 <strong>EXCITING NEWS!</strong> Krrid is launching new verticals soon: </span>
            <span className="mx-2">🧩 Rubik&apos;s Cube</span> • 
            <span className="mx-2">💻 Coding & Programming</span> • 
            <span className="mx-2">🤖 Artificial Intelligence (AI)</span> 
          
            <span className="ml-10">
            🚀 <strong>EXCITING NEWS!</strong> Krrid is launching new verticals soon: </span>
            <span className="mx-2">🧩 Rubik&apos;s Cube</span> • 
            <span className="mx-2">💻 Coding & Programming</span> • 
            <span className="mx-2">🤖 Artificial Intelligence (AI)</span> 
            
          </span>
        </div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors duration-200 z-10"
        aria-label="Close announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 