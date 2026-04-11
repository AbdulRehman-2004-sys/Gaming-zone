'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Banknote, ShieldCheck, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { getSettings, updatePaymentSettings } from "@/lib/actions/settings";

export default function PaymentSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [settings, setSettings] = useState({
        cod: { enabled: true, title: "Cash on Delivery", description: "Pay when you receive your order." },
        bank: { enabled: false, title: "Bank Transfer", description: "Transfer directly to our bank account.", details: "" },
        stripe: { enabled: false, title: "Credit/Debit Card (Stripe)", description: "Secure payment via Stripe.", publishableKey: "", secretKey: "" }
    });

    useEffect(() => {
        async function loadSettings() {
            const data = await getSettings();
            if (data?.paymentMethods) {
                setSettings(data.paymentMethods);
            }
            setInitialLoading(false);
        }
        loadSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await updatePaymentSettings(settings);
            if (res.success) {
                toast.success("Payment settings updated successfully");
            } else {
                toast.error(res.error || "Failed to update settings");
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-yellow-400" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white">Payment Settings</h1>
                <p className="text-zinc-500 mt-1">Configure your store's accepted payment methods and gateways.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* COD Section */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                                    <Banknote size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{settings.cod.title}</h3>
                                    <p className="text-xs text-zinc-500">{settings.cod.description}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={settings.cod.enabled}
                                    onChange={(e) => setSettings({...settings, cod: {...settings.cod, enabled: e.target.checked}})}
                                />
                                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                            </label>
                        </div>
                    </div>

                    {/* Bank Transfer Section */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{settings.bank.title}</h3>
                                    <p className="text-xs text-zinc-500">{settings.bank.description}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.bank.enabled}
                                    onChange={(e) => setSettings({...settings, bank: {...settings.bank, enabled: e.target.checked}})}
                                />
                                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                            </label>
                        </div>
                        {settings.bank.enabled && (
                             <div className="pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2">
                                <textarea 
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-yellow-400 outline-none"
                                    placeholder="Enter bank account details, IBAN, and instructions..."
                                    rows={3}
                                    value={settings.bank.details}
                                    onChange={(e) => setSettings({...settings, bank: {...settings.bank, details: e.target.value}})}
                                />
                             </div>
                        )}
                    </div>

                    {/* Stripe Section */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{settings.stripe.title}</h3>
                                    <p className="text-xs text-zinc-500">{settings.stripe.description}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.stripe.enabled}
                                    onChange={(e) => setSettings({...settings, stripe: {...settings.stripe, enabled: e.target.checked}})}
                                />
                                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                            </label>
                        </div>
                        {settings.stripe.enabled && (
                             <div className="pt-4 border-t border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Publishable Key</label>
                                        <input 
                                            type="text"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                                            placeholder="pk_test_••••••••••••••••••••••••"
                                            value={settings.stripe.publishableKey}
                                            onChange={(e) => setSettings({...settings, stripe: {...settings.stripe, publishableKey: e.target.value}})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Secret Key</label>
                                        <input 
                                            type="password"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
                                            placeholder="sk_test_••••••••••••••••••••••••"
                                            value={settings.stripe.secretKey}
                                            onChange={(e) => setSettings({...settings, stripe: {...settings.stripe, secretKey: e.target.value}})}
                                        />
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 sticky top-24">
                        <h3 className="font-bold text-white border-b border-zinc-800 pb-4">Configuration Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500">Active Methods</span>
                                <span className="text-yellow-400 font-bold">
                                    {[settings.cod.enabled && 'COD', settings.bank.enabled && 'Bank', settings.stripe.enabled && 'Stripe'].filter(Boolean).length}
                                </span>
                            </div>
                        </div>

                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/10 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> SAVE SETTINGS</>}
                        </button>

                        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex items-start gap-3">
                            <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                            <p className="text-[10px] text-zinc-500 leading-relaxed">
                                Ensure your account details are correct to avoid payment delays or transaction failures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
