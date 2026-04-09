'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ProductQuickView, QuickViewProduct } from '@/components/product-quick-view';

interface ProductCardProps {
  id: string | number;
  name: string;
  image: string;
  price: string;
  category: string;
  specs: Record<string, string | number>;
  badge?: string;
  description?: string;
}

interface ProductCategory {
  title: string;
  subtitle?: string;
  products: ProductCardProps[];
}

interface ComparisonLayoutProps {
  productType: string; // e.g., 'GAMING KEYBOARDS', 'GAMING MICE'
  productDescription: string;
  heroImage?: string;
  categories: ProductCategory[];
  allProducts?: ProductCardProps[];
}

export function ComparisonLayout({
  productType,
  productDescription,
  heroImage,
  categories,
  allProducts = [],
}: ComparisonLayoutProps) {
  const [selectedProduct, setSelectedProduct] = React.useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt={productType}
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl" />
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wider">
            {productType}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {productDescription}
          </p>
        </div>
      </section>

      {/* Categories Section */}
      {categories.map((category, categoryIdx) => (
        <section
          key={categoryIdx}
          className="py-16 px-4 md:px-8 lg:px-12 border-t border-yellow-400/20"
        >
          <div className="max-w-7xl mx-auto">
            {/* Category Header */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3 uppercase">
                <div className="w-1 h-8 bg-yellow-400" />
                {category.title}
              </h2>
              {category.subtitle && (
                <p className="text-gray-400 text-sm md:text-base ml-11">
                  {category.subtitle}
                </p>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-950/50 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 group overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-xs uppercase">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="text-gray-400 text-sm mb-6">{product.description}</p>
                    )}

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-yellow-400/20">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                            {key}
                          </p>
                          <p className="text-white font-bold text-sm">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-2xl md:text-3xl font-bold text-yellow-400">
                        {product.price}
                      </span>
                      <Button
                        onClick={() => {
                          setSelectedProduct(product as QuickViewProduct);
                          setIsQuickViewOpen(true);
                        }}
                        className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold uppercase tracking-wider text-xs md:text-sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      {/* All Products Section */}
      {allProducts.length > 0 && (
        <section className="py-16 px-4 md:px-8 lg:px-12 border-t border-yellow-400/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-3 uppercase">
              <div className="w-1 h-8 bg-yellow-400" />
              Complete Collection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product as QuickViewProduct);
                    setIsQuickViewOpen(true);
                  }}
                  className="bg-gray-950 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 group overflow-hidden h-full cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-white mb-3 text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors uppercase">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-yellow-400">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        QUICK VIEW <ShoppingCart className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-yellow-400/5 border-t border-yellow-400/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase">
            Premium Performance
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8">
            Discover the perfect gear for your gaming setup. Each product is engineered for excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 py-3 uppercase tracking-wider text-sm">
              Shop All
            </Button>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-3 bg-transparent uppercase tracking-wider text-sm"
            >
              View Guides
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
