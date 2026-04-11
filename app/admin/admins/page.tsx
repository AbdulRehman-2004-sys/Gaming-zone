'use client';

import React, { useEffect, useState } from 'react';
import { getAdmins, createAdmin, deleteUser } from '@/lib/actions/user';
import { Trash2, UserCheck, Shield, Mail, Calendar, Loader2, Plus, X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminsPage() {
    const [admins, setAdmins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const fetchAdmins = async () => {
        setLoading(true);
        const data = await getAdmins();
        setAdmins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this admin?")) return;

        try {
            const res = await deleteUser(id);
            if (res.success) {
                toast.success("Admin removed successfully");
                setAdmins(prev => prev.filter(u => u._id !== id));
            } else {
                toast.error(res.error || "Failed to remove admin");
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreateLoading(true);

        const formData = new FormData(e.currentTarget);
        try {
            const res = await createAdmin(formData);
            if (res.success) {
                toast.success("New admin created successfully");
                setShowAddForm(false);
                fetchAdmins();
            } else {
                toast.error(res.error || "Failed to create admin");
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Admin Users</h1>
                    <p className="text-zinc-500 mt-1">Manage users with administrative access to the dashboard.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-400/10"
                >
                    <Plus size={18} /> Add Admin
                </button>
            </header>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-yellow-400" size={40} />
                        <p className="text-zinc-500 animate-pulse">Fetching administrators...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-800/50 border-b border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Admin Name</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Permissions</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-zinc-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-yellow-400/10 rounded-full flex items-center justify-center text-yellow-400">
                                                    <Shield size={16} />
                                                </div>
                                                <span className="font-semibold text-zinc-200">{admin.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-bold uppercase rounded border border-yellow-400/20">Full Access</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Mail size={14} />
                                                <span className="text-sm">{admin.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(admin._id)}
                                                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                                title="Remove Admin"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Admin Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <UserCheck className="text-yellow-400" size={24} /> Add New Admin
                            </h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        <form onSubmit={handleCreateAdmin} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                                        placeholder="Admin Name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                                        placeholder="admin@gamingzone.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Initial Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                disabled={createLoading}
                                className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/10"
                            >
                                {createLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    'CREATE ADMIN ACCOUNT'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
