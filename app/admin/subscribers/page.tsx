"use server";

import { getSubscribers, deleteSubscriber } from '@/lib/actions/subscriber';
import { Mail, Trash2, Calendar, UserPlus } from 'lucide-react';

export default async function SubscribersPage() {
    const subscribers = await getSubscribers();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Newsletter Subscribers</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage your mailing list and audience growth.</p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                        <UserPlus size={20} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white leading-none">{subscribers.length}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Total Subscribers</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Subscription Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-500 italic">
                                        No subscribers found yet.
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub: any) => (
                                    <tr key={sub._id} className="hover:bg-zinc-800/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-yellow-400 transition-colors">
                                                    <Mail size={14} />
                                                </div>
                                                <span className="text-sm font-medium text-zinc-200">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-zinc-400 text-xs">
                                                <Calendar size={12} />
                                                {new Date(sub.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'long', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <form action={async () => {
                                                "use server";
                                                await deleteSubscriber(sub._id);
                                            }}>
                                                <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
