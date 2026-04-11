'use client';

import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '@/lib/actions/user';
import { Trash2, Search, User, Mail, Calendar, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const res = await deleteUser(id);
            if (res.success) {
                toast.success("User deleted successfully");
                setUsers(prev => prev.filter(u => u._id !== id));
            } else {
                toast.error(res.error || "Failed to delete user");
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-zinc-500 mt-1">View and manage registered front-end users.</p>
            </header>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                    type="text"
                    placeholder="Search customers by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                />
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-yellow-400" size={40} />
                        <p className="text-zinc-500 animate-pulse">Fetching customers...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-20 text-center text-zinc-500">
                        No customers found matching your search.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-zinc-800/50 border-b border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Joined On</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-zinc-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-400">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-semibold text-zinc-200">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Mail size={14} />
                                                <span>{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Calendar size={14} />
                                                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                                title="Delete User"
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
        </div>
    );
}
