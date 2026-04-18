'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts } from '@/lib/actions/product';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORY_MAP } from '@/lib/categories';

function ShopContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const data = await getProducts();
      setAllProducts(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  // Filter application
  const filteredProducts = allProducts.filter(p => {
    // 1. Search Query
    const searchMatch = query 
      ? (p.name || '').toLowerCase().includes(query.toLowerCase()) || 
        (p.category || '').toLowerCase().includes(query.toLowerCase()) ||
        (p.mainCategory || '').toLowerCase().includes(query.toLowerCase())
      : true;
    
    // 2. Category Checkboxes
    const categoryMatch = selectedCategories.length > 0
      ? selectedCategories.includes(p.mainCategory) || selectedCategories.includes(p.category)
      : true;
      
    return searchMatch && categoryMatch;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page to 1 when filters or query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
      setSelectedCategories([]);
      if(query){
          router.push('/shop');
      }
  };

  const getHeading = () => {
    if (query) {
      return `Searched result for "${query}"`;
    }
    return 'All Products';
  };

  // Compile a static list of main categories plus popular subcategories for filtering
  const filterOptions = [
      'Gaming PCs', 
      'Gaming Furniture', 
      'Keyboards', 
      'Mice', 
      'Headsets', 
      'Cases', 
      'Cooling', 
      'Power Supplies', 
      'Monitors'
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Mobile Header & Filter Button */}
      <div className="md:hidden flex justify-between items-center w-full mb-4">
        <h1 className="text-xl font-bold uppercase truncate pr-4">{getHeading()}</h1>
        <Button onClick={() => setIsMobileFilterOpen(true)} className="bg-zinc-800 text-white flex-shrink-0">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Sidebar Filters */}
      <div className={`fixed inset-0 z-50 bg-black/90 md:relative md:bg-transparent md:z-0 md:w-64 md:flex-shrink-0 transition-transform duration-300 ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-full sm:h-auto overflow-y-auto bg-zinc-950 md:bg-transparent p-6 md:p-0 w-3/4 md:w-full border-r border-yellow-400/20 md:border-none">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-white uppercase">Filters</h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-8 sticky top-32">
            <div>
              <h3 className="text-yellow-400 font-black tracking-widest text-sm uppercase mb-4 pb-2 border-b border-zinc-800">Categories</h3>
              <div className="space-y-3">
                {filterOptions.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="peer appearance-none w-5 h-5 border-2 border-zinc-700 rounded bg-zinc-900 checked:border-yellow-400 checked:bg-yellow-400 transition-colors"
                      />
                      <div className="absolute opacity-0 peer-checked:opacity-100 text-black pointer-events-none">
                        <svg className="w-3.5 h-3.5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-zinc-300 group-hover:text-white transition-colors text-sm font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {(selectedCategories.length > 0 || query) && (
                <button 
                    onClick={clearFilters}
                    className="w-full py-2 bg-zinc-900 text-zinc-400 text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
                >
                    Clear All Filters
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="flex-1 min-w-0">
        <h1 className="hidden md:block text-3xl font-black uppercase tracking-tighter text-white mb-8 border-b border-zinc-800 pb-4">
          {getHeading()}
        </h1>

        {loading ? (
          <div className="w-full flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-yellow-400 rounded-full animate-spin"></div>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="w-full text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
            <h3 className="text-2xl font-black uppercase text-white mb-2">No Products Found</h3>
            <p className="text-zinc-500 mb-6 font-medium">Try adjusting your filters or search query.</p>
            {(query || selectedCategories.length > 0) && (
              <Button 
                 onClick={clearFilters}
                 className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 uppercase tracking-widest text-xs"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={product._id}
                  className="group bg-zinc-950 border border-zinc-800 hover:border-yellow-400/50 rounded-xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col"
                >
                  <div className="aspect-square relative bg-zinc-900 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 truncate group-hover:text-yellow-400/70 transition-colors">
                      {product.category}
                    </div>
                    <h3 className="font-bold text-white text-sm line-clamp-2 mb-4 group-hover:text-yellow-400 transition-colors flex-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="text-lg font-black text-white italic">
                            Rs. {Number(product.price).toLocaleString()}
                        </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16 pt-8 border-t border-zinc-800/50">
                <Button 
                  onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-black border-zinc-700 text-white hover:bg-zinc-900 hover:text-yellow-400 disabled:opacity-30 disabled:hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
                <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                  Page <span className="text-yellow-400 font-bold mx-1">{currentPage}</span> of <span className="text-white mx-1">{totalPages}</span>
                </div>
                <Button 
                  onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="bg-black border-zinc-700 text-white hover:bg-zinc-900 hover:text-yellow-400 disabled:opacity-30 disabled:hover:text-white"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="pt-16 sm:pt-20 flex-1 flex flex-col bg-zinc-950/20">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[50vh]"><div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div></div>}>
          <ShopContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
