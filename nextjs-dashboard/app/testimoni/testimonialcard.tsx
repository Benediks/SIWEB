import Image from 'next/image';

interface TestimonialCardProps {
  image: string;
  name: string;
  title: string;
  rating: number;
}

export default function TestimonialCard({ image, name, title, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <h3 className="text-center text-sm text-gray-700 mb-2">{title}</h3>
      <p className="text-center font-medium mb-3">{name}</p>
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}