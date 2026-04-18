'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ShoppingCart, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { MegaMenu, MegaMenuMobile } from './mega-menu';
import { GuidesMegaMenu, GuidesMegaMenuMobile } from './guides-mega-menu';
import { useSettings } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logout } from "@/lib/actions/auth";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { searchProductsRegex } from "@/lib/actions/product";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading, refreshUser } = useAuth();
  const { totalItems } = useCart();
  const settings = useSettings();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      const results = await searchProductsRegex(searchQuery);
      setSuggestions(results);
      setIsSearching(false);
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success('Logged out successfully');
      window.location.href = '/';
    }
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.name || user.email.split('@')[0];
  };

  const getAvatarLetter = () => {
    if (!user) return "";
    return (user.name?.[0] || user.email[0]).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black border-b border-yellow-400/30 z-[100] w-full">
        <div className="w-full px-4 sm:px-6 md:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 lg:justify-center lg:gap-0">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0 min-w-fit lg:absolute lg:left-4 xl:left-8">
              <Image
                src={settings?.siteLogo || "/logo.png"}
                alt={settings?.siteTitle || "DROP ZONE"}
                width={120}
                height={60}
                className="h-16 sm:h-24 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <MegaMenu />
              <GuidesMegaMenu />
              <Link href="/support" className="text-white text-xs xl:text-sm hover:text-yellow-400 transition-colors font-medium uppercase tracking-wider">
                Support
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 lg:absolute lg:right-4 xl:right-8">
              {user && user.role !== 'admin' && (
                <Link href="/cart" className="text-white hover:text-yellow-400 transition-colors p-2 relative flex-shrink-0 mr-2">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1/3 -translate-y-1/3">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              <div className="relative flex items-center" ref={searchContainerRef}>
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (!isSearchOpen) {
                      setTimeout(() => searchInputRef.current?.focus(), 100);
                    }
                  }}
                  className="text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[calc(100vw-32px)] sm:w-80 bg-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxWidth: '400px' }}>
                    <form 
                      onSubmit={(e) => {
                         e.preventDefault();
                         if(searchQuery.trim()){
                             setIsSearchOpen(false);
                             router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                         }
                      }}
                      className="flex items-center p-2 border-b border-zinc-800 bg-zinc-900"
                    >
                      <Search className="w-4 h-4 text-zinc-500 ml-2" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-transparent text-white px-3 py-1.5 text-sm focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {isSearching && <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mr-2"></div>}
                    </form>

                    {searchQuery.trim() && (
                      <div className="max-h-64 overflow-y-auto">
                        {suggestions.length > 0 ? (
                          <div className="py-2">
                            {suggestions.map((p) => (
                              <Link 
                                key={p._id} 
                                href={`/products/${p.slug}`}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-900 transition-colors group"
                              >
                                <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden relative flex-shrink-0">
                                  <Image src={p.image || "/placeholder.png"} fill alt={p.name} className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-xs font-bold truncate group-hover:text-yellow-400">{p.name}</p>
                                  <p className="text-zinc-500 text-[10px] truncate">{p.category}</p>
                                </div>
                                <div className="text-yellow-400 text-xs font-bold whitespace-nowrap">
                                  Rs.{p.price}
                                </div>
                              </Link>
                            ))}
                            <Link 
                               href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                               onClick={() => setIsSearchOpen(false)}
                               className="block text-center text-xs text-yellow-400 px-4 py-3 hover:bg-yellow-400 hover:text-black font-bold transition-colors border-t border-zinc-800"
                            >
                               View All Results
                            </Link>
                          </div>
                        ) : !isSearching ? (
                          <div className="p-4 text-center text-xs text-zinc-500">
                            No products found.
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden md:flex items-center gap-2 lg:gap-3 min-w-[120px] justify-end">
                {loading ? (
                  <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded-full"></div>
                ) : user && user.role !== 'admin' ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full group hover:border-yellow-400 transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black text-[10px] font-bold">
                        {getAvatarLetter()}
                      </div>
                      <span className="text-white text-xs lg:text-sm font-medium">
                        {getUserDisplayName()}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-black border border-zinc-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-3 border-b border-zinc-800 bg-zinc-900/50">
                          <p className="text-white text-xs font-bold truncate">{user.name || user.email}</p>
                          <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{user.role}</p>
                        </div>
                        <div className="p-1">
                          {user.role === 'admin' && (
                            <Link
                              href="/admin"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md transition-colors text-xs font-medium"
                            >
                              <LayoutDashboard className="w-4 h-4 text-yellow-400" />
                              Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-red-400 hover:bg-red-400/5 rounded-md transition-colors text-xs font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/signin" className="text-white text-xs lg:text-sm hover:text-yellow-400 transition-colors font-medium whitespace-nowrap">
                      SIGN IN
                    </Link>
                    <Link href="/signup" className="text-black bg-yellow-400 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap">
                      JOIN US
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden text-white hover:text-yellow-400 transition-colors p-2 flex-shrink-0"
              >
                {isMobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileOpen && (
            <nav className="lg:hidden border-t border-yellow-400/30 pb-3 sm:pb-4 max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)] overflow-y-auto">
              <MegaMenuMobile />
              <GuidesMegaMenuMobile />
              <div className="py-2 sm:py-3 space-y-1 sm:space-y-2">
                <Link href="/support" className="block text-white text-xs sm:text-sm hover:text-yellow-400 transition-colors font-medium uppercase tracking-wider px-4 py-2">
                  Support
                </Link>
              </div>
              <div className="pt-2 sm:pt-3 border-t border-yellow-400/30 space-y-2 px-4 pb-4">
                {loading ? (
                  <div className="h-12 w-full bg-zinc-900 animate-pulse rounded-xl border border-zinc-800"></div>
                ) : user && user.role !== 'admin' ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black text-sm font-bold">
                        {getAvatarLetter()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-bold">{getUserDisplayName()}</span>
                        <span className="text-zinc-500 text-[10px] uppercase tracking-widest">{user.role}</span>
                      </div>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileOpen(false)}
                        className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-yellow-400/20 py-3 rounded-xl text-yellow-400 hover:bg-yellow-400/10 transition-colors text-sm font-bold"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        DASHBOARD
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-zinc-400 border border-zinc-800 py-3 rounded-xl hover:bg-red-400/10 hover:text-red-400 transition-colors text-sm font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/signin" className="block text-white text-xs sm:text-sm font-medium hover:text-yellow-400 py-2">
                      SIGN IN
                    </Link>
                    <Link href="/signup" className="block text-center text-black bg-yellow-400 px-3 py-2 text-xs sm:text-sm font-bold hover:bg-yellow-300 transition-colors">
                      JOIN US
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16" />
    </>
  );
}
