'use client';

import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Pro Gamer',
    title: 'Esports Champion',
    image: '/placeholder.jpg',
    quote: 'Best keyboard I have ever used for competitive gaming. The response time is incredible.',
  },
  {
    id: '2',
    name: 'Content Creator',
    title: 'YouTuber & Streamer',
    image: '/placeholder.jpg',
    quote: 'Perfect for both gaming and streaming setup. The build quality is exceptional.',
  },
  {
    id: '3',
    name: 'Developer',
    title: 'Software Engineer',
    image: '/placeholder.jpg',
    quote: 'Fantastic keyboard for long coding sessions. Comfort and performance are unmatched.',
  },
  {
    id: '4',
    name: 'Gaming Enthusiast',
    title: 'Tech Reviewer',
    image: '/placeholder.jpg',
    quote: 'Worth every penny. This is the keyboard all other brands should aspire to be.',
  },
  {
    id: '5',
    name: 'Pro Player',
    title: 'Tournament Winner',
    image: '/placeholder.jpg',
    quote: 'My secret weapon. The precision and speed give me the competitive edge I need.',
  },
  {
    id: '6',
    name: 'Tech Enthusiast',
    title: 'Hardware Expert',
    image: '/placeholder.jpg',
    quote: 'Incredible engineering and attention to detail. Highly recommend to anyone serious.',
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            See What Everyone is Saying
          </h2>
          <p className="text-gray-400 text-base">
            Join thousands of satisfied gamers who have switched to our keyboard
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-lg p-6 hover:border-yellow-400/50 transition-all duration-300"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{testimonial.name}</p>
                  <p className="text-yellow-400 text-xs">{testimonial.title}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
