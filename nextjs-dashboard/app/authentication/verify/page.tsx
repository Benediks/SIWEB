import Image from 'next/image';
import Link from 'next/link';

export default function VerifyIdentity() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
          </Link>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-left">Verify Identity</h2>
          <p className="text-gray-600 mb-6 text-left">
            To confirm your identity before resetting your password, a verification code will be
            sent to Ce4L@gmail.com if the account exists
          </p>
        </div>
        
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-200 border-none rounded"
              placeholder=""
            />
          </div>
          
          <Link href="/authentication/forgot">
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300 mb-6">
              SEND CODE
            </button>
          </Link>
          
          <div className="text-center">
            <Link href="/authentication/login" className="text-gray-600 hover:text-blue-600 underline">
              Back to Login
            </Link>
          </div>
        </form>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">CE4L © 2025</p>
        </div>
      </div>
    </main>
  );
}