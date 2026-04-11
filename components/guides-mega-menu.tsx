import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, PcCase, Monitor, Fan } from 'lucide-react';

const guidesCategories = [
    {
        title: 'EXPLORER',
        href: '/guides',
        icon: <PcCase className="w-6 h-6" />,
        items: [
            { name: 'Browse All Guides', href: '/guides' },
            { name: 'DIY Builder', href: '/guides/builder' },
            { name: 'Gaming & Furniture', href: '/guides/gamer' },
            { name: 'Case Fans & Cooling', href: '/guides' },
        ],
    },
    {
        title: 'SOFTWARE',
        href: '/guides/software',
        icon: <Monitor className="w-6 h-6" />,
        items: [
            { name: 'iCUE Guides', href: '/guides/software' },
            { name: 'iCUE Lighting Profiles', href: '/guides/software' },
            { name: 'Elgato Stream Deck', href: '/guides/software' },
        ],
    },
];

export function GuidesMegaMenu() {
    return (
        <div className="relative group hidden lg:block">
            {/* Trigger Button */}
            <button className="flex items-center gap-1 px-4 py-2 text-white text-xs xl:text-sm font-medium uppercase tracking-wider border border-transparent group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all duration-200">
                Guides
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            {/* Full-Width Mega Menu Dropdown */}
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[90] fixed top-[56px] sm:top-[64px] left-0 w-screen h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-hidden">
                {/* Backdrop overlay - starts below header */}
                <div className="fixed inset-0 top-[56px] sm:top-[64px] bg-black/60 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible -z-10 transition-opacity duration-300" />

                {/* Content - full height background */}
                <div className="relative bg-black border-t border-yellow-400/30 shadow-2xl h-full overflow-y-auto custom-scrollbar">
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Image
                            src="/img/The_Anatomy_Of_A_Gaming_PC_4526ff08-0167-49c5-9b7b-707cbbdfd80b.png"
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12">
                        <div className="grid grid-cols-4 gap-12">

                            {/* Column 1: Explorer CTA */}
                            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 flex flex-col justify-center relative z-10 backdrop-blur-md">
                                <h3 className="text-white font-bold text-lg uppercase mb-4">DropZone: EXPLORER</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    Browse how-to guides, support articles, and other content related to DropZone products.
                                </p>
                                <Link
                                    href="/guides"
                                    className="text-yellow-400 font-bold text-sm uppercase tracking-wider hover:text-white transition-colors inline-flex items-center gap-2"
                                >
                                    BROWSE ALL <span>&gt;</span>
                                </Link>
                            </div>

                            {/* Dynamic Columns from guidesCategories */}
                            {guidesCategories.map((category, idx) => (
                                <div key={idx} className="flex flex-col relative z-10">
                                    <Link
                                        href={category.href}
                                        className="flex flex-col items-start gap-4 mb-6 pb-4 border-b border-yellow-400/30 w-full group/cat hover:border-yellow-400 transition-colors"
                                    >
                                        <div className="text-yellow-400 group-hover/cat:scale-110 transition-transform">
                                            {category.icon}
                                        </div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-wider group-hover/cat:text-yellow-400 transition-colors">
                                            {category.title}
                                        </h4>
                                    </Link>
                                    <ul className="space-y-3">
                                        {category.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <Link href={item.href} className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Column 4: Featured Product */}
                            <div className="flex flex-col items-start relative z-10">
                                <div className="relative w-full aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                                    <Image
                                        src="/img/pngtree-a-sleek-gaming-pc-case-showcasing-vibrant-rgb-fans-and-components-png-image_15866247.png"
                                        alt="RS MAX Performance Fans"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
                                    RS MAX PERFORMANCE FANS
                                </h3>
                                <p className="text-gray-400 text-xs mb-4">
                                    EVERYTHING YOU NEED TO KNOW
                                </p>
                                <Link
                                    href="#"
                                    className="text-yellow-400 font-bold text-xs uppercase tracking-wider hover:text-white transition-colors inline-flex items-center gap-2"
                                >
                                    LEARN MORE <span>&gt;</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function GuidesMegaMenuMobile() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    return (
        <div className="lg:hidden border-b border-yellow-400/20">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-2 sm:py-3 text-white hover:bg-yellow-400/10 transition-colors"
            >
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">Guides</span>
                <ChevronDown className={`w-4 h-4 text-yellow-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
                <div className="bg-gray-950/50">
                    {guidesCategories.map((category, idx) => (
                        <div key={idx} className="border-t border-yellow-400/10">
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                                className="w-full flex items-center justify-between px-6 py-2 sm:py-3 text-white hover:bg-yellow-400/5 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-yellow-400">{category.icon}</div>
                                    <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider">{category.title}</span>
                                </div>
                                <ChevronDown className={`w-3 h-3 text-yellow-400 transition-transform ${expandedCategory === category.title ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedCategory === category.title && (
                                <div className="bg-black/40 px-8 py-2 space-y-2">
                                    {category.items.map((item, itemIdx) => (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className="block text-gray-400 text-xs sm:text-sm hover:text-yellow-400 transition-colors py-1"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="border-t border-yellow-400/10 px-6 py-3">
                        <Link href="/guides" className="text-yellow-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2">
                            Browse All Guides <span>→</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

