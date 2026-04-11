"use client"

import React, { useState, useEffect } from 'react';
import { 
    Plus, Search, Filter, Edit2, Trash2, 
    Loader2, Package, Armchair, ArrowLeft, ChevronDown, Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import Image from "next/image";
import Link from "next/link";
import { CategoryProductForm } from "@/components/admin/CategoryProductForm";
import { getProducts, deleteProduct } from "@/lib/actions/product";
import { CATEGORY_MAP } from "@/lib/categories";

export default function GamingFurniturePage() {
    const mainCategory = "Gaming Furniture";
    const subCategories = ["All", ...Object.keys(CATEGORY_MAP[mainCategory] || {})];

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        try {
            const data = await getProducts();
            const filtered = data.filter((p: any) => p.mainCategory === mainCategory);
            setProducts(filtered);
        } catch (error) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await deleteProduct(id);
            if (res.success) {
                toast.success("Product deleted successfully");
                setProducts(prev => prev.filter(p => p._id !== id));
            } else {
                toast.error(res.error || "Failed to delete");
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setShowFormModal(true);
    };

    const handleSuccess = () => {
        setShowFormModal(false);
        setEditingProduct(null);
        loadProducts();
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedSubCategory === "All" || p.category === selectedSubCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Armchair className="text-yellow-400" /> {mainCategory}
                    </h1>
                    <p className="text-zinc-500 mt-1">Manage premium {mainCategory.toLowerCase()} and setups.</p>
                </div>
                <button 
                    onClick={() => {
                        setEditingProduct(null);
                        setShowFormModal(true);
                    }}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
                >
                    <Plus size={20} /> Add Furniture
                </button>
            </header>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <Input
                        placeholder="Search furniture..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-yellow-400 ring-0 h-12 rounded-xl"
                    />
                </div>
                
                <div className="relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`px-6 h-12 border rounded-xl transition-all flex items-center gap-3 min-w-[160px] justify-between ${
                            selectedSubCategory !== "All" 
                            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Filter size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">
                                {selectedSubCategory === "All" ? "Filter" : selectedSubCategory}
                            </span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isFilterOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                            <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-20 overflow-hidden py-2 animate-in zoom-in-95 duration-200">
                                {subCategories.map((sub) => (
                                    <button
                                        key={sub}
                                        onClick={() => {
                                            setSelectedSubCategory(sub);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                                            selectedSubCategory === sub 
                                            ? 'text-yellow-400 bg-yellow-400/5' 
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                        }`}
                                    >
                                        <span className="font-medium">{sub}</span>
                                        {selectedSubCategory === sub && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4">
                    <Loader2 className="animate-spin text-yellow-400" size={40} />
                    <p className="font-medium animate-pulse">Loading {mainCategory.toLowerCase()}...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-20 text-center">
                    <Package className="mx-auto text-zinc-700 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-zinc-400">No {mainCategory} Found</h3>
                    <p className="text-zinc-500 mt-2">Design your ideal workspace starting with the first item.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product._id} className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-yellow-400/30 transition-all duration-300 shadow-xl">
                            <div className="aspect-square relative overflow-hidden bg-zinc-950">
                                <Image
                                    src={product.image || "/placeholder.png"}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                />
                                {product.badge && (
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                        {product.badge}
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-5">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-2">{product.category}</div>
                                <h3 className="font-bold text-white text-lg line-clamp-1 mb-4">{product.name}</h3>
                                
                                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">Price</p>
                                        <span className="text-xl font-black text-white italic">Rs. {Number(product.price).toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-2.5 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all"
                                            title="Edit Product"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-4xl my-auto">
                        <CategoryProductForm 
                            mainCategory={mainCategory}
                            initialData={editingProduct}
                            onSuccess={handleSuccess}
                            onCancel={() => {
                                setShowFormModal(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
