'use client';

import { 
    Package, Users, ArrowUpRight, 
    Monitor, Cpu, Armchair, CreditCard
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-zinc-500 mt-1">Welcome back, {user?.name}.</p>
                </div>

                <Link href="/" className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2">
                    View Website <ArrowUpRight size={18} />
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Products</CardTitle>
                        <Package className="text-yellow-400" size={18} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-zinc-500 mt-1">+12 from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Users</CardTitle>
                        <Users className="text-yellow-400" size={18} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,450</div>
                        <p className="text-xs text-zinc-500 mt-1">+180 since last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Revenue</CardTitle>
                        <CreditCard className="text-yellow-400" size={18} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₨ 1.2M</div>
                        <p className="text-xs text-zinc-500 mt-1">+15% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <section className="mt-4">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/admin/products/gaming-gear" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                        <Cpu className="text-yellow-400 mb-2" size={24} />
                        <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Add Gear</h3>
                        <p className="text-zinc-500 text-xs">Peripherals & Accessories</p>
                    </Link>
                    <Link href="/admin/products/gaming-pc" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                        <Monitor className="text-yellow-400 mb-2" size={24} />
                        <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Add PC</h3>
                        <p className="text-zinc-500 text-xs">Desktops & Laptops</p>
                    </Link>
                    <Link href="/admin/products/gaming-furniture" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                        <Armchair className="text-yellow-400 mb-2" size={24} />
                        <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Add Furniture</h3>
                        <p className="text-zinc-500 text-xs">Chairs & Desks</p>
                    </Link>
                    <Link href="/admin/users" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                        <Users className="text-yellow-400 mb-2" size={24} />
                        <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Manage Users</h3>
                        <p className="text-zinc-500 text-xs">Customer Database</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
