'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
    title: string;
    category: string;
    image: string;
    href: string;
    type?: 'BLOG' | 'GAME GUIDES' | 'NEWS' | 'HOW TO' | 'QUICK START GUIDE' | 'GAME NEWS' | 'BUYER\'S GUIDES';
}

export function ArticleCard({ title, category, image, href, type = 'BLOG' }: ArticleCardProps) {
    return (
        <Link href={href} className="group flex flex-col bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-400 transition-all duration-300">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <span className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                    {type}
                </span>
                <h3 className="text-white text-sm sm:text-base font-bold uppercase leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {title}
                </h3>
            </div>
        </Link>
    );
}
