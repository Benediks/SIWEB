import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  image: string;
  title: string;
  category: string;
}

export default function ArticleCard({ image, title, category }: ArticleCardProps) {
  return (
    <Link href="https://www.foxbusiness.com/markets/the-solar-energy-revolution-past-the-point-of-no-return" className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center p-4">
          <div className="relative w-12 h-12 mr-4">
            <Image 
              src={image} 
              alt={title}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}