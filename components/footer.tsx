'use client';

import { Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from "@/context/SettingsContext";

const footerLinks = {
  products: [
    { name: 'Cases', href: '/pc-components/cases' },
    { name: 'Cooling', href: '/pc-components/cooling' },
    { name: 'Headsets', href: '/products/headsets' },
    { name: 'Keyboards', href: '/products/keyboards' },
    { name: 'Mice', href: '/products/mice' },
  ],
  company: [
    { name: 'About Us', href: '/support' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Investors', href: '#' },
  ],
  support: [
    { name: 'Support', href: '/support' },
    { name: 'Downloads', href: '/software' },
    { name: 'Warranty', href: '/support' },
    { name: 'RMA', href: '/support' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export function Footer() {
  const settings = useSettings();
  return (
    <footer className="border-t-2 border-yellow-400 bg-black overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Newsletter */}
        <div className="mb-6 sm:mb-10 md:mb-16 pb-6 sm:pb-10 md:pb-16 border-b-2 border-yellow-400/30">
          <div className="w-full max-w-2xl">
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-yellow-400 italic mb-2 sm:mb-3">
              Stay Updated with DROP ZONE
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              Subscribe for exclusive offers and gaming tips.
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full sm:flex-1 px-3 py-2 bg-black border-2 border-yellow-400/30 focus:border-yellow-400 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none transition-colors"
              />
              <button className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-yellow-400 text-black hover:bg-yellow-300 transition-colors font-semibold flex items-center justify-center gap-1.5 flex-shrink-0">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Sub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Logo Column */}
          <div className="col-span-1 sm:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src={settings?.siteLogo || "/footer-logo.png"}
                alt={settings?.siteTitle || "DROP ZONE"}
                width={140}
                height={45}
                className="h-16 sm:h-26 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gray-400 line-clamp-2">
              Premium gaming gear.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-2 sm:mb-3 text-xs sm:text-sm">PRODUCTS</h4>
            <ul className="space-y-1">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="hidden sm:block">
            <h4 className="font-bold text-white mb-2 sm:mb-3 text-xs sm:text-sm">COMPANY</h4>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-2 sm:mb-3 text-xs sm:text-sm">SUPPORT</h4>
            <ul className="space-y-1">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="hidden md:block">
            <h4 className="font-bold text-white mb-2 sm:mb-3 text-xs sm:text-sm">LEGAL</h4>
            <ul className="space-y-1">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-yellow-400/30 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
            <p className="text-xs text-gray-500 text-center sm:text-left order-2 sm:order-1">
              {settings?.footerText || `© ${new Date().getFullYear()} DROP ZONE.`}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
