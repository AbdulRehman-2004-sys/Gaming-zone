"use server";

import { getInquiries, markAsRead, deleteInquiry } from '@/lib/actions/inquiry';
import { Mail, Trash2, Calendar, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export default async function InquiriesPage() {
    const inquiries = await getInquiries();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Support Inquiries</h1>
                    <p className="text-zinc-500 text-sm mt-1">Review and manage customer support messages.</p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white leading-none">{inquiries.length}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Total Inquiries</p>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="grid gap-6">
                {inquiries.length === 0 ? (
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-20 text-center">
                        <p className="text-zinc-500 italic">No support inquiries yet.</p>
                    </div>
                ) : (
                    inquiries.map((inquiry: any) => (
                        <div key={inquiry._id} className={`group relative bg-zinc-900/50 border ${inquiry.status === 'unread' ? 'border-yellow-400/30' : 'border-zinc-800'} rounded-3xl p-6 md:p-8 backdrop-blur-sm transition-all hover:bg-zinc-900`}>
                            {inquiry.status === 'unread' && (
                                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2 py-0.5 bg-yellow-400/10 text-yellow-400 rounded-full">
                                    <Clock size={10} className="animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">New</span>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight">{inquiry.subject}</h3>
                                            <p className="text-sm text-zinc-400 font-medium">
                                                From: {inquiry.name} <span className="text-zinc-600 text-xs ml-1 font-normal">({inquiry.email})</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {inquiry.message}
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-yellow-400/50" />
                                            {new Date(inquiry.createdAt).toLocaleString('en-US')}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 size={12} className={inquiry.status === 'read' ? 'text-green-500' : 'text-zinc-700'} />
                                            Status: {inquiry.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2">
                                    {inquiry.status === 'unread' && (
                                        <form action={markAsRead.bind(null, inquiry._id)}>
                                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-yellow-300 transition-all">
                                                <CheckCircle2 size={14} />
                                                <span>Mark Read</span>
                                            </button>
                                        </form>
                                    )}
                                    <form action={deleteInquiry.bind(null, inquiry._id)}>
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-all">
                                            <Trash2 size={14} />
                                            <span>Delete</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
