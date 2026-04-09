'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductQuickView, QuickViewProduct } from '@/components/product-quick-view';

interface Feature {
    title: string;
    description: string;
    image: string;
    reversed?: boolean;
}

interface Shortcut {
    name: string;
    icon: React.ReactNode;
    href: string;
}

interface Product {
    id: string | number;
    name: string;
    image: string;
    price: string;
    category: string;
    specs?: Record<string, string | number>;
    badge?: string;
    description?: string;
}

interface CategoryLandingLayoutProps {
    hero: {
        title: string;
        subtitle: string;
        image: string;
        ctaText: string;
        ctaHref: string;
    };
    shortcuts?: Shortcut[];
    features: Feature[];
    featuredProducts?: Product[];
    children?: React.ReactNode; // For additional custom sections
}

export function CategoryLandingLayout({ hero, shortcuts, features, featuredProducts, children }: CategoryLandingLayoutProps) {
    const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 text-white">
                    <Image
                        src={hero.image}
                        alt={hero.title}
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-6 px-4">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
                        {hero.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-medium uppercase tracking-widest max-w-3xl mx-auto">
                        {hero.subtitle}
                    </p>
                    <div className="pt-8">
                        <Link href={hero.ctaHref}>
                            <Button className="bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 px-10 py-8 text-lg rounded-none">
                                {hero.ctaText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shortcut Icons Grid */}
            {shortcuts && (
                <section className="py-12 border-b border-gray-900 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {shortcuts.map((shortcut, idx) => (
                                <Link key={idx} href={shortcut.href} className="flex flex-col items-center group">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-800 flex items-center justify-center mb-4 group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all transform group-hover:scale-110 bg-black">
                                        {shortcut.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                                        {shortcut.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Products Section */}
            {featuredProducts && featuredProducts.length > 0 && (
                <section className="py-24 px-4 md:px-8 border-t border-gray-900 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                                    Featured Collection
                                </h2>
                                <p className="text-gray-400 text-lg max-w-xl">
                                    Explore our hand-picked selection of high-performance gear designed for elite players.
                                </p>
                            </div>
                            <Link href={hero.ctaHref}>
                                <Button variant="link" className="text-yellow-400 font-bold uppercase tracking-widest p-0 flex items-center gap-2 group">
                                    Shop All Collection <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => {
                                        setSelectedProduct(product as QuickViewProduct);
                                        setIsQuickViewOpen(true);
                                    }}
                                    className="bg-zinc-900/50 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer"
                                >
                                    <div className="relative aspect-square bg-black overflow-hidden">
                                        <Image
                                            src={product.image || '/placeholder.svg'}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 font-black text-[10px] uppercase tracking-tighter">
                                                {product.badge}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button className="bg-white text-black font-bold uppercase tracking-widest rounded-none scale-90 group-hover:scale-100 transition-transform">
                                                Quick View
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-2">
                                            {product.category}
                                        </p>
                                        <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 uppercase">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xl font-black text-white">
                                                {product.price}
                                            </span>
                                            <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Dynamic Feature Sections */}
            <div className="space-y-0 text-white">
                {features.map((feature, idx) => (
                    <section key={idx} className={cn("py-24 px-4 md:px-8 border-t border-gray-900", idx % 2 === 1 ? 'bg-zinc-950 text-white' : 'bg-black text-white')}>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className={cn("space-y-8", feature.reversed ? 'order-2 lg:order-2' : 'order-2 lg:order-1')}>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white">
                                    {feature.title}
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                    {feature.description}
                                </p>
                                <div className="pt-4">
                                    <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-none uppercase font-bold tracking-widest transition-all">
                                        LEARN MORE <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className={cn("relative aspect-video rounded-none overflow-hidden shadow-2xl", feature.reversed ? 'order-1 lg:order-1' : 'order-1 lg:order-2')}>
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border border-white/5" />
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Custom Children Content */}
            {children}

            <ProductQuickView
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />

            <Footer />
        </div>
    );
}
