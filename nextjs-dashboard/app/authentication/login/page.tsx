'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fix: Add proper type for the event parameter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset error message
    setError('');
    
    // Check credentials
    // Condition 1: Admin login
    if (email === 'admin123' && password === '12345') {
      router.push('/admin/dashboard');
    } 
    // Condition 2: User login
    else if (email === 'user123' && password === '12345') {
      router.push('/');
    }
    // Invalid credentials
    else {
      setError('Username or password is incorrect');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
          </Link>
          <h2 className="text-4xl font-bold mt-6 mb-8 text-left">Sign In</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-none rounded"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={showPassword 
                      ? "M3 3l18 18M10.94 6.08A6.93 6.93 0 0112 6c3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 01-.9 1.64M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a13.7 13.7 0 01-4.21 4.99M1 1s4 4.5 4 7v1M21 21s-4-4.5-4-7v-1"
                      : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    }
                  />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <Link href="/authentication/verify" className="text-gray-600 hover:text-blue-600 underline">
                Lupa Password?
              </Link>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 mt-6 mb-6"
          >
            Start
          </button>
          
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <div className="px-4 text-gray-500">OR</div>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <Link href="/authentication/register" className="block w-full text-center bg-gray-200 text-gray-600 py-3 rounded hover:bg-gray-300 transition duration-300">
            Register
          </Link>
        </form>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">CE4L © 2025</p>
        </div>
      </div>
    </main>
  );
}