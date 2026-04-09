'use client';

import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { ProductQuickView, QuickViewProduct } from './product-quick-view';

const products = [
  {
    id: 1,
    name: 'GAMING MOUSE PRO',
    category: 'PERIPHERALS',
    description: 'High-precision gaming mouse with custom sensors. Features zero-lag wireless connectivity and ergonomic design.',
    price: 'Rs. 22,397',
    rating: 4.8,
    reviews: 342,
    image: '/home/gaming-mice.jpeg',
    // image: '/img/hd-neon-led-wired-gaming-mouse-transparent-png-701751714997733nerhvvi7jz.webp', // Real asset
    specs: ['Custom 26K DPI Optical Sensor', 'Zero-Lag Wireless', '89g Lightweight Design']
  },
  {
    id: 2,
    name: 'GAMING KEYBOARD RGB',
    category: 'PERIPHERALS',
    description: 'Mechanical keyboard with customizable RGB lighting and ultra-responsive switches for superior gaming performance.',
    price: 'Rs. 41,997',
    rating: 4.9,
    reviews: 278,
    image: '/home/gaming-keyboard.jpeg',
    // image: '/img/imgbin-computer-keyboard-keycap-gaming-keypad-macro-key-control-key-blue-polygon-LrGcZgsYLRSiWvWfMHHLFRsDc_t.jpg', // Real asset
    specs: ['Cherry MX Speed Switches', 'PBT Double-Shot Keycaps', 'Dynamic Per-Key RGB']
  },
  {
    id: 3,
    name: 'CORSAIR ONE i500',
    category: 'GAMING PCs',
    description: '7.1 surround sound gaming headset with crystal-clear audio and a comfortable fit for long gaming sessions.',
    price: 'Rs. 36,397',
    rating: 4.7,
    reviews: 215,
    image: '/home/gaming-pc.jpeg',
    // image: '/img/360-3603311_cpu-cabinet-png-pic-best-gaming-computer-2017.png', // Using a PC build image as it fits the theme better than a placeholder
    specs: ['7.1 Surround Sound', 'Broadcast-Grade Mic', '2.4GHz Wireless Connectivity']
  },
  {
    id: 4,
    name: 'GAMING PC CASE',
    category: 'CASES',
    description: 'Tempered glass mid-tower gaming case with excellent airflow and plenty of room for high-end components.',
    price: 'Rs. 55,997',
    rating: 4.6,
    reviews: 189,
    image: '/home/pc.jpeg',
    // image: '/img/pngtree-a-sleek-gaming-pc-case-showcasing-vibrant-rgb-fans-and-components-png-image_15866247.png', // Real asset
    specs: ['Tool-Free Tempered Glass', 'RapidRoute Cable Management', 'High-Airflow Design']
  },
];

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 italic">Featured Products</h2>
          <button className="hidden sm:flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base hover:bg-yellow-400 hover:text-black transition-all font-semibold whitespace-nowrap">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product as any as QuickViewProduct);
                setIsQuickViewOpen(true);
              }}
              className="group relative overflow-visible border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 bg-black cursor-pointer"
            >
              {/* Product Image Placeholder */}
              <div className="relative h-40 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1 sm:mb-1.5">
                    {product.category}
                  </p>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-1.5 group-hover:text-yellow-400 transition-colors line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-400 hidden sm:block line-clamp-1">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.rating}
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-yellow-400/20 gap-2">
                  <span className="text-base sm:text-lg md:text-xl font-bold text-yellow-400">{product.price}</span>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold text-xs sm:text-sm">
                    QUICK VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full sm:hidden mt-8 sm:mt-10 border-2 border-yellow-400 text-yellow-400 px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base hover:bg-yellow-400 hover:text-black transition-all font-semibold">
          View All Products
        </button>
      </div>

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
}
