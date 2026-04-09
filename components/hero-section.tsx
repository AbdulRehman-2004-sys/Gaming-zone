'use client';

import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative w-full bg-black pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Content */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-5 tracking-tight px-2">
            GALLEON 100 SD
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 tracking-widest uppercase mb-6 sm:mb-8 md:mb-10 px-4">
            Ultimate Gaming Keyboard With Mechanical Switches
          </p>
          <button className="bg-yellow-400 text-black px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 mb-8 sm:mb-10 md:mb-12">
            SHOP NOW
          </button>
        </div>

        {/* Hero Product Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-[500px] flex items-center justify-center mb-8 sm:mb-10 md:mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-lg pointer-events-none" />
          <div className="relative w-full h-full max-w-4xl animate-fadeIn">
            <Image
              src="/img/Gaming-Pc-PNG-Isolated-Photo.png"
              alt="Ultimate Gaming PC"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-pulse">
          <div className="text-xl sm:text-2xl text-yellow-400">↓</div>
        </div>
      </div>
    </section>
  );
}
