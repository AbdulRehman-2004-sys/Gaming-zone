'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ProductQuickView, QuickViewProduct } from '@/components/product-quick-view';

interface FilterOption {
  name: string;
  count?: number;
}

interface FilterCategory {
  title: string;
  options: FilterOption[];
}

interface FurnitureProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  specs?: Record<string, string | number | undefined>;
}

interface GamingFurnitureCategoryProps {
  title: string;
  description: string;
  heroImage?: string;
  filters: FilterCategory[];
  products: FurnitureProduct[];
  infoSections: Array<{
    title: string;
    content: string;
  }>;
}

export function GamingFurnitureCategory({
  title,
  description,
  heroImage,
  filters,
  products,
  infoSections,
}: GamingFurnitureCategoryProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const toggleFilter = (filterName: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black h-full" />
          )}
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <p className="text-gray-400 text-sm mb-4">Home / Furniture</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-white font-bold text-lg mb-6">Filters</h3>
              <div className="space-y-4">
                {filters.map((filter, idx) => (
                  <div key={idx} className="border-b border-gray-800">
                    <button
                      onClick={() => toggleFilter(filter.title)}
                      className="w-full flex items-center justify-between py-3 text-white hover:text-yellow-400 transition-colors"
                    >
                      <span className="text-sm font-semibold uppercase">{filter.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${activeFilters[filter.title] ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {activeFilters[filter.title] && (
                      <div className="pb-3 space-y-2">
                        {filter.options.map((option, optIdx) => (
                          <label
                            key={optIdx}
                            className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors text-sm"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-yellow-400"
                            />
                            {option.name}
                            {option.count && (
                              <span className="text-xs text-gray-500">({option.count})</span>
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 text-white mb-4 hover:text-yellow-400 transition-colors"
          >
            {mobileFiltersOpen ? (
              <>
                <X className="w-5 h-5" />
                Close Filters
              </>
            ) : (
              <>
                <Menu className="w-5 h-5" />
                Show Filters
              </>
            )}
          </button>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-gray-950 rounded-lg p-6 mb-8 border border-gray-800">
                <h3 className="text-white font-bold text-lg mb-4">Filters</h3>
                <div className="space-y-4">
                  {filters.map((filter, idx) => (
                    <div key={idx} className="border-b border-gray-800">
                      <button
                        onClick={() => toggleFilter(filter.title)}
                        className="w-full flex items-center justify-between py-3 text-white hover:text-yellow-400 transition-colors"
                      >
                        <span className="text-sm font-semibold uppercase">{filter.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${activeFilters[filter.title] ? 'rotate-180' : ''
                            }`}
                        />
                      </button>
                      {activeFilters[filter.title] && (
                        <div className="pb-3 space-y-2">
                          {filter.options.map((option, optIdx) => (
                            <label
                              key={optIdx}
                              className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors text-sm"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 accent-yellow-400"
                              />
                              {option.name}
                              {option.count && (
                                <span className="text-xs text-gray-500">({option.count})</span>
                              )}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-950 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group overflow-hidden flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 md:h-64 bg-gray-900 overflow-hidden flex items-center justify-center">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <p className="text-yellow-400 text-xs uppercase tracking-wider mb-2 font-semibold">
                        {product.category}
                      </p>
                      <h3 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-4 flex-grow">
                        {product.description}
                      </p>

                      {/* Specs */}
                      {product.specs && (
                        <div className="mb-4 pb-4 border-b border-gray-800">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            {Object.entries(product.specs).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-gray-500 uppercase">{key}</p>
                                <p className="text-white font-semibold">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price and Button */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg sm:text-xl font-bold text-yellow-400">
                          {product.price}
                        </span>
                        <Button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsQuickViewOpen(true);
                          }}
                          className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-3 sm:px-4 py-2 text-xs sm:text-sm"
                        >
                          QUICK VIEW
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ProductQuickView
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
              />

              {/* CTA Button */}
              <div className="flex justify-center mb-16">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 py-3 text-lg">
                  EXPLORE NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <section className="bg-gray-950/50 border-t border-gray-800 py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {infoSections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-12 pt-12 border-t border-gray-800' : ''}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {section.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
