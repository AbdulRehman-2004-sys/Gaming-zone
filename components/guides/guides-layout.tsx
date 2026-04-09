'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Mouse, Keyboard, Headphones, Monitor, Cpu, Armchair, Laptop, LayoutGrid } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface GuidesLayoutProps {
    title: string;
    category: string;
    children: React.ReactNode;
}

const categories = [
    { name: 'MICE', icon: <Image src="/img/game-controller-illustration_23-2151602211.jpg" width={40} height={40} alt="Mice" className="object-contain" />, href: '#' },
    { name: 'KEYBOARDS', icon: <Image src="/img/cartoon-game-streamer-concept-elements_23-2148918251.jpg" width={40} height={40} alt="Keyboards" className="object-contain" />, href: '#' },
    { name: 'HEADSETS', icon: <Image src="/img/gamepad-game-controller-icon-isolated-3d-render-illustration_47987-6409.jpg" width={40} height={40} alt="Headsets" className="object-contain" />, href: '#' },
    { name: 'GAMING PCS', icon: <Image src="/img/Gaming-Pc-PNG-Isolated-Photo.png" width={40} height={40} alt="PCs" className="object-contain" />, href: '#' },
    { name: 'MONITORS', icon: <Image src="/img/pngtree-pc-monitor-component-isometric-png-image_8930550.png" width={40} height={40} alt="Monitors" className="object-contain" />, href: '#' },
    { name: 'CHAIRS', icon: <Image src="/img/highendgamingpc-setup.png" width={40} height={40} alt="Chairs" className="object-contain" />, href: '#' },
    { name: 'DESKS', icon: <Image src="/img/gamingpc-setup.png" width={40} height={40} alt="Desks" className="object-contain" />, href: '#' },
];

const filters = [
    'MANUALS', 'HOW TO', 'NEWS', 'INDUSTRY NEWS', 'BLOG', 'GLOSSARY PAGE', 'GAME NEWS', 'BUYER\'S GUIDES', 'GAME GUIDES', 'PATCH NOTES'
];

export function GuidesLayout({ title, category, children }: GuidesLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            {/* Search Hero */}
            <div className="relative py-20 px-4 mt-16 overflow-hidden border-b border-gray-800">
                <div className="absolute inset-0 bg-[url('/img/game-controller-illustration_23-2151602211.jpg')] bg-cover bg-center opacity-20 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
                        SEARCH PRODUCTS & EXPERTISE
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base mb-8 uppercase tracking-widest font-medium">
                        Find the perfect parts for your build or explore expert guides
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
                        <Input
                            placeholder="SEARCH"
                            className="w-full pl-14 pr-4 py-8 bg-white text-black text-lg font-bold border-none rounded-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-4 hover:bg-yellow-400 hover:text-black transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center">{category}</h2>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1 mb-20 bg-gray-900 border border-gray-800">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className="flex flex-col items-center justify-center p-6 bg-black hover:bg-zinc-900 transition-colors group border-r border-gray-800 last:border-r-0"
                        >
                            <div className="mb-4 h-12 w-12 flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-yellow-400 transition-colors uppercase">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                    <Link
                        href="#"
                        className="flex flex-col items-center justify-center p-6 bg-black hover:bg-zinc-900 transition-colors group"
                    >
                        <div className="mb-4 h-12 w-12 flex items-center justify-center text-gray-400 group-hover:text-yellow-400 transition-all duration-300">
                            <LayoutGrid className="w-8 h-8" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-yellow-400 transition-colors uppercase">
                            MORE
                        </span>
                    </Link>
                </div>

                <div className="flex flex-col items-start mb-8 gap-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">EXPLORE: {category}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
                    {/* Sidebar Filters */}
                    <aside className="space-y-8 hidden lg:block">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">FILTERS</h4>
                            <div className="space-y-4">
                                {filters.map((filter) => (
                                    <div key={filter} className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="w-4 h-4 border border-gray-700 rounded-sm group-hover:border-yellow-400 transition-colors" />
                                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-wider">
                                            {filter}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="space-y-12">
                        <div className="flex justify-end border-b border-gray-800 pb-4 mb-8">
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                                SORT BY: <span className="text-white cursor-pointer hover:text-yellow-400 transition-colors">NEWEST</span>
                            </div>
                        </div>

                        {children}

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-4 pt-12">
                            <span className="text-yellow-400 font-bold border-b-2 border-yellow-400">1</span>
                            <button className="text-gray-500 hover:text-white transition-colors font-bold">2</button>
                            <button className="text-gray-500 hover:text-white transition-colors font-bold">3</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
