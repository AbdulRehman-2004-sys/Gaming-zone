'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface KeyboardModel {
  id: string;
  name: string;
  tagline: string;
  image: string;
  idealFor: string;
  switchType: string;
  sizes: string;
  connectivity: string;
  lighting: string;
  price?: string;
}

const keyboardModels: KeyboardModel[] = [
  {
    id: 'entry',
    name: 'K Series Entry',
    tagline: 'Entry Level Gaming',
    image: '/placeholder.jpg',
    idealFor: 'Budget-conscious gamers',
    switchType: 'Membrane',
    sizes: 'Full Size',
    connectivity: 'Wired',
    lighting: 'None',
    price: 'Rs. 13,997',
  },
  {
    id: 'compact',
    name: 'K Series Compact',
    tagline: 'Compact Form-Factor',
    image: '/placeholder.jpg',
    idealFor: 'Space-saving enthusiasts',
    switchType: 'Mechanical, Optical',
    sizes: '65%, 60%',
    connectivity: 'Wireless, Wired',
    lighting: '10-Zone RGB',
    price: 'Rs. 27,997',
  },
  {
    id: 'pro',
    name: 'Pro Gaming Series',
    tagline: 'Professional Gaming',
    image: '/placeholder.jpg',
    idealFor: 'Esports professionals',
    switchType: 'Mechanical, Magnetic',
    sizes: 'Full, TKL, 60%',
    connectivity: 'Wireless, Wired',
    lighting: 'Full RGB',
    price: 'Rs. 50,397',
  },
  {
    id: 'elite',
    name: 'Elite Performance',
    tagline: 'Top-Tier Innovation',
    image: '/placeholder.jpg',
    idealFor: 'Premium gaming experience',
    switchType: 'Custom Mechanical',
    sizes: 'Full, Extended',
    connectivity: 'Wireless, Wired',
    lighting: 'Advanced RGB',
    price: 'Rs. 69,997',
  },
];

export function KeyboardLineup() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Meet the Lineup
          </h2>
          <p className="text-gray-400 text-base">
            From entry-level gaming to professional esports equipment, we have a keyboard for every budget and skill level.
          </p>
        </div>

        {/* Keyboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyboardModels.map((model) => (
            <div
              key={model.id}
              className="bg-gradient-to-br from-gray-800 to-black border border-yellow-400/20 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 bg-black overflow-hidden">
                <Image
                  src={model.image || "/placeholder.svg"}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-2">
                  {model.tagline}
                </p>
                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {model.name}
                </h3>

                {/* Specs */}
                <div className="space-y-3 mb-6 pb-6 border-b border-yellow-400/10 flex-1">
                  <div>
                    <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-1">
                      Ideal For
                    </p>
                    <p className="text-gray-300 text-sm">{model.idealFor}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-1">
                      Switches
                    </p>
                    <p className="text-gray-300 text-sm">{model.switchType}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-1">
                      Connectivity
                    </p>
                    <p className="text-gray-300 text-sm">{model.connectivity}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-1">
                      Sizes
                    </p>
                    <p className="text-gray-300 text-sm">{model.sizes}</p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  {model.price && (
                    <span className="text-lg font-bold text-yellow-400">{model.price}</span>
                  )}
                  <Button size="sm" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                    Shop Now
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
