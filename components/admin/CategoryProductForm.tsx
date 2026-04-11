'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from "@/components/ui/input";
import { CATEGORY_MAP } from "@/lib/categories";
import { createProduct } from "@/lib/actions/product";
import { useRouter } from 'next/navigation';
import { Loader2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
    mainCategory: string;
}

export function CategoryProductForm({ mainCategory }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState(Object.keys(CATEGORY_MAP[mainCategory] || {})[0]);
    const [specs, setSpecs] = useState<Record<string, string>>({});
    const [isGuide, setIsGuide] = useState(false);

    const handleSpecChange = (name: string, value: string) => {
        setSpecs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const uploadFormData = new FormData();
        if (file) {
            uploadFormData.set('file', file);
        }

        try {
            // 1. Upload Image
            let imageUrl = "";
            if (file) {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData.message);
                imageUrl = uploadData.url;
            } else {
                throw new Error("Product image is required");
            }

            // 2. Create Product
            const productFormData = new FormData();
            productFormData.append('name', formData.get('name') as string);
            productFormData.append('price', formData.get('price') as string);
            productFormData.append('mainCategory', mainCategory);
            productFormData.append('category', category);
            productFormData.append('image', imageUrl);
            productFormData.append('badge', formData.get('badge') as string);
            productFormData.append('description', formData.get('description') as string);
            productFormData.append('isFeatured', formData.get('isFeatured') === 'on' ? 'true' : 'false');
            productFormData.append('isGuide', isGuide ? 'true' : 'false');
            productFormData.append('guideContent', formData.get('guideContent') as string);

            // Send specs as filtered object
            const filteredSpecs = Object.fromEntries(
                Object.entries(specs).filter(([_, v]) => v && v.trim() !== '')
            );
            productFormData.append('specs', JSON.stringify(filteredSpecs));

            const result = await createProduct(productFormData);

            if (result.success) {
                toast.success('Product created successfully!');
                router.push('/admin/products');
                router.refresh();
            } else {
                toast.error(result.error || 'Failed to create product');
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Link 
                href="/admin/products" 
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-4"
            >
                <ArrowLeft size={16} /> Back to All Products
            </Link>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <header className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <h2 className="text-xl font-bold italic text-yellow-400 uppercase tracking-tighter">Add {mainCategory} Product</h2>
                    <p className="text-zinc-500 text-sm">Fill in the technical specifications for {mainCategory.toLowerCase()}.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Product Name</label>
                                <Input
                                    name="name"
                                    placeholder="e.g. DARK CORE RGB PRO"
                                    className="bg-zinc-950 border-zinc-800 h-12 text-white"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Price (₨)</label>
                                <Input
                                    name="price"
                                    type="number"
                                    placeholder="22,397"
                                    className="bg-zinc-950 border-zinc-800 h-12 text-white"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Sub Category</label>
                                <select
                                    name="category"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSpecs({}); 
                                    }}
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-yellow-400 h-12 text-sm appearance-none"
                                    required
                                >
                                    {Object.keys(CATEGORY_MAP[mainCategory] || {}).map((c: string) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4 text-white">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Image</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        required
                                    />
                                    <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-2 group-hover:border-yellow-400/50 transition-all bg-zinc-950/50">
                                        <Plus className="text-zinc-500 group-hover:text-yellow-400 transition-colors" size={32} />
                                        <span className="text-xs text-zinc-500">{file ? file.name : 'Upload Product Photo'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Badge (Optional)</label>
                                <Input
                                    name="badge"
                                    placeholder="e.g. New, Bestseller"
                                    className="bg-zinc-950 border-zinc-800 h-12 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase text-white">Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-yellow-400 outline-none transition-all"
                            placeholder="Provide a detailed description of the product..."
                            required
                        />
                    </div>

                    {/* Dynamic Specs */}
                    <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-6">
                        <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Technical Specifications: {category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(CATEGORY_MAP[mainCategory]?.[category] || []).map((spec: string) => (
                                <div key={spec} className="flex flex-col gap-2">
                                    <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{spec}</label>
                                    <Input
                                        value={specs[spec] || ""}
                                        onChange={(e) => handleSpecChange(spec, e.target.value)}
                                        placeholder={`Enter ${spec.toLowerCase()}...`}
                                        className="bg-zinc-900 border-zinc-800 h-10 text-xs text-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guides & Features Section */}
                    <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-6">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Guide & Promotion</h3>
                                <p className="text-[10px] text-zinc-500">Configure how this product appears on special pages.</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        name="isFeatured"
                                        className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-yellow-400 focus:ring-yellow-400"
                                    />
                                    <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">Featured</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        checked={isGuide}
                                        onChange={(e) => setIsGuide(e.target.checked)}
                                        className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-yellow-400 focus:ring-yellow-400"
                                    />
                                    <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">Add to Guides</span>
                                </label>
                            </div>
                         </div>

                        {isGuide && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Guide Content/Instructions</label>
                                <textarea
                                    name="guideContent"
                                    rows={4}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-yellow-400 outline-none transition-all"
                                    placeholder="Write the guide/review content here..."
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-all uppercase tracking-widest text-sm shadow-xl shadow-yellow-400/10 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Creating Product...
                            </>
                        ) : (
                            'Create and Save Product'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
