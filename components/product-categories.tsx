'use client';

import Link from 'next/link';

const categories = [
  { name: 'CASES', icon: '📦', link: '/pc-components' },
  { name: 'GAMING PCs', icon: '🖥️', link: '/shop?q=gaming pcs' },
  { name: 'MEMORY', icon: '⚡', link: '/shop?q=memory' },
  { name: 'KEYBOARDS', icon: '⌨️', link: '/shop?q=keyboards' },
  { name: 'HEADSETS', icon: '🎧', link: '/shop?q=headsets' },
  { name: 'POWER SUPPLIES', icon: '🔌', link: '/shop?q=power' },
  { name: 'COOLERS', icon: '❄️', link: '/shop?q=cooling' },
  { name: 'GAMING MICE', icon: '🖱️', link: '/shop?q=mice' },
  { name: 'FANS', icon: '🌀', link: '/shop?q=fans' },
  { name: 'FURNITURE', icon: '🪑', link: '/shop?q=furniture' },
];

export function ProductCategories() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black border-t-2 border-b-2 border-yellow-400 overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-yellow-400 italic">Shop by Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {categories.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              className="group relative p-4 sm:p-5 md:p-6 bg-black border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 cursor-pointer hover:bg-yellow-400/5 w-full flex flex-col items-center"
            >
              {/* Content */}
              <div className="relative space-y-2 sm:space-y-3 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform flex justify-center">{category.icon}</div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
