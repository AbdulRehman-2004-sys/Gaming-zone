'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, CheckCircle, ArrowLeft, Loader2, ShieldCheck, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  if (loading) return <div className="min-h-screen bg-black" />;
  
  if (!user) {
    redirect('/signin');
  }

  if (items.length === 0 && !isSuccess) {
    redirect('/cart');
  }

  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-900 border-2 border-yellow-400 p-12 rounded-2xl text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter italic uppercase">SUCCESSFUL!</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Your order has been placed.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Thank you for choosing DROP ZONE. We've sent a dummy confirmation to your email. Your gear will be shipped soon.
            </p>
            <div className="pt-6">
              <Link href="/">
                <Button className="bg-yellow-400 text-black font-black uppercase tracking-widest px-10 py-6 rounded-none hover:bg-white transition-all w-full">
                  RETURN HOME
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/cart" className="text-gray-500 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-yellow-400">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-12 order-2 lg:order-1">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-yellow-400">
                <Truck className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase italic">SHIPPING INFORMATION</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input required className="w-full bg-gray-900 border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg" defaultValue={user.name} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Street Address</label>
                  <input required className="w-full bg-gray-900 border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg" placeholder="123 Gaming Street" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">City</label>
                  <input required className="w-full bg-gray-900 border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg" placeholder="Karachi" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                  <input required className="w-full bg-gray-900 border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg" placeholder="75500" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-yellow-400">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase italic">PAYMENT METHOD</h2>
              </div>
              <div className="p-6 bg-gray-900 rounded-2xl border-2 border-yellow-400/20 space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
                  <input 
                    required 
                    className="w-full bg-black border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg placeholder:text-gray-700 font-mono tracking-widest" 
                    placeholder="xxxx xxxx xxxx xxxx"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Expiry Date</label>
                    <input required className="w-full bg-black border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg placeholder:text-gray-700" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">CVV</label>
                    <input required className="w-full bg-black border-2 border-gray-800 focus:border-yellow-400 p-4 outline-none transition-colors rounded-lg placeholder:text-gray-700" placeholder="123" maxLength={3} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  SSL SECURE 256-BIT ENCRYPTION
                </div>
              </div>
            </section>

            <Button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-yellow-400 text-black font-black uppercase tracking-widest py-10 rounded-none hover:bg-white transition-all flex items-center justify-center gap-4 text-xl"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> PROCESSING...
                </>
              ) : (
                <>PLACE ORDER NOW</>
              )}
            </Button>
          </form>

          {/* Sidebar Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-32 space-y-8">
              <div className="flex items-center gap-3 text-gray-400">
                <Package className="w-5 h-5" />
                <h2 className="text-xl font-black uppercase italic">ORDER SUMMARY</h2>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-black rounded p-1 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-black uppercase text-gray-500 mb-1 leading-none">{item.category}</p>
                      <h4 className="text-sm font-bold uppercase leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-yellow-400 font-bold mt-1">QTY: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-800">
                <div className="flex justify-between text-gray-400 font-medium text-sm">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium text-sm pb-4 border-b border-gray-800">
                  <span>Shipping</span>
                  <span className="text-yellow-400 uppercase text-[10px] font-black tracking-widest">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-black">
                  <span className="uppercase tracking-tighter italic">Total</span>
                  <span className="text-yellow-400">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
