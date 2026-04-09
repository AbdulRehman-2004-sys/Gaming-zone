'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Technology {
  id: string;
  name: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  featured?: boolean;
}

const technologies: Technology[] = [
  {
    id: 'wireless',
    name: 'SLIPSTREAM WIRELESS',
    title: 'Fast, Reliable Wireless',
    description: 'Ultra-low-latency SLIPSTREAM WIRELESS v1.5 is up to 25% faster than previous versions. Experience lag-free gaming with reliable, long-range connectivity that esports professionals demand.',
    benefits: [
      'Sub-1ms response time',
      '25% faster than SLIPSTREAM v1.0',
      'Professional-grade reliability',
      'Multi-device support',
    ],
    image: '/placeholder.jpg',
    featured: true,
  },
  {
    id: 'software',
    name: 'iCUE CONTROL',
    title: 'Intuitive Software Control',
    description: 'With iCUE, customizing your keyboard has never been easier. Create complex macros, design custom lighting effects, and reprogram any key to your exact specifications.',
    benefits: [
      'Advanced macro creation',
      'Full RGB customization',
      'Game-specific profiles',
      'Cloud synchronization',
    ],
    image: '/placeholder.jpg',
    featured: true,
  },
  {
    id: 'trigger',
    name: 'RAPID TRIGGER MODE',
    title: 'Lightning-Fast Response',
    description: 'Rapid trigger mode enables hyper-quick movements that are impossible on conventional gaming keyboards. Keys instantly reset for faster, more precise actions giving you competitive advantage.',
    benefits: [
      'Instant key reset',
      'Competitive advantage',
      'Customizable actuation',
      'Tournament-grade performance',
    ],
    image: '/placeholder.jpg',
  },
  {
    id: 'actuation',
    name: 'CUSTOM ACTUATION',
    title: 'Personalize Your Keypress',
    description: 'Set the actuation point anywhere between 0.4mm and 3.6mm to create your perfect typing or gaming experience. Customize response for every playstyle.',
    benefits: [
      'Adjustable actuation point',
      'Personalized response',
      'Gaming & productivity modes',
      'Real-time adjustment',
    ],
    image: '/placeholder.jpg',
  },
];

export function TechnologyShowcase() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Game-Changing Tech for Victory
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Unlock your full gaming potential with cutting-edge keyboard technologies designed for ultimate precision and speed.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="space-y-12">
          {technologies.map((tech, idx) => (
            <div key={tech.id} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={`order-2 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                <p className="text-yellow-400 text-xs uppercase font-bold tracking-wider mb-3">
                  {tech.name}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {tech.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {tech.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8">
                  {tech.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold">
                  Learn More
                </Button>
              </div>

              {/* Image */}
              <div className={`order-1 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative h-64 md:h-96 bg-black rounded-lg overflow-hidden border border-yellow-400/20">
                  <Image
                    src={tech.image || "/placeholder.svg"}
                    alt={tech.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
