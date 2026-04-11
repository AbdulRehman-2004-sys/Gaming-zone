import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Aperture, Zap, Globe, Cpu } from 'lucide-react';

const softwareCategories = [
    {
        title: 'iCUE SOFTWARE',
        href: '/software',
        icon: <Aperture className="w-6 h-6" />,
        items: [
            { name: 'About iCUE', href: '/software' },
            { name: 'Download iCUE', href: '/software' },
            { name: 'iCUE Murals', href: '/software' },
        ],
    },
    {
        title: 'INTEGRATIONS',
        href: '/software',
        icon: <Zap className="w-6 h-6" />,
        items: [
            { name: 'Nanoleaf', href: '/software' },
            { name: 'Philips Hue', href: '/software' },
            { name: 'NVIDIA', href: '/software' },
            { name: 'Govee', href: '/software' },
        ],
    },
    {
        title: 'WEB HUB',
        href: '/software',
        icon: <Globe className="w-6 h-6" />,
        items: [
            { name: 'Launch Web Hub', href: '/software' },
        ],
    },
    {
        title: 'SUPPORT',
        href: '/support',
        icon: <Cpu className="w-6 h-6" />,
        items: [
            { name: 'Setup Guides', href: '/support' },
            { name: 'Troubleshooting', href: '/support' },
        ],
    },
];

export function SoftwareMegaMenu() {
    return (
        <div className="relative group hidden lg:block">
            {/* Trigger Button */}
            <button className="flex items-center gap-1 px-4 py-2 text-white text-xs xl:text-sm font-medium uppercase tracking-wider border border-transparent group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all duration-200">
                Software
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
                            src="/img/png-transparent-blue-light-efficiency-technology-electronic-components-of-the-circuit-light-effect-line-tortuous-thumbnail.png"
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12">
                        <div className="grid grid-cols-4 gap-12 text-left">

                            {/* Dynamic Columns from softwareCategories */}
                            {softwareCategories.map((category, idx) => (
                                <div key={idx} className="flex flex-col items-start relative z-10">
                                    <Link
                                        href={category.href}
                                        className="flex flex-col items-start group/cat hover:opacity-80 transition-opacity"
                                    >
                                        <div className="w-16 h-16 mb-6 text-white border-2 border-white rounded-full flex items-center justify-center backdrop-blur-md group-hover/cat:border-yellow-400 group-hover/cat:text-yellow-400 transition-colors">
                                            {category.icon}
                                        </div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 group-hover/cat:text-yellow-400 transition-colors">
                                            {category.title}
                                        </h4>
                                    </Link>
                                    <ul className="space-y-3 flex flex-col items-start">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SoftwareMegaMenuMobile() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    return (
        <div className="lg:hidden border-b border-yellow-400/20">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-2 sm:py-3 text-white hover:bg-yellow-400/10 transition-colors"
            >
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">Software</span>
                <ChevronDown className={`w-4 h-4 text-yellow-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
                <div className="bg-gray-950/50">
                    {softwareCategories.map((category, idx) => (
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
                        <Link href="/software" className="text-yellow-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2">
                            Explore iCUE <span>→</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

