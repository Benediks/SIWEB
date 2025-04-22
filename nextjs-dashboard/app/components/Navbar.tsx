'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Close search on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !(searchRef.current as any).contains(event.target)) {
        setShowSearch(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-transparent absolute w-full z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/navlogo.png"
          alt="Ce4L Logo"
          width={120}
          height={40}
        />
      </Link>

      {/* Menu Links (Desktop) */}
      <div className="hidden md:flex space-x-8">
        <Link href="/" className="text-white hover:text-blue-400 transition">Home</Link>
        <Link href="/profiltoko" className="text-white hover:text-blue-400 transition">Profil Toko</Link>
        <Link href="/profildiri" className="text-white hover:text-blue-400 transition">Profil Diri</Link>
        <Link href="/testimoni" className="text-white hover:text-blue-400 transition">Testimoni</Link>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6 relative" ref={searchRef}>
        {/* Search Button */}
        <button onClick={() => setShowSearch(!showSearch)} aria-label="Search" className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Search Input */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="absolute right-10 top-10 md:top-auto px-3 py-1 rounded bg-white text-black w-40 md:w-60 transition-all duration-300 ease-in-out shadow-lg"
            autoFocus
          />
        )}

        {/* Account/Login Icon */}
        <Link href="/authentication/login" aria-label="Account">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
