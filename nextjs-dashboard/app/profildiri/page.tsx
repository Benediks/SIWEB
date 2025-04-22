'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar component is absolute positioned and will overlay the hero */}
      <Navbar />

      {/* Hero Section with darker overlay to ensure navbar text visibility */}
      <section className="relative w-full h-screen max-h-[800px]">
        <div className="absolute inset-0">
          <Image
            src="/images/profildiri1.png"
            alt="Solar Panel Worker"
            fill
            className="object-cover"
            priority
          />
          {/* Darker overlay to ensure navbar text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-32 h-full flex flex-col justify-end">
          <div className="max-w-xl bg-white bg-opacity-80 p-8 mb-16">
            <h1 className="text-4xl font-bold mb-4">WHO ARE WE..?</h1>
            <p className="mb-4">
              CE4L (Clean Energy for Life) was born to enhance awareness, bring clean energy into daily life, and make a difference. Our team consists of dedicated professionals who believe in sustainable and renewable energy solutions.
            </p>
            <p>
              We're not just a company; we're a movement towards a greener planet and healthier natural habitat and lifestyle.
            </p>
            <div className="mt-6 border-t border-gray-300 pt-4">
              <Link href="/profiltoko">
                <span className="text-blue-600 font-medium cursor-pointer">Learn More →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16 relative inline-block">
            Let Us Introduce Ourselves
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500"></div>
          </h2>

          <div className="relative mt-16">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              {/* Team image with three people */}
              <Image
                src="/images/profildiri2.png"
                alt="Team Members"
                width={900}
                height={800}
                className="object-contain"
              />
            </div>

            {/* Background accent - Indian flag-inspired colors */}
            <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 -z-10 transform -rotate-1"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg mb-8">
              We are proud to represent and contribute to Clean Energy for Life. Our multicultural team works together to provide innovative solutions across Indonesia.
            </p>
          </div>

          {/* Team Member 1 */}
          <div className="flex flex-col md:flex-row items-center my-24 max-w-4xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <Image
                src="/images/profildiri3.png"
                alt="Team Member 1"
                width={400}
                height={400}
                className="object-contain"
              />
              <div className="absolute -bottom-4 -right-4 left-4 h-8 bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 -z-10"></div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl font-bold mb-4">"Sandi Pravish Gujarat"</h3>
              <p className="mb-4">
                Pani puri merupakan makanan jalanan yang dikenal luas dan menjadi favorit di seluruh India. Pani puri memberikan kompleksitas rasa dan tekstur dalam setiap gigitannya yaitu, antara rasa asam, pedas, manis dan asin, serta tekstur krispi, lembut dan cair.
              </p>
              <p>
                "We don't just sell solar panels. We create a sustainable future where everyone has access to clean energy."
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center my-24 max-w-4xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <Image
                src="/images/profildiri4.png"
                alt="Team Member 2"
                width={400}
                height={400}
                className="object-contain"
              />
              <div className="absolute -bottom-4 -left-4 right-4 h-8 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 -z-10"></div>
            </div>
            <div className="md:w-1/2 md:pr-12">
              <h3 className="text-2xl font-bold mb-4">"Maxim Musiala Singh"</h3>
              <p className="mb-4">
                Aksi ini dilakukannya tidak tanpa alasan. Sebagai seorang sadu, dia melakukan ini karena keyakinan agamanya.
              </p>
              <p>
                "Design isn't just about looks. It's about creating products that solve real problems while being beautiful."
              </p>
            </div>
          </div>
        </div>

        {/* Team Member 1 */}
        <div className="flex flex-col md:flex-row items-center my-24 max-w-4xl mx-auto">
          <div className="md:w-1/2 mb-8 md:mb-0 relative">
            <Image
              src="/images/profildiri5.png"
              alt="Team Member 1"
              width={400}
              height={400}
              className="object-contain"
            />
            <div className="absolute -bottom-4 -right-4 left-4 h-8 bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 -z-10"></div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h3 className="text-2xl font-bold mb-4">"Benedikt Sheeva"</h3>
            <p className="mb-4">
              polusi di Jakarta tidak konsisten. "Angin itu bergerak dari sana ke sini. Ketika polutan yang muncul dari pembangkit listrik tenaga uap mengalir ke Jakarta maka Jakarta punya indikator, karena itu Jakarta mengatakan ada polusi udara. Ketika anginnya bergerak ke arah Lampung, ke arah Sumatera, ke arah Laut Jawa, di sana tidak alat monitor maka tidak muncul, dan Jakarta pada saat itu bersih,"
            </p>
            <p>
              "We don't just sell solar panels. We create a sustainable future where everyone has access to clean energy."
            </p>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}