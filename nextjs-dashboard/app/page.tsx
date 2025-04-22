import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Solar Panels */}
      <section className="relative w-full h-screen">
        <Image
          src="/images/home1.png"
          alt="Modern house with solar panels"
          fill
          className="object-cover"
        />
        <Navbar />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center ">
          <div className="mt-16">
            <h1 className="text-6xl font-bold text-white mb-1">Solar Panels</h1>
            <p className="text-xl text-white mb-6">Power Your Life</p>
            <p className="text-sm text-white mb-16">Move With Us To The Future</p>
            <div className="flex space-x-4 mt-8">
              <Link href="/toko" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 rounded">
                Order Now
              </Link>
              <Link href="/selengkapnya" className="bg-gray-800 bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-12 rounded">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Megapack Section with Video Background */}
      <section className="relative w-full h-screen">
        {/* Video background instead of Image */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source src="/videos/home2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <div>
            <h2 className="text-6xl font-bold text-white mb-1">Megapack</h2>
            <p className="text-xl text-white mb-6">Massive Energy Storage</p>
            <p className="text-sm text-white mb-16">Commercial & Utility Scale</p>
            <div className="flex space-x-4 mt-8">
              <Link href="/toko" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 rounded">
                Order Now
              </Link>
              <Link href="/selengkapnya" className="bg-gray-800 bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-12 rounded">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Ce4L Section */}
      <section className="relative w-full h-screen">
        <Image
          src="/images/home3.png"
          alt="Solar panel field"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <div>
            <h2 className="text-6xl font-bold text-white mb-1">Ce4L Energy</h2>
            <p className="text-xl text-white mb-6">Power Your Future</p>
            <div className="flex space-x-4 mt-8">
              <Link href="/authentication/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 rounded">
                Join Ce4L
              </Link>
              <Link href="/selengkapnya" className="bg-gray-800 bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-12 rounded">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}