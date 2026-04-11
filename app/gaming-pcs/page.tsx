'use client';

import { CategoryLandingLayout } from '@/components/category-landing-layout';
import { Monitor, Laptop2, Cpu, Zap, LayoutGrid, Tv } from 'lucide-react';

const shortcuts = [
  { name: 'DESKTOPS', icon: <Monitor className="w-8 h-8" />, href: '/gaming-pcs/desktops' },
  { name: 'LAPTOPS', icon: <Laptop2 className="w-8 h-8" />, href: '/gaming-pcs/laptops' },
  { name: 'WORKSTATIONS', icon: <Cpu className="w-8 h-8" />, href: '/gaming-pcs/workstations' },
  { name: 'PRE-BUILT', icon: <Monitor className="w-8 h-8" />, href: '/gaming-pcs/pre-built-systems' },
  { name: 'MONITORS', icon: <Tv className="w-8 h-8" />, href: '/gaming-pcs/monitors' },
];

const featuredProducts = [
 
  {
    id: 'lap-1',
    name: 'VOYAGER a1600 Edition',
    category: 'Gaming Laptop',
    price: 'Rs. 559,997',
    image: 'home/pc.jpeg',
    badge: 'Mobile Powerhouse',
    description: 'Experience desktop-class performance in a thin, light portable form factor.'
  },
  {
    id: 'mon-1',
    name: 'XENEON FLEX 45WQHD240 OLED',
    category: 'Gaming Monitor',
    price: 'Rs. 447,997',
    image: 'home/gaming-pc.jpeg',
    badge: 'Revolutionary',
    description: 'The world\'s first bendable 45-inch OLED gaming monitor with 240Hz refresh rate.'
  },
  
];

const features = [
  {
    title: "THE ULTIMATE GAMING MACHINES",
    description: "Our precision-engineered gaming PCs deliver extreme performance and stunning aesthetics. Built with top-tier components and rigorously tested.",
    image: "new-images/gaming-pc/gaming-pcs.jpeg",
  },
  {
    title: "POWER TO GO",
    description: "Experience desktop-class performance in a portable form factor. Our gaming laptops are thin, light, and powerful enough for the most demanding titles.",
    image: "new-images/gaming-pc/desktop.jpeg",
    reversed: true,
  }
];

export default function GamingPCsPage() {
  return (
    <CategoryLandingLayout
      hero={{
        title: "GAMING PCS",
        subtitle: "ELITE PERFORMANCE. UNCOMPROMISING DESIGN.",
        image: "/new-images/gaming-pc/gaming-pcs.jpeg",
        ctaText: "VIEW ALL SYSTEMS",
        ctaHref: "/gaming-pcs/pre-built-systems"
      }}
      shortcuts={shortcuts}
      features={features}
      featuredProducts={featuredProducts}
    />
  );
}
