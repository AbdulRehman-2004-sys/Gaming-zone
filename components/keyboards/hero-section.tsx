'use client';

import { Button } from '@/components/ui/button';

export function KeyboardHeroSection() {
  return (
    <section className="relative w-full min-h-[500px] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden pt-20 pb-12 md:pt-32 md:pb-16">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center">
        <p className="text-yellow-400 font-bold text-xs md:text-sm uppercase tracking-widest mb-4">
          HIGH-PERFORMANCE GAMING
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
          Gaming Keyboards
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Engineered for precision and speed. Every keystroke matters in competitive gaming. Find the perfect keyboard that matches your playstyle and unlocks your full potential.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 text-base">
            Shop All Keyboards
          </Button>
          <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-3 text-base bg-transparent">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
