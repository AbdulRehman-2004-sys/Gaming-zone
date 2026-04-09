'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { ProductQuickView, QuickViewProduct } from '@/components/product-quick-view';

interface PCProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
  specs?: string[];
  category: string;
}

interface FilterCategory {
  name: string;
  options: string[];
}

interface GamingPCCategoryProps {
  title: string;
  description: string;
  products: PCProduct[];
  filters: FilterCategory[];
  infoSections?: Array<{
    title: string;
    content: string;
  }>;
  ctaTitle?: string;
  ctaDescription?: string;
  infoSectionTitle?: string;
  heroImage?: string;
}

export function GamingPCCategory({
  title,
  description,
  products,
  filters,
  infoSections = [],
  ctaTitle = 'READY TO UPGRADE?',
  ctaDescription = 'Explore our complete collection of gaming PCs and find the perfect system for your needs.',
  infoSectionTitle = 'Gaming PC Guide',
  heroImage,
}: GamingPCCategoryProps) {
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleFilterOption = (filterName: string, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName]?.includes(option)
        ? prev[filterName].filter((o) => o !== option)
        : [...(prev[filterName] || []), option],
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden min-h-[400px] flex items-center border-b border-yellow-400/20">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <Button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              variant="outline"
              className="w-full bg-gray-950 border-yellow-400/20 text-white hover:border-yellow-400/50"
            >
              {showMobileMenu ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Sidebar Filters */}
            <div
              className={`${showMobileMenu ? 'block' : 'hidden'
                } md:block md:col-span-1 space-y-6`}
            >
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                  Filters
                </h3>
              </div>

              {filters.map((filter) => (
                <div key={filter.name} className="border-b border-yellow-400/10">
                  <button
                    onClick={() => toggleFilter(filter.name)}
                    className="w-full flex items-center justify-between py-3 text-left hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      {filter.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedFilters[filter.name] ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {expandedFilters[filter.name] && (
                    <div className="pb-4 space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filter.name]?.includes(option) || false
                            }
                            onChange={() => toggleFilterOption(filter.name, option)}
                            className="w-4 h-4 accent-yellow-400"
                          />
                          <span className="text-xs text-gray-400 hover:text-gray-300">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsQuickViewOpen(true);
                    }}
                    className="group bg-gray-950 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 bg-gray-900 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-yellow-400 text-xs uppercase tracking-wider mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 flex-1 line-clamp-2">
                        {product.description}
                      </p>

                      {product.specs && product.specs.length > 0 && (
                        <div className="mb-4 space-y-1">
                          {product.specs.slice(0, 2).map((spec, idx) => (
                            <p key={idx} className="text-gray-500 text-xs">
                              • {spec}
                            </p>
                          ))}
                        </div>
                      )}

                      {product.price && (
                        <p className="text-yellow-400 font-bold text-lg mb-4">
                          {product.price}
                        </p>
                      )}

                      <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-xs uppercase tracking-wider py-2">
                        Quick View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-950/50 border-y border-yellow-400/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {ctaTitle}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 py-3 uppercase tracking-wider">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Info Sections */}
      {infoSections.length > 0 && (
        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {infoSectionTitle ?? 'Gaming PC Guide'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {infoSections.map((section, idx) => (
                <div key={idx} className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
