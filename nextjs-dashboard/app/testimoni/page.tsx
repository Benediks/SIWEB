import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCard from './testimonialcard';
import ArticleCard from './articlecard';
import ClientLogos from './clientlogo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Blue Gradient */}
      <section className="relative w-full min-h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-300"></div>
        <Navbar />
        <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16">
          <div className="mt-16 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome to the Future of Energy—Powered by the Sun!
            </h1>
            <p className="text-xl text-white mb-6">
              Pelanggan Kami yang Puas dengan Energi Surya!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              image="/images/kostumer1.png"
              name="John Doe"
              title="Dua mahluk perkasa di alam semesta"
              rating={5}
            />
            <TestimonialCard
              image="/images/kostumer1.png"
              name="Jane Smith"
              title="produk yang berkualitas, hak dan adil buat kamu"
              rating={5}
            />
            <TestimonialCard
              image="/images/kostumer1.png"
              name="Robert Wilson"
              title="Conect Muci Wow"
              rating={5}
            />
            <TestimonialCard
              image="/images/kostumer1.png"
              name="Alex Johnson"
              title="Dua Produk ini tau kan? Ini investasi teruuntukk"
              rating={5}
            />
            <TestimonialCard
              image="/images/kostumer1.png"
              name="Michael Brown"
              title="Ini Menarikkk"
              rating={4}
            />
            <TestimonialCard
              image="/images/kostumer1.png"
              name="Sarah Davis"
              title="Luar Biasa"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="relative py-16 px-8">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/artikelbg1.png" // replace with your image path
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Content on top */}
        <div className="relative z-10 container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Artikel</h2>
          <p className="text-gray-600 mb-10">Read what our satisfied customers have to say about their experience with solar energy solutions.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard
              image="/images/artikel1.png"
              title="The Solar Revolution: How the Switch Promoting a Sustainable Future"
              category="Lifestyle Solar Panel"
            />
            <ArticleCard
              image="/images/artikel1.png"
              title="Why Should You Implement Solar? Consider Solar Energy Advantages in Powering Your Home"
              category="Energy"
            />
            <ArticleCard
              image="/images/artikel1.png"
              title="Breaking The News On Solar Energy: What You Need To Know About Installation"
              category="Innovation"
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">Our Clients</h2>
          <ClientLogos />
        </div>
      </section>

      <Footer />
    </main>
  );
}