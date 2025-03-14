'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-0 right-0 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg rounded-2xl mx-2' : 'bg-white/50'} backdrop-blur-lg border-b border-gray-200/50 z-50`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-6 space-y-3 md:space-y-0">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity rounded-full">
          <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="w-8 h-8 rounded-full" />
          <p className="text-lg font-semibold text-gray-900 tracking-tight">IKSHANA</p>
        </a>
        <ul className="flex items-center gap-6">
          <li><a href="/projects" className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors duration-200">Our Projects</a></li>
          <li><a href="/about" className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors duration-200">About Us</a></li>
          <li><a href="https://ikshana-portal.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors duration-200">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}