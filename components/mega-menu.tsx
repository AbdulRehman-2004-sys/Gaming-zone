'use client';

import React from "react"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Package, Headphones, Monitor, Armchair as Chair, ShoppingCart, Cpu, Keyboard, Mouse, Gamepad2 } from 'lucide-react';

interface MenuCategory {
  title: string;
  href: string; // Made required as all categories should have a destination
  icon: React.ReactNode;
  items: {
    name: string;
    href: string;
    badge?: string;
  }[];
}

const menuCategories: MenuCategory[] = [
  {
    title: 'PC COMPONENTS',
    href: '/pc-components',
    icon: <Cpu className="w-8 h-8" />,
    items: [
      { name: 'All Components', href: '/pc-components' },
      { name: 'Processors', href: '/pc-components/processors' },
      { name: 'Graphics Cards', href: '/pc-components/graphics-cards' },
      { name: 'Memory', href: '/pc-components/memory' },
      { name: 'Storage', href: '/pc-components/storage' },
      { name: 'Power Supply', href: '/pc-components/power-supply' },
      { name: 'Cooling', href: '/pc-components/cooling' },
      { name: 'Cables', href: '/pc-components/cables' },
    ],
  },
  {
    title: 'GAMING GEAR',
    href: '/products',
    icon: <Headphones className="w-8 h-8" />,
    items: [
      { name: 'All Gear', href: '/products' },
      { name: 'Keyboards', href: '/products/keyboards' },
      { name: 'Mice', href: '/products/mice' },
      { name: 'Headsets', href: '/products/headsets' },
      { name: 'Controllers', href: '/products/controllers' },
      { name: 'Mousepads', href: '/products/mousepads' },
      { name: 'Cables', href: '/products/cables' },
      { name: 'Accessories', href: '/products/accessories' },
    ],
  },
  {
    title: 'GAMING PCs',
    href: '/gaming-pcs',
    icon: <Monitor className="w-8 h-8" />,
    items: [
      { name: 'All Gaming PCs', href: '/gaming-pcs' },
      { name: 'Pre-built Systems', href: '/gaming-pcs/pre-built-systems' },
      { name: 'Laptops', href: '/gaming-pcs/laptops' },
      { name: 'Desktops', href: '/gaming-pcs/desktops' },
      { name: 'Workstations', href: '/gaming-pcs/workstations', badge: 'Trending' },
      { name: 'Monitors', href: '/gaming-pcs/monitors' },
    ],
  },
  {
    title: 'GAMING FURNITURE',
    href: '/gaming-furniture',
    icon: <Chair className="w-8 h-8" />,
    items: [
      { name: 'All Furniture', href: '/gaming-furniture' },
      { name: 'Gaming Chairs', href: '/gaming-furniture/gaming-chairs' },
      { name: 'Desks', href: '/gaming-furniture/gaming-desks' },
      { name: 'Stands', href: '/gaming-furniture/stands' },
      { name: 'Accessories', href: '/gaming-furniture/accessories' },
    ],
  },
  {
    title: 'SHOP ALL',
    href: '/products',
    icon: <ShoppingCart className="w-8 h-8" />,
    items: [
      { name: 'New Products', href: '/products' },
      { name: 'Featured', href: '/products' },
      { name: 'Sale', href: '/products' },
      { name: 'Clearance', href: '/products' },
    ],
  },
];

export function MegaMenu() {
  return (
    <div className="relative group hidden lg:block">
      {/* Trigger Button */}
      <button className="flex items-center gap-1 px-4 py-2 text-white text-xs xl:text-sm font-medium uppercase tracking-wider border border-transparent group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all duration-200">
        Products
        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
      </button>

      {/* Full-Width Mega Menu Dropdown */}
      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[90] fixed top-[56px] sm:top-[64px] left-0 w-screen h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-hidden">
        {/* Backdrop overlay - starts below header */}
        <div className="fixed inset-0 top-[56px] sm:top-[64px] bg-black/60 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible -z-10 transition-opacity duration-300" />

        {/* Content - full height background */}
        <div className="relative bg-black border-t border-yellow-400/30 shadow-2xl h-full overflow-y-auto custom-scrollbar">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="/img/Computer-Motherboard-PNG-Photos.png"
              alt="Background"
              fill
              className="object-contain opacity-50"
            />
          </div>

          {/* Grid Container with proper spacing */}
          <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-12">
            <div className="grid grid-cols-5 gap-12">
              {menuCategories.map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Category Icon and Title */}
                  <Link
                    href={category.href}
                    className="flex flex-col items-start gap-4 mb-8 pb-4 border-b border-yellow-400/30 w-full group/cat hover:border-yellow-400 transition-colors"
                  >
                    <div className="text-yellow-400 group-hover/cat:scale-110 transition-transform">{category.icon}</div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider leading-tight group-hover/cat:text-yellow-400 transition-colors">
                      {category.title}
                    </h4>
                  </Link>

                  {/* Category Items - Left aligned */}
                  <ul className="space-y-3 flex-1">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className="text-gray-300 text-sm hover:text-yellow-400 transition-colors font-normal inline-flex items-center gap-2"
                        >
                          {item.name}
                          {item.badge && (
                            <span className="bg-yellow-400 text-black text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative border-t border-yellow-400/20" />

          {/* Bottom CTA Section */}
          <div className="relative bg-black/50 px-6 md:px-8 lg:px-12 py-6">
            <Link
              href="/products"
              className="text-yellow-400 font-bold text-sm uppercase tracking-wider hover:text-yellow-300 transition-colors inline-flex items-center gap-2"
            >
              View All Products
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MegaMenuMobile() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      {menuCategories.map((category, idx) => (
        <div key={idx} className="border-b border-yellow-400/20">
          <button
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category.title ? null : category.title
              )
            }
            className="w-full flex items-center justify-between px-4 py-2 sm:py-3 text-white hover:bg-yellow-400/10 transition-colors"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-yellow-400 text-lg sm:text-xl flex-shrink-0">{category.icon}</div>
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">
                {category.title}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-yellow-400 transition-transform flex-shrink-0 ${expandedCategory === category.title ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Expanded Items */}
          {expandedCategory === category.title && (
            <div className="bg-gray-950/50 px-4 py-2 sm:py-3 space-y-1">
              {category.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.href}
                  className="block text-gray-300 text-xs sm:text-sm hover:text-yellow-400 transition-colors py-1.5 sm:py-2 pl-8 sm:pl-11 flex items-center justify-between group"
                >
                  <span className="group-hover:pl-1 transition-all">{item.name}</span>
                  {item.badge && (
                    <span className="bg-yellow-400 text-gray-950 text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-bold flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
