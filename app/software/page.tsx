'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Monitor, Zap, Palette, Globe, Layers, CheckCircle2 } from 'lucide-react';

export default function SoftwarePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/highendgamingpc-setup.png"
                        alt="Software Hero"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-6 px-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center animate-pulse">
                            <Image src="/logo.png" width={40} height={40} alt="iCUE Logo" className="invert brightness-0" />
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        iCUE SOFTWARE
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium uppercase tracking-widest max-w-2xl mx-auto">
                        UNITE YOUR SETUP. COMMAND YOUR PERFORMANCE.
                    </p>
                    <div className="pt-8">
                        <Button className="bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 px-10 py-8 text-lg rounded-none">
                            DOWNLOAD iCUE
                        </Button>
                    </div>
                </div>
            </section>

            {/* Personalize Your Dream Setup */}
            <section className="py-24 px-4 md:px-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                            PERSONALIZE YOUR<br />DREAM SETUP
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            Take complete control of your entire ecosystem with a single interface. Orchestrate complex lighting effects, monitor performance, and optimize your gaming experience like never before.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "VIBRANT DYNAMIC RGB LIGHTING",
                                "PRECISION PERFORMANCE MONITORING",
                                "CUSTOM FAN & PUMP CONTROL",
                                "INTUITIVE DASHBOARD LAYOUT",
                                "SCENE SELECTION & PRESETS"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-sm font-bold tracking-widest text-gray-200">
                                    <CheckCircle2 className="text-yellow-400 w-5 h-5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 order-1 lg:order-2">
                        <Image
                            src="/img/gamingpc-setup.png"
                            alt="Setup Personalization"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                    </div>
                </div>
            </section>

            {/* iCUE Murals */}
            <section className="py-24 bg-zinc-950 px-4 md:px-8 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">iCUE MURALS</h2>
                    <p className="text-gray-400 text-lg uppercase tracking-widest font-bold">Immersive Lighting Beyond the Screen</p>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto" />
                </div>

                <div className="max-w-6xl mx-auto relative group">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
                        <Image src="/img/pngtree-high-performance-gaming-pc-with-custom-blue-liquid-cooling-transparent-case-png-image_18130675.webp" alt="Murals Demo" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        {[
                            { icon: <Palette className="w-8 h-8" />, name: "CREATE CUSTOM SCENES" },
                            { icon: <Globe className="w-8 h-8" />, name: "SYNC ACROSS DEVICES" },
                            { icon: <Layers className="w-8 h-8" />, name: "SCREEN LINK TECHNOLOGY" },
                            { icon: <Zap className="w-8 h-8" />, name: "REAL-TIME REACTIONS" }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:text-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">{feature.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Maximize Control / Optimize Performance */}
            <section className="py-24 px-4 md:px-8 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-800">
                        <Image
                            src="/img/pc-component.png"
                            alt="Performance Optimization"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                    </div>
                    <div className="space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                            MAXIMIZE CONTROL<br />OPTIMIZE PERFORMANCE
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "ADVANCED SENSOR MONITORING", desc: "Real-time temperature and voltage tracking for CPUs, GPUs, and motherboards." },
                                { title: "CUSTOM COOLING PROFILES", desc: "Set fan and pump speeds based on temperature triggers to stay quiet or run cool." },
                                { title: "ON-THE-FLY MACROS", desc: "Assign complex key combinations and actions to any iCUE-compatible device." }
                            ].map((item, idx) => (
                                <div key={idx} className="border-l-4 border-yellow-400 pl-6 space-y-2">
                                    <h4 className="font-black tracking-widest uppercase text-lg">{item.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Downloads Section */}
            <section className="py-24 bg-zinc-900/50 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">DOWNLOADS</h2>
                    <p className="text-gray-400 tracking-widest uppercase font-bold text-sm">Choose the right version for your system</p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { version: "iCUE v5.x", platform: "WINDOWS 10/11", desc: "The latest high-performance build for modern systems.", primary: true },
                        { version: "iCUE v4.x", platform: "WINDOWS 10", desc: "Legacy support for older CORSAIR hardware and setups.", primary: false },
                        { version: "iCUE FOR MAC", platform: "macOS 12+", desc: "Full RGB and performance control on Apple ecosystems.", primary: false }
                    ].map((card, idx) => (
                        <div key={idx} className={`p-10 flex flex-col items-center text-center space-y-6 border ${card.primary ? 'border-yellow-400 bg-white/5' : 'border-gray-800 bg-black'} rounded-xl transition-transform hover:-translate-y-2`}>
                            <Download className={`w-12 h-12 ${card.primary ? 'text-yellow-400' : 'text-gray-500'}`} />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black italic">{card.version}</h3>
                                <p className="text-yellow-400 text-[10px] font-black tracking-widest uppercase">{card.platform}</p>
                            </div>
                            <p className="text-gray-400 text-sm">{card.desc}</p>
                            <Button className={`w-full font-black uppercase tracking-widest ${card.primary ? 'bg-yellow-400 text-black hover:bg-white' : 'bg-white text-black hover:bg-yellow-400'} rounded-none py-6`}>
                                DOWNLOAD NOW
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Integration Partners */}
            <section className="py-24 px-4 md:px-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">HARDWARE INTEGRATION PARTNERS</h2>
                        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black tracking-[0.3em] uppercase text-gray-500">
                            <span className="text-yellow-400 cursor-pointer border-b-2 border-yellow-400 pb-1">ALL</span>
                            <span className="hover:text-white cursor-pointer transition-colors pb-1">BRANDS</span>
                            <span className="hover:text-white cursor-pointer transition-colors pb-1">GAMES</span>
                            <span className="hover:text-white cursor-pointer transition-colors pb-1">COMPONENTS</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { name: "ASUS", desc: "Aura Sync Integration enabled across all motherboards.", img: "/img/cartoon-game-streamer-concept-elements_23-2148918251.jpg" },
                            { name: "MSI", desc: "Mystic Light control directly from iCUE.", img: "/img/49-492918_pc-components-png-transparent-png.png" },
                            { name: "Nanoleaf", desc: "Sync your wall panels with your PC peripherals.", img: "/img/highendgamingpc-setup.png" },
                            { name: "Govee", desc: "Expand your lighting to the entire room effortlessly.", img: "/img/gamingpc-setup.png" }
                        ].map((partner, idx) => (
                            <div key={idx} className="bg-zinc-950 border border-gray-900 p-8 group hover:border-yellow-400 transition-all duration-300">
                                <div className="relative h-24 w-full mb-6 filter grayscale group-hover:grayscale-0 transition-all">
                                    <Image src={partner.img} alt={partner.name} fill className="object-contain" />
                                </div>
                                <h4 className="text-xl font-black uppercase italic mb-2 group-hover:text-yellow-400 transition-colors">{partner.name}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed lowercase tracking-tight">{partner.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* iCUE Certified System Builders CTA */}
            <section className="relative h-[400px] flex items-center overflow-hidden border-t border-gray-900">
                <div className="absolute inset-0">
                    <Image src="/img/highendgamingpc-setup.png" alt="Builders CTA" fill className="object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <Image src="/logo.png" width={24} height={24} alt="iCUE Logo" className="invert" />
                            </div>
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">iCUE CERTIFIED<br />SYSTEM BUILDERS</h3>
                        </div>
                        <p className="text-gray-400 max-w-md uppercase tracking-widest text-xs font-bold leading-relaxed">Build your next masterpiece with one of our certified elite system integration partners.</p>
                        <Button className="bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-white transition-all rounded-none px-12 py-6">LEARN MORE</Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
