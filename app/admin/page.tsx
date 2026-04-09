import { LayoutDashboard, Package, Settings, Users, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center text-black font-bold">C</div>
                    <span className="font-bold text-xl tracking-tight">ADMIN</span>
                </div>

                <nav className="flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-zinc-800 rounded-lg text-yellow-400 transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-all">
                        <Package size={20} />
                        <span className="font-medium">Products</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-all">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    <header className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                            <p className="text-zinc-500 mt-1">Welcome back, Admin.</p>
                        </div>

                        <Link href="/" className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2">
                            View Website <ArrowUpRight size={18} />
                        </Link>

                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    </div>

                    <section className="mt-4">
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/admin/products" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Manage Products</h3>
                                <p className="text-zinc-500 text-sm">Add, edit or remove products from your catalog.</p>
                            </Link>
                            <Link href="/admin/settings" className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-yellow-400/50 transition-all group">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">Site Settings</h3>
                                <p className="text-zinc-500 text-sm">Update site branding, colors, and metadata.</p>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
