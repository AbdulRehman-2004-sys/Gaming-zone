'use client';

import { CategoryLandingLayout } from '@/components/category-landing-layout';
import { Cpu, Zap, Wind, HardDrive, Layout, Cable, Database, Power } from 'lucide-react';

const shortcuts = [
    { name: 'PROCESSORS', icon: <Cpu className="w-8 h-8" />, href: '/pc-components/processors' },
    { name: 'GRAPHICS CARDS', icon: <Zap className="w-8 h-8" />, href: '/pc-components/graphics-cards' },
    { name: 'COOLING', icon: <Wind className="w-8 h-8" />, href: '/pc-components/cooling' },
    { name: 'POWER SUPPLY', icon: <Power className="w-8 h-8" />, href: '/pc-components/power-supply' },
    { name: 'CASES', icon: <Layout className="w-8 h-8" />, href: '/pc-components/cases' },
    { name: 'MEMORY', icon: <Database className="w-8 h-8" />, href: '/pc-components/memory' },
    { name: 'STORAGE', icon: <HardDrive className="w-8 h-8" />, href: '/pc-components/storage' },
    { name: 'CABLES', icon: <Cable className="w-8 h-8" />, href: '/pc-components/cables' },
];

const featuredProducts = [
    {
        id: 'cpu-1',
        name: 'Intel Core i9-14900K',
        category: 'Processor',
        price: 'Rs. 165,197',
        image: '/new-images/pc-components/processor.jpeg',
        badge: 'Top Performance',
        description: 'The ultimate gaming processor with 24 cores and 6.0GHz boost speed.'
    },
    {
        id: 'ram-1',
        name: 'DOMINATOR TITANIUM DDR5',
        category: 'Memory',
        price: 'Rs. 60,197',
        image: '/new-images/pc-components/memory.jpeg',
        badge: 'Premium',
        description: 'Elite DDR5 memory with patented DHX cooling and extreme overclocking potential.'
    },
    {
        id: 'psu-1',
        name: 'RM1000x Shift 80 PLUS Gold',
        category: 'Power Supply',
        price: 'Rs. 58,797',
        image: '/new-images/pc-components/power-supply.jpeg',
        badge: 'Innovative',
        description: 'Fully modular PSU with side-mounted cable connections for easier builds.'
    },
    {
        id: 'cool-1',
        name: 'iCUE LINK H150i RGB',
        category: 'Cooling',
        price: 'Rs. 67,197',
        image: '/new-images/pc-components/cooling.jpeg',
        badge: 'Smart Cooling',
        description: 'High-performance AIO cooler with the revolutionary iCUE LINK single-cable system.'
    }
];

const features = [
    {
        title: "UNMATCHED THERMAL PERFORMANCE",
        description: "Keep your high-performance components cool under pressure with our advanced liquid and air cooling solutions. Engineered for maximum airflow and minimal noise.",
        image: "/new-images/pc-components/cooling-2.jpeg",
    },
    {
        title: "POWER YOUR AMBITION",
        description: "Reliable, high-efficiency power supplies that provide rock-solid stability for your most demanding builds. Certified for 80 PLUS excellence.",
        image: "/new-images/pc-components/power-supply.jpeg",
        reversed: true,
    },
    {
        title: "CRAFT THE PERFECT AESTHETIC",
        description: "From minimalist stealth to radiant RGB showpieces, our cases and cables are designed to make your build as beautiful as it is powerful.",
        image: "/new-images/pc-components/cables.jpeg",
    }
];

export default function PCComponentsPage() {
    return (
        <CategoryLandingLayout
            hero={{
                title: "PC COMPONENTS",
                subtitle: "BUILD YOUR MASTERPIECE WITH THE WORLD'S BEST HARDWARE",
                image: "/new-images/pc-components/pc-components.jpeg",
                ctaText: "EXPLORE ALL COMPONENTS",
                ctaHref: "/pc-components/processors"
            }}
            shortcuts={shortcuts}
            features={features}
            featuredProducts={featuredProducts}
        />
    );
}
