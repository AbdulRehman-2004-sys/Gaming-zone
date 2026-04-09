'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function CartPage() {
  const { user, loading } = useAuth();
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (loading) return <div className="min-h-screen bg-black" />;
  
  if (!user) {
    redirect('/signin');
  }

  const shipping = items.length > 0 ? 0 : 0; // Free shipping dummy
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-yellow-400">YOUR CART</h1>
          <p className="text-gray-400 mt-2 uppercase tracking-widest text-sm font-bold">
            {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} SELECTED
          </p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-800">
            <ShoppingBag className="w-16 h-16 text-gray-700 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any premium gaming gear to your cart yet.
            </p>
            <Link href="/products">
              <Button className="bg-yellow-400 text-black font-black uppercase tracking-widest px-8 py-6 rounded-none hover:bg-white transition-all">
                START SHOPPING
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="group relative bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-800 hover:border-yellow-400/50 transition-all flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-32 aspect-square bg-black rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold group-hover:text-yellow-400 transition-colors uppercase leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between pt-4 mt-auto">
                      <div className="flex items-center bg-black rounded-lg border border-gray-800 p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-yellow-400 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-yellow-400 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-xl font-black text-white">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-8 rounded-2xl border-2 border-yellow-400/20 sticky top-32">
                <h2 className="text-2xl font-black uppercase italic mb-8 border-b border-gray-800 pb-4">SUMMARY</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Estimated Shipping</span>
                    <span className="text-yellow-400 uppercase text-xs font-bold tracking-widest">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium pb-4 border-b border-gray-800">
                    <span>Tax</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-2">
                    <span className="uppercase tracking-tighter italic">Total</span>
                    <span className="text-yellow-400">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-8 rounded-none hover:bg-white transition-all flex items-center justify-center gap-3 group">
                    CHECKOUT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-[10px] text-gray-500 mt-6 text-center uppercase tracking-widest font-bold">
                  Secure Checkout Powered by Drop Zone
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
