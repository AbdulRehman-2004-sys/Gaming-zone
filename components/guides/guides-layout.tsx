'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Mouse, Keyboard, Headphones, Monitor, Cpu, Armchair, Laptop, LayoutGrid, ChevronDown } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArticleCard } from './article-card';

interface Article {
    _id: string;
    name: string;
    mainCategory: string;
    category: string;
    image: string;
    slug: string;
    badge?: string;
    createdAt: string;
}

interface GuidesLayoutProps {
    title: string;
    category: string;
    articles: Article[];
}

const categories = [
    { name: 'ALL', icon: <LayoutGrid className="w-8 h-8" />, href: '/guides' },
    { name: 'BUILDER', icon: <Cpu className="w-8 h-8" />, href: '/guides/builder' },
    { name: 'GAMER', icon: <Image src="/img/game-controller-illustration_23-2151602211.jpg" width={40} height={40} alt="Gamer" className="object-contain" />, href: '/guides/gamer' },
    { name: 'SOFTWARE', icon: <Monitor className="w-8 h-8" />, href: '/guides/software' },
];

const filterOptions = [
    'MANUALS', 'HOW TO', 'NEWS', 'INDUSTRY NEWS', 'BLOG', 'GLOSSARY PAGE', 'GAME NEWS', 'BUYER\'S GUIDES', 'GAME GUIDES', 'PATCH NOTES'
];

export function GuidesLayout({ title, category, articles = [] }: GuidesLayoutProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'newest' | 'alphabetical'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        return articles
            .filter(article => {
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch = article.name.toLowerCase().includes(searchLower) ||
                    (article.category && article.category.toLowerCase().includes(searchLower));
                
                const matchesFilter = selectedFilters.length === 0 || 
                    (article.badge && selectedFilters.includes(article.badge.toUpperCase())) ||
                    (!article.badge && selectedFilters.includes('BLOG'));

                return matchesSearch && matchesFilter;
            })
            .sort((a, b) => {
                if (sortBy === 'newest') {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
    }, [articles, searchQuery, selectedFilters, sortBy]);

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        setCurrentPage(1);
    };

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
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
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
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-1 mb-20 bg-gray-900 border border-gray-800">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className={`flex flex-col items-center justify-center p-6 bg-black hover:bg-zinc-900 transition-colors group border-r border-gray-800 last:border-r-0 ${category.toUpperCase() === cat.name ? 'ring-2 ring-inset ring-yellow-400 z-10' : ''}`}
                        >
                            <div className={`mb-4 h-12 w-12 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${category.toUpperCase() === cat.name ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>
                                {cat.icon}
                            </div>
                            <span className={`text-[10px] font-bold tracking-widest transition-colors uppercase ${category.toUpperCase() === cat.name ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'}`}>
                                {cat.name}
                            </span>
                        </Link>
                    ))}
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
                                {filterOptions.map((filter) => (
                                    <div 
                                        key={filter} 
                                        onClick={() => toggleFilter(filter)}
                                        className="flex items-center space-x-3 cursor-pointer group"
                                    >
                                        <div className={`w-4 h-4 border border-gray-700 rounded-sm transition-colors flex items-center justify-center ${selectedFilters.includes(filter) ? 'bg-yellow-400 border-yellow-400' : 'group-hover:border-yellow-400'}`}>
                                            {selectedFilters.includes(filter) && <div className="w-2 h-2 bg-black rounded-full" />}
                                        </div>
                                        <span className={`text-[10px] sm:text-xs font-bold transition-colors tracking-wider ${selectedFilters.includes(filter) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
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
                                SORT BY: 
                                <select 
                                    className="bg-transparent text-white border-none focus:ring-0 cursor-pointer uppercase font-bold hover:text-yellow-400 transition-colors"
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value as any);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="newest" className="bg-black">NEWEST</option>
                                    <option value="alphabetical" className="bg-black">A-Z</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedArticles.length > 0 ? (
                                paginatedArticles.map((article) => (
                                    <ArticleCard 
                                        key={article._id} 
                                        title={article.name}
                                        category={article.category}
                                        type={(article.badge as any) || "BLOG"}
                                        image={article.image || "/placeholder.png"}
                                        href={`/products/${article.slug}`}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-zinc-500 uppercase tracking-widest font-bold">
                                    No guides found matching your criteria.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 pt-12">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setCurrentPage(i + 1);
                                            window.scrollTo({ top: 600, behavior: 'smooth' });
                                        }}
                                        className={`font-bold transition-colors ${currentPage === i + 1 ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
