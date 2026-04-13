'use client';

import Image from 'next/image';
import { Check, ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface ProductDetailProps {
    product: any;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const handleAddToCart = () => {
        if (!user) {
            toast.info('Please sign in to add items to your cart');
            router.push('/signin');
            return;
        }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Breadcrumb */}
                <Link href="/products" className="inline-flex items-center text-gray-400 hover:text-yellow-400 mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Products</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-transparent blur opacity-25" />
                        <div className="relative aspect-square rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden flex items-center justify-center p-12">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-8 transform transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                {product.badge || product.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'opacity-30'}`} />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">(4.8/5)</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-bold text-yellow-400 mb-8">
                            Rs. {product.price?.toLocaleString()}
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                            {product.description}
                        </p>

                        {/* Specs Summary */}
                        {product.specs && Object.keys(product.specs).length > 0 && (
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{key}</p>
                                        <p className="text-sm font-bold text-white truncate">{value as string}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black h-16 rounded-xl font-black uppercase tracking-widest text-lg group transition-all duration-300"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                                Add To Cart
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-yellow-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">2-Year Warranty</p>
                                    <p className="text-[10px] text-gray-500">Full replacement guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-yellow-400">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider">Fast Shipping</p>
                                    <p className="text-[10px] text-gray-500">24-48 hour delivery in major cities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long Specs Section */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                    <div className="mt-24 pt-20 border-t border-white/5">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">Technical Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{key}</span>
                                    <span className="text-sm font-bold text-white text-right">{value as string}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
