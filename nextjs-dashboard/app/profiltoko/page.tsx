'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Homepage() {
  // For carousel functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Total number of slides

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Products data
  const products = [
    {
      id: 1,
      name: "TDR-3000",
      description: "Our Most Prestigious Panel",
      image: "/images/profiltoko2.png"
    },
    {
      id: 2,
      name: "Solar Plus",
      description: "High Efficiency Solar Solution",
      image: "/images/profiltoko3.png" // Replace with actual image
    },
    {
      id: 3,
      name: "EcoPanel",
      description: "Sustainable Energy for Everyone",
      image: "/images/profiltoko4.png" // Replace with actual image
    }
  ];

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Navbar will be rendered transparently over the hero section */}
      <Navbar />

      {/* About Us Hero Section */}
      <section className="relative w-full h-[780px]">
        {/* Background Image */}
        <Image
          src="/images/profiltoko1.png"
          alt="Worker installing solar panel"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-12 py-12 pt-24 md:pt-32 text-white flex flex-col h-full">
          <div className="flex-1">
            <h2 className="md:text-6xl py-32 font-bold">About Us</h2>
            <p className="max-w-5xl mb-5">
              Ce4L (Clean Energy for Life) merupakan sebuah perusahaan yang berfokus pada pengembangan energi
              terbarukan dengan menggunakan tenaga surya. Kami berkomitmen untuk menyediakan solusi energi
              bersih, efisien, dan ramah lingkungan untuk masa depan yang lebih baik.
            </p>
            
            <div className="flex flex-col text-sm mt-6 mb-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Indonesia, Jawa Timur, Ngawi, Jalan Bulan No. 2, Teknik Banjari Andre, Jl. Barat</span>
              </div>
            </div>
          </div>
          
          {/* Social Media Icons - Bottom of Hero Section */}
          <div className="pb-8 flex space-x-6">
            <Link href="https://instagram.com/CE4Life" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @CE4Life
            </Link>
            <Link href="https://twitter.com/CE4Life" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              @CE4Life
            </Link>
            <Link href="https://facebook.com/CE4Life.Official" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              @CE4Life.Official
            </Link>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-32 px-6 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Future Is In Our Hand</h2>
          <p className="max-w-xl mx-auto mb-8">
            We're building a world powered by solar energy and moving people transported by electric vehicles.
            Explore the most recent impact of our products, people and supply chain.
          </p>
        </div>
      </section>

      {/* Our Products Section - Full-width carousel */}
      <section className="relative w-full h-[500px]">
        <div className="relative w-full h-full">
          {/* Current slide */}
          <Image
            src={products[currentSlide].image}
            alt={products[currentSlide].name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Title at top */}
          <div className="absolute top-10 left-0 w-full z-10 text-center">
            <h2 className="text-3xl font-bold">Our Products</h2>
          </div>
          
          {/* Product info in middle */}
          <div className="absolute top-1/2 left-0 w-full z-10 text-center">
            <h3 className="text-5xl font-bold mb-2">{products[currentSlide].name}</h3>
            <p className="text-xl mb-6">{products[currentSlide].description}</p>
            <Link href="/toko">
            <button className="bg-white text-black py-2 px-6 rounded hover:bg-gray-100 transition">
              Belanja Sekarang
            </button>
            </Link>
          </div>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white opacity-50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}