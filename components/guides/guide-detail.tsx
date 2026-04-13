'use client';

import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface GuideDetailProps {
    guide: any;
}

export function GuideDetail({ guide }: GuideDetailProps) {
    return (
        <article className="min-h-screen bg-black text-white pt-24 pb-20">
            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden mb-16">
                <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 md:px-8 w-full pb-12">
                        <Link href="/guides" className="inline-flex items-center text-yellow-400 mb-6 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Guides</span>
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                {guide.badge || 'GUIDE'}
                            </span>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                READ TIME: 5-10 MIN
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                            {guide.name}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-yellow-400" />
                                <span>DropZone Editorial Team</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-yellow-400" />
                                <span>{new Date(guide.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-12">
                    {/* Main Text Content */}
                    <div className="max-w-none">
                        <div className="text-xl text-zinc-400 leading-relaxed font-medium mb-12 italic border-l-4 border-yellow-400 pl-6">
                            {guide.description}
                        </div>
                        
                        <div 
                            className="guide-content-rendered text-zinc-300 text-lg"
                            dangerouslySetInnerHTML={{ __html: guide.guideContent }} 
                        />
                    </div>
                </div>

                {/* Footer Attribution */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-3xl">
                            DZ
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase tracking-tight text-xl mb-2">DropZone Expertise</h4>
                            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
                                Explore our collection of masterfully crafted guides and articles. Our team provides expert insights, setup tips, and high-performance hardware knowledge to elevate your gaming experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
