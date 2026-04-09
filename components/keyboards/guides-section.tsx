'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Guide {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  readTime: string;
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Choosing the Right Gaming Keyboard for Your Playstyle',
    category: 'Guide',
    image: '/placeholder.jpg',
    description: 'Learn how to select the perfect keyboard based on your gaming genre and playstyle.',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Keyboard Switch Types Explained: Linear vs Tactile vs Clicky',
    category: 'Guide',
    image: '/placeholder.jpg',
    description: 'Deep dive into the differences between mechanical switch types and their gaming benefits.',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Pro Tips: Optimizing Your iCUE Settings for Maximum Performance',
    category: 'Tips & Tricks',
    image: '/placeholder.jpg',
    description: 'Advanced configuration tips to unlock the full potential of your keyboard software.',
    readTime: '6 min read',
  },
];

export function GuidesSection() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Guides, Tips & Tricks
            </h2>
            <p className="text-gray-400 text-base">
              Master your keyboard setup with expert guides and tutorials
            </p>
          </div>
          <Link
            href="#"
            className="mt-4 md:mt-0 text-yellow-400 font-bold hover:text-yellow-300 transition-colors inline-flex items-center gap-2"
          >
            View All Articles
            <span>→</span>
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href="#"
              className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 bg-black overflow-hidden">
                <Image
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded">
                    {guide.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                  {guide.description}
                </p>
                <p className="text-yellow-400 text-xs font-bold">{guide.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
