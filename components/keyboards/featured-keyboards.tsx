'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FeaturedKeyboard {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: {
    connectivity: string;
    formFactor: string;
    switches: string;
    software: string;
  };
  price?: string;
}

const featuredKeyboards: FeaturedKeyboard[] = [
  {
    id: '1',
    name: 'Gaming Keyboard Pro Max',
    description: 'The ultimate gaming keyboard with advanced features and customizable switches. Built for esports champions and serious gamers who demand precision and speed.',
    image: '/placeholder.jpg',
    specs: {
      connectivity: 'USB Type-C / Wireless',
      formFactor: 'Full-Size',
      switches: 'Custom Mechanical Switches',
      software: 'Advanced iCUE Suite',
    },
    price: 'Rs. 55,997',
  },
  {
    id: '2',
    name: 'Compact Gaming Board 96',
    description: 'Compact 96% form factor designed for productivity and gaming. Perfect balance between functionality and portability without sacrificing performance.',
    image: '/placeholder.jpg',
    specs: {
      connectivity: 'USB 3.1 Type-A',
      formFactor: '96%',
      switches: 'Mechanical RGB',
      software: 'Web Hub Control',
    },
    price: 'Rs. 41,997',
  },
];

export function FeaturedKeyboards() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Featured Keyboards
          </h2>
          <p className="text-gray-400 text-base">
            Discover our most popular and innovative keyboard designs, equipped with the latest technology for superior gaming performance.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredKeyboards.map((keyboard) => (
            <div
              key={keyboard.id}
              className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-80 bg-black overflow-hidden">
                <Image
                  src={keyboard.image || "/placeholder.svg"}
                  alt={keyboard.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {keyboard.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-2">
                  {keyboard.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-yellow-400/20">
                  <div>
                    <p className="text-yellow-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Connectivity
                    </p>
                    <p className="text-gray-300 text-sm">{keyboard.specs.connectivity}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Form Factor
                    </p>
                    <p className="text-gray-300 text-sm">{keyboard.specs.formFactor}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Switches
                    </p>
                    <p className="text-gray-300 text-sm">{keyboard.specs.switches}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase tracking-wider font-bold mb-1">
                      Software
                    </p>
                    <p className="text-gray-300 text-sm">{keyboard.specs.software}</p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  {keyboard.price && (
                    <span className="text-2xl font-bold text-yellow-400">{keyboard.price}</span>
                  )}
                  <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
