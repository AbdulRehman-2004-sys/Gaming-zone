'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ProductQuickView, QuickViewProduct } from '@/components/product-quick-view';
import { Plus } from 'lucide-react';

interface SubCategory {
    name: string;
    href: string;
}

interface ProductSeries {
    title: string;
    description: string;
    image: string;
    href: string;
    features?: string[];
    align?: 'left' | 'right';
}

interface Guide {
    title: string;
    description: string;
    image: string;
    href: string;
}

interface PCComponentLayoutProps {
    title: string;
    description: string;
    heroImage?: string;
    subCategories?: SubCategory[];
    series: ProductSeries[];
    products?: any[];
    buyingGuide?: {
        title: string;
        steps: {
            title: string;
            content: string;
        }[];
    };
    guides?: Guide[];
}

export function PCComponentLayout({
    title,
    description,
    heroImage = '/placeholder.svg',
    subCategories = [],
    series,
    products = [],
    buyingGuide,
    guides,
}: PCComponentLayoutProps) {
    const [selectedProduct, setSelectedProduct] = React.useState<QuickViewProduct | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            {description}
                        </p>

                        {/* Sub Categories Links */}
                        {subCategories.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {subCategories.map((sub, idx) => (
                                    <Link href={sub.href} key={idx}>
                                        <Button
                                            variant="outline"
                                            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold uppercase tracking-wider"
                                        >
                                            {sub.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Product Series Sections */}
            <section className="py-20 px-6 md:px-12 space-y-32">
                {series.map((item, idx) => (
                    <div
                        key={idx}
                        className={`max-w-7xl mx-auto flex flex-col ${item.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                            } items-center gap-12 lg:gap-24`}
                    >
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 relative aspect-4/3 group">
                            <div
                                className={`absolute inset-0 bg-linear-to-br from-yellow-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                            />
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded-lg border border-gray-800 shadow-2xl"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold text-white">
                                {item.title}
                            </h2>
                            <div className="w-20 h-1 bg-yellow-400" />
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {item.description}
                            </p>

                            {item.features && (
                                <ul className="space-y-3">
                                    {item.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-gray-400">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="pt-6 flex gap-4">
                                <Link href={item.href}>
                                    <Button className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-6 text-base tracking-wider uppercase">
                                        SHOP {item.title.toUpperCase()}
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedProduct({
                                            id: idx,
                                            name: item.title,
                                            description: item.description,
                                            image: item.image,
                                            category: title,
                                            price: 'Contact for Price',
                                            specs: item.features
                                        } as QuickViewProduct);
                                        setIsQuickViewOpen(true);
                                    }}
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-6 text-base tracking-wider uppercase"
                                >
                                    Quick View
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                <ProductQuickView
                    product={selectedProduct}
                    isOpen={isQuickViewOpen}
                    onClose={() => setIsQuickViewOpen(false)}
                />
            </section>

            {/* Products Grid Section */}
            {products.length > 0 && (
                <section className="py-20 px-6 md:px-12 border-t border-yellow-400/20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4 uppercase">
                            <div className="w-2 h-10 bg-yellow-400" />
                            All {title} Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product: any) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-900/50 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300 group rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
                                    onClick={() => {
                                        setSelectedProduct(product as QuickViewProduct);
                                        setIsQuickViewOpen(true);
                                    }}
                                >
                                    <div className="relative aspect-square overflow-hidden bg-black/40">
                                        <Image
                                            src={product.image || '/placeholder.svg'}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-xs uppercase z-10">
                                                {product.badge}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col grow">
                                        <p className="text-yellow-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                                            {product.category}
                                        </p>
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 uppercase tracking-wide group-hover:text-yellow-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-yellow-400/10">
                                            <span className="text-xl font-bold text-yellow-400">
                                                {product.price}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Buying Guide Section */}
            {buyingGuide && (
                <section className="bg-gray-900 py-24 px-6 md:px-12 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 uppercase">
                            {buyingGuide.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {buyingGuide.steps.map((step, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -top-6 -left-6 text-9xl font-bold text-gray-800 -z-10 select-none">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-yellow-400 mb-4 uppercase">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">{step.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Guides & Videos Grid */}
            {guides && guides.length > 0 && (
                <section className="py-24 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 uppercase">Guides & Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {guides.map((guide, idx) => (
                                <Link
                                    key={idx}
                                    href={guide.href}
                                    className="group bg-gray-900 border border-gray-800 hover:border-yellow-400/50 transition-colors rounded-lg overflow-hidden"
                                >
                                    <div className="relative aspect-video">
                                        <Image
                                            src={guide.image}
                                            alt={guide.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors uppercase">
                                            {guide.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {guide.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
