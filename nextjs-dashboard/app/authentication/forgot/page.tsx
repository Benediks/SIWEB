import Image from 'next/image';
import Link from 'next/link';

export default function ChangePassword() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
          </Link>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-left">Change Password</h2>
        </div>
        
        <form>
          <div className="mb-6">
            <label htmlFor="verification" className="block text-lg text-gray-700 mb-2">Verification</label>
            <input
              type="text"
              id="verification"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
              placeholder=""
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-lg text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
              placeholder=""
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-lg text-gray-700 mb-2">Once again</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
              placeholder=""
            />
          </div>
          
          <Link href="/authentication/login">
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 mb-6">
              CONFIRM
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