'use client';

import React from 'react';
import { 
    LayoutDashboard, Package, Settings, Users, 
    Monitor, Cpu, Armchair, BookOpen, CreditCard, UserCheck,
    LogOut, Menu, X
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext"
import { AdminLoginForm } from "@/components/admin/AdminLoginForm"
import { logout } from "@/lib/actions/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user || user.role !== 'admin') {
        return <AdminLoginForm />;
    }

    const handleLogout = async () => {
        await logout();
        window.location.href = '/admin';
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, category: 'Overview' },
        { label: 'Gaming Gear', href: '/admin/products/gaming-gear', icon: Cpu, category: 'Inventory' },
        { label: 'Gaming PCs', href: '/admin/products/gaming-pc', icon: Monitor },
        { label: 'Furniture', href: '/admin/products/gaming-furniture', icon: Armchair },
        { label: 'Customers', href: '/admin/users', icon: Users, category: 'Management' },
        { label: 'Admin Users', href: '/admin/admins', icon: UserCheck },
        { label: 'Guides', href: '/admin/guides', icon: BookOpen },
        { label: 'Payment', href: '/admin/settings/payment', icon: CreditCard, category: 'System' },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 border-r border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-8 z-50 transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:bg-zinc-900/50
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center text-black font-bold">C</div>
                        <span className="font-bold text-xl tracking-tight uppercase">Dashboard</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar pr-2">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const CategoryHeader = item.category ? (
                            <div key={`header-${index}`} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-6 mb-2 px-3 first:mt-0">
                                {item.category}
                            </div>
                        ) : null;

                        return (
                            <React.Fragment key={item.href}>
                                {CategoryHeader}
                                <Link 
                                    href={item.href} 
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                                        isActive 
                                        ? 'bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-400/10' 
                                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                                    } ${item.isSub ? 'pl-8' : ''}`}
                                >
                                    <item.icon size={item.isSub ? 16 : 18} className={isActive ? 'text-black' : 'text-zinc-500'} />
                                    <span className={item.isSub ? 'text-sm' : ''}>{item.label}</span>
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </nav>

                <div className="pt-4 mt-auto border-t border-zinc-800 pr-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-3 py-2.5 text-zinc-400 border border-zinc-800 bg-zinc-950/50 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 rounded-xl transition-all cursor-pointer font-semibold shadow-md"
                    >
                        <LogOut size={18} />
                        <span>S I G N O U T</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header Toggle */}
                <header className="h-16 border-b border-zinc-800 flex items-center px-4 lg:hidden bg-zinc-900/50 sticky top-0 z-30">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-sm text-yellow-400">Admin Panel</span>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
