"use client"

import { useState } from "react"
import {
    Plus, Search, Filter, MoreVertical, Edit2, Trash2, X,
    LayoutDashboard, Package, Settings, Cpu, Monitor, Armchair,
    Users, BookOpen, UserCheck, CreditCard
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

import { toast } from 'react-toastify';
import { createProduct, getProducts, deleteProduct, updateProduct } from "@/lib/actions/product";
import { useEffect } from "react";

import { CATEGORY_MAP, MAIN_CATEGORIES } from "@/lib/categories";

export default function AdminProducts() {
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [mainCategory, setMainCategory] = useState("Gaming Gear")
    const [category, setCategory] = useState("Mice")
    const [specs, setSpecs] = useState<Record<string, string>>({})
    const [products, setProducts] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [editingProduct, setEditingProduct] = useState<any | null>(null)

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts()
            setProducts(data)
        }
        loadProducts()
    }, [showAddForm, editingProduct])

    const handleSpecChange = (name: string, value: string) => {
        setSpecs(prev => ({ ...prev, [name]: value }))
    }

    const startEditing = (product: any) => {
        setEditingProduct(product)
        setMainCategory(product.mainCategory || "Gaming Gear")
        setCategory(product.category)

        // Handle specs (could be array from old data or object from new)
        let specsObj: Record<string, string> = {}
        if (Array.isArray(product.specs)) {
            product.specs.forEach((s: string) => {
                const [k, v] = s.split(': ')
                if (k && v) specsObj[k] = v
            })
        } else if (product.specs && typeof product.specs === 'object') {
            specsObj = { ...product.specs }
        }
        setSpecs(specsObj)
        setShowAddForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return

        try {
            const res = await deleteProduct(id)
            if (res.success) {
                toast.success("Product deleted successfully")
                setProducts(prev => prev.filter(p => p._id !== id))
            } else {
                toast.error(res.error || "Failed to delete")
            }
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const originalFormData = new FormData(e.currentTarget)
        const uploadFormData = new FormData()
        if (file) {
            uploadFormData.set('file', file)
        }

        try {
            // 1. Upload Image (only if NEW file selected)
            let imageUrl = editingProduct?.image || ""
            if (file) {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                })
                const uploadData = await uploadRes.json()
                if (!uploadRes.ok) throw new Error(uploadData.message)
                imageUrl = uploadData.url
            }

            // 2. Create Product via Server Action
            const productFormData = new FormData()
            productFormData.append('name', originalFormData.get('name') as string)
            productFormData.append('price', originalFormData.get('price') as string)
            productFormData.append('mainCategory', mainCategory)
            productFormData.append('category', category)
            productFormData.append('image', imageUrl)
            productFormData.append('badge', originalFormData.get('badge') as string)
            productFormData.append('description', originalFormData.get('description') as string)
            productFormData.append('isFeatured', originalFormData.get('isFeatured') === 'on' ? 'true' : 'false')

            // Send specs as filtered object
            const filteredSpecs = Object.fromEntries(
                Object.entries(specs).filter(([_, v]) => v && v.trim() !== '')
            )
            productFormData.append('specs', JSON.stringify(filteredSpecs))

            const result = editingProduct
                ? await updateProduct(editingProduct._id, productFormData)
                : await createProduct(productFormData)

            if (result.success) {
                toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!')
                setShowAddForm(false)
                setEditingProduct(null)
                setSpecs({})
                setFile(null)
            } else {
                toast.error(result.error || 'Failed to create product')
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
                    <p className="text-zinc-500 mt-1">Manage your storefront's product catalog and add new items by category.</p>
                </div>
            </header>

            {/* Category Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/products/gaming-gear" className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-yellow-400/50 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                            <Cpu size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Gaming Gear</h3>
                            <p className="text-[10px] text-zinc-500">Add Mice, Keyboards, etc.</p>
                        </div>
                    </div>
                </Link>
                <Link href="/admin/products/gaming-pc" className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-yellow-400/50 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                            <Monitor size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Gaming PCs</h3>
                            <p className="text-[10px] text-zinc-500">Add Desktops, Laptops, etc.</p>
                        </div>
                    </div>
                </Link>
                <Link href="/admin/products/gaming-furniture" className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 hover:border-yellow-400/50 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                            <Armchair size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Gaming Furniture</h3>
                            <p className="text-[10px] text-zinc-500">Add Chairs, Desks, etc.</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-yellow-400 ring-0"
                    />
                </div>
                <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all flex items-center gap-2">
                    <Filter size={18} /> Filter
                </button>
            </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.filter(p =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((product) => (
                            <Card key={product._id || product.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
                                <div className="aspect-square relative overflow-hidden bg-zinc-800">
                                    <Image
                                        src={product.image || "/placeholder.png"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <button className="p-1.5 bg-zinc-950/50 backdrop-blur-md rounded-md text-zinc-200 hover:text-white transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                    {product.badge && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-[10px] font-bold uppercase rounded">
                                            {product.badge}
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-1">{product.category}</div>
                                    <h3 className="font-bold text-zinc-100 line-clamp-1 mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-bold text-zinc-100">Rs. {product.price}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEditing(product)}
                                                className="p-2 text-zinc-400 hover:text-yellow-400 transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Add Product Modal */}
                    {showAddForm && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                        <header className="p-6 border-b border-zinc-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button
                                onClick={() => {
                                    setShowAddForm(false)
                                    setEditingProduct(null)
                                    setSpecs({})
                                }}
                                className="text-zinc-500 hover:text-zinc-100"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Product Name</label>
                                    <Input
                                        name="name"
                                        defaultValue={editingProduct?.name}
                                        placeholder="e.g. DARK CORE RGB PRO"
                                        className="bg-zinc-950 border-zinc-800"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Price (Rs.)</label>
                                    <Input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        defaultValue={editingProduct?.price}
                                        placeholder="22,397"
                                        className="bg-zinc-950 border-zinc-800"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Main Category</label>
                                    <select
                                        name="mainCategory"
                                        value={mainCategory}
                                        onChange={(e) => {
                                            const newMain = e.target.value;
                                            setMainCategory(newMain);
                                            // Set first sub-category of the new main category
                                            const firstSub = Object.keys(CATEGORY_MAP[newMain])[0];
                                            setCategory(firstSub);
                                            setSpecs({}); 
                                        }}
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-100 outline-none focus:border-yellow-400 h-10 text-sm"
                                        required
                                    >
                                        {MAIN_CATEGORIES.map((c: string) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Sub Category</label>
                                    <select
                                        name="category"
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value)
                                            setSpecs({}) 
                                        }}
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-zinc-100 outline-none focus:border-yellow-400 h-10 text-sm"
                                        required
                                    >
                                        {Object.keys(CATEGORY_MAP[mainCategory] || {}).map((c: string) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Badge (Optional)</label>
                                    <Input
                                        name="badge"
                                        defaultValue={editingProduct?.badge}
                                        placeholder="e.g. New, Bestseller"
                                        className="bg-zinc-950 border-zinc-800"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Description</label>
                                <textarea
                                    name="description"
                                    rows={2}
                                    defaultValue={editingProduct?.description}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:border-yellow-400 outline-none"
                                    placeholder="Brief product overview..."
                                    required
                                />
                            </div>

                            {/* Dynamic Specs Section */}
                            <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl flex flex-col gap-4">
                                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest pl-1">Technical Specifications ({category})</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CATEGORY_MAP[mainCategory]?.[category]?.map((spec: string) => (
                                        <div key={spec} className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-medium text-zinc-500 uppercase">{spec}</label>
                                            <Input
                                                value={specs[spec] || ""}
                                                onChange={(e) => handleSpecChange(spec, e.target.value)}
                                                placeholder={`Enter ${spec.toLowerCase()}...`}
                                                className="bg-zinc-900 border-zinc-800 h-9 text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[10px]">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                                    required={!editingProduct}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    id="isFeatured"
                                    defaultChecked={editingProduct?.isFeatured}
                                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-yellow-400"
                                />
                                <label htmlFor="isFeatured" className="text-sm text-zinc-400">Feature this product on homepage</label>
                            </div>

                            <button
                                disabled={loading}
                                className="mt-2 w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-all uppercase tracking-widest text-sm"
                            >
                                {loading ? 'Saving Product...' : (editingProduct ? 'Update Product' : 'Create Product')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
