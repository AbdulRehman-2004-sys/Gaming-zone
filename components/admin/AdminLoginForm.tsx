'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export function AdminLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, source: 'admin' }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.user && data.user.role === 'admin') {
                    toast.success('Welcome back, Admin!');
                    window.location.href = '/admin'; // Full reload to initialize auth context globally
                } else {
                    toast.error('Access denied. Admin only.');
                }
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4">
                            <Lock className="text-black" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight italic">ADMIN PORTAL</h1>
                        <p className="text-zinc-500">Please sign in to access the control panel</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400 text-white pl-10 pr-4 py-3 rounded-xl transition-all outline-none"
                                        placeholder="admin@gamingzone.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400 text-white pl-10 pr-4 py-3 rounded-xl transition-all outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-yellow-400 focus:ring-yellow-400 transition-all cursor-pointer"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Remember Me</span>
                            </label>
                            <a href="#" className="text-sm text-yellow-400 hover:text-yellow-300 font-medium hovre:underline">Forgot?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    SIGN IN TO DASHBOARD
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-sm text-zinc-500">
                            Back to <a href="/" className="text-zinc-300 hover:text-white underline">Web Store</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
