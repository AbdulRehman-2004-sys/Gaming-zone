'use client';

import { CategoryLandingLayout } from '@/components/category-landing-layout';
import { Armchair, Layout as Desk, Package, Ruler, Settings, Lightbulb } from 'lucide-react';

const shortcuts = [
    { name: 'CHAIRS', icon: <Armchair className="w-8 h-8" />, href: '/gaming-furniture/gaming-chairs' },
    { name: 'DESKS', icon: <Desk className="w-8 h-8" />, href: '/gaming-furniture/gaming-desks' },
    { name: 'STANDS', icon: <Settings className="w-8 h-8" />, href: '/gaming-furniture/stands' },
    { name: 'ACCESSORIES', icon: <Package className="w-8 h-8" />, href: '/gaming-furniture/accessories' },
];

const features = [
    {
        title: "ERGONOMICS WITHOUT COMPROMISE",
        description: "Designed for marathon sessions, our gaming chairs provide top-tier lumbar support and adjustable 4D armrests to keep you in peak form.",
        image: "/img/highendgamingpc-setup.png",
    },
    {
        title: "THE ULTIMATE COMMAND CENTER",
        description: "Modular gaming desks built with heavy-duty steel frames and integrated cable management. Elevate your setup with height-adjustable precision.",
        image: "/img/gamingpc-setup.png",
        reversed: true,
    }
];

export default function GamingFurniturePage() {
    return (
        <CategoryLandingLayout
            hero={{
                title: "GAMING FURNITURE",
                subtitle: "ELEVATE YOUR COMFORT. MASTER YOUR ARENA.",
                image: "/new-images/gaming-furniture/gaming-furniture.jpeg",
                ctaText: "BROWSE FURNITURE",
                ctaHref: "#"
            }}
            shortcuts={shortcuts}
            features={features}
        />
    );
}
