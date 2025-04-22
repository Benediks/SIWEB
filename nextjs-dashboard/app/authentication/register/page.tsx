import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
          </Link>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-left">Register</h2>
          <p className="text-gray-600 mb-6 text-left">Step 1 of 2</p>
        </div>
        
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="username" className="block text-lg text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
            />
          </div>
          <Link href="/authentication/login">
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 mb-8">
            Login
          </button>
          </Link>
        </form>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">CE4L © 2025</p>
        </div>
      </div>
    </main>
  );
}