'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      {/* Navbar above everything */}
      <Navbar />

      {/* Hero Section - Solar Panels */}
      <section className="relative w-full h-screen">
        <Image
          src="/images/selengkapnya1.png"
          alt="Modern house with solar panels"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute inset-0 flex flex-col justify-center px-12 text-left z-20">
          <h1 className="text-6xl font-bold text-white mb-2">Solar Panels</h1>
          <div className="w-[400px] h-[1px] bg-white mb-4 rounded" />
          <p className="text-xl text-white mb-4">Save on Energy. Power Your Home.</p>
          <Link href="/toko" className="bg-white text-black py-2 px-6 rounded w-fit">
            Buy
          </Link>
        </div>
      </section>

      {/* Mid Text Section */}
      <section className="relative w-full h-screen">
        <Image
          src="/images/selengkapnya2.png"
          alt="Modern house with solar panels"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute inset-0 flex flex-col items-center text-center pt-32 px-4 z-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Save Solar With Us
          </h2>

          <div className="w-[200px] h-1 bg-white mb-4 rounded" />

          <p className="max-w-2xl text-white">
            Compare your own clean energy from the sun for free with solar. Reduce your energy cost and optimize your needs.
          </p>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-black px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">Sustainable Energy</h3>
            <p className="text-white">Power your home with emission-free, renewable energy directly from the sun.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">Tax Incentives</h3>
            <p className="text-white">You may qualify for federal, state, and local tax incentives that can help your installation cost.</p>
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold mb-2">Monthly Bill Savings</h3>
            <p className="text-white">Generating power from the sun is a free way to power your home once the system is installed.</p>
          </div>
        </div>
      </section>

      {/* Split Section - Getting to Power On (Side by Side) */}
      <section className="py-24 bg-black text-white px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-center">

          {/* Left Title */}
          <div className="text-left md:col-span-1">
            <h2 className="text-5xl font-bold leading-tight">
              Getting <br /> to Power On
            </h2>
          </div>

          {/* Center Image */}
          <div className="md:col-span-1 flex justify-center">
            <Image
              src="/images/selengkapnya3.png"
              alt="Coastal solar home"
              width={300}
              height={400}
              className="object-cover"
            />
          </div>

          {/* Right Paragraph */}
          <div className="text-left md:col-span-1">
            <p className="text-xl mb-4 leading-relaxed">
              With half a million solar installations to date, Ce4L takes care of the details for you, from order to power on.
              Schedule a virtual consultation with a Tesla Advisor to learn more.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
