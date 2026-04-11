'use client';

import { CategoryLandingLayout } from '@/components/category-landing-layout';
import { Mouse, Keyboard, Headphones, Gamepad2, Tv, Video, Monitor } from 'lucide-react';

const shortcuts = [
    { name: 'MICE', icon: <Mouse className="w-8 h-8" />, href: '/products/mice' },
    { name: 'KEYBOARDS', icon: <Keyboard className="w-8 h-8" />, href: '/products/keyboards' },
    { name: 'HEADSETS', icon: <Headphones className="w-8 h-8" />, href: '/products/headsets' },
    { name: 'CONTROLLERS', icon: <Gamepad2 className="w-8 h-8" />, href: '/products/controllers' },
    { name: 'STREAMING', icon: <Video className="w-8 h-8" />, href: '#' },
];

const featuredProducts = [
    {
        id: 'mouse-1',
        name: 'M65 RGB ELITE',
        category: 'Gaming Mouse',
        price: 'Rs. 22,397',
        image: 'new-images/gaming-gear/featured/mouse.jpeg',
        badge: 'Best Seller',
        description: 'Tournament-proven mouse with 18,000 DPI sensor and adjustable weight system.'
    },
    {
        id: 'kb-1',
        name: 'K100 RGB MECHANICAL',
        category: 'Keyboard',
        price: 'Rs. 64,397',
        image: 'new-images/gaming-gear/featured/keyboard.jpeg',
        badge: 'Premium',
        description: 'The pinnacle of gaming keyboards, featuring AXON Hyper-Processing Technology.'
    },
    {
        id: 'hs-1',
        name: 'HS80 RGB WIRELESS',
        category: 'Headset',
        price: 'Rs. 41,997',
        image: 'new-images/gaming-gear/featured/headset.jpeg',
        badge: 'Popular',
        description: 'Immersive spatial audio and broadcast-grade microphone for elite gaming.'
    },
    {
        id: 'mouse-2',
        name: 'M75 AIR WIRELESS',
        category: 'Gaming Mouse',
        price: 'Rs. 36,397',
        image: 'new-images/gaming-gear/featured/wireless.jpeg',
        description: 'Symmetrically shaped for comfort and built for precision at only 60g.'
    }
];

const features = [
    {
        title: "PRECISION AT YOUR FINGERTSIPS",
        description: "Our gaming mice and keyboards feature ultra-responsive optical switches and industry-leading sensors for zero-lag competitive play.",
        image: 'new-images/gaming-gear/keyboard.jpeg',
    },
    {
        title: "IMMERSE YOUR SENSES",
        description: "High-fidelity spatial audio and custom-tuned drivers. Hear every footstep and feel every explosion with our premium headsets.",
        image: "new-images/gaming-gear/headset.jpeg",
        reversed: true,
    }
];

export default function PeripheralsPage() {
    return (
        <CategoryLandingLayout
            hero={{
                title: "PERIPHERALS",
                subtitle: "PRO-CLASS GEAR FOR EVERY PLAYER.",
                image: "/new-images/gaming-gear/gaming-gears.jpeg",
                ctaText: "SHOP ALL ACCESSORIES",
                ctaHref: "/products/mice" // For now, directing to a sub-category or a shop all if created
            }}
            shortcuts={shortcuts}
            features={features}
            featuredProducts={featuredProducts}
        />
    );
}
