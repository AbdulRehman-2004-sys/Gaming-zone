"use client"

import { useState, useEffect } from "react"
import { 
    BookOpen, Search, Plus, Trash2, Edit2, ExternalLink, 
    CheckCircle2, AlertCircle, Loader2, Filter, X
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { getProducts, updateProduct } from "@/lib/actions/product"
import Image from "next/image"
import Link from "next/link"

export default function AdminGuides() {
    const [guides, setGuides] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [submitting, setSubmitting] = useState(false)

    // Form state for new/editing guide
    const [targetProduct, setTargetProduct] = useState(null)
    const [guideContent, setGuideContent] = useState("")

    const categories = ["All", "Gaming Gear", "Gaming PCs", "Gaming Furniture"]

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        const products = await getProducts()
        setAllProducts(products)
        setGuides(products.filter(p => p.isGuide))
        setLoading(false)
    }

    const handleAddGuide = async () => {
        if (!targetProduct) {
            toast.error("Please select a product")
            return
        }
        if (!guideContent.trim()) {
            toast.error("Please enter guide content")
            return
        }

        setSubmitting(true)
        try {
            const formData = new FormData()
            // Pull all existing data to not overwrite with nulls
            Object.keys(targetProduct).forEach(key => {
                if (key === 'specs') {
                    formData.set(key, JSON.stringify(targetProduct[key]))
                } else {
                    formData.set(key, targetProduct[key])
                }
            })
            
            formData.set("isGuide", "true")
            formData.set("guideContent", guideContent)

            const res = await updateProduct(targetProduct._id, formData)
            if (res.success) {
                toast.success("Guide created successfully!")
                setShowAddModal(false)
                setTargetProduct(null)
                setGuideContent("")
                fetchData()
            } else {
                toast.error(res.error || "Failed to create guide")
            }
        } catch (err) {
            toast.error("An error occurred")
        } finally {
            setSubmitting(false)
        }
    }

    const removeGuide = async (product) => {
        if (!confirm("Are you sure you want to remove this from guides?")) return

        try {
            const formData = new FormData()
            Object.keys(product).forEach(key => {
                 if (key === 'specs') {
                    formData.set(key, JSON.stringify(product[key]))
                } else {
                    formData.set(key, product[key])
                }
            })
            formData.set("isGuide", "false")
            
            const res = await updateProduct(product._id, formData)
            if (res.success) {
                toast.success("Guide removed")
                fetchData()
            }
        } catch (err) {
            toast.error("Failed to remove guide")
        }
    }

    const filteredForModal = allProducts
        .filter(p => !p.isGuide)
        .filter(p => selectedCategory === "All" || p.mainCategory === selectedCategory)
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-yellow-400" size={32} />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <BookOpen className="text-yellow-400" /> Guide Management
                    </h1>
                    <p className="text-zinc-500 mt-1">Manage featured buying guides and educational content.</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
                >
                    <Plus size={20} /> New Guide
                </button>
            </header>

            {guides.length === 0 ? (
                <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-20 text-center">
                    <BookOpen className="mx-auto text-zinc-700 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-zinc-400">No Guides Found</h3>
                    <p className="text-zinc-500 mt-2">Start by making a product a featured guide.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <Card key={guide._id} className="bg-zinc-900 border-zinc-800 group overflow-hidden">
                            <div className="aspect-video relative overflow-hidden">
                                <Image 
                                    src={guide.image} 
                                    alt={guide.name} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <Link href={`/guides`} className="text-white text-xs font-bold flex items-center gap-1 hover:text-yellow-400">
                                        View on Website <ExternalLink size={12} />
                                    </Link>
                                </div>
                                <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {guide.mainCategory}
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-white line-clamp-1 mb-2">{guide.name}</h3>
                                <p className="text-zinc-500 text-xs line-clamp-2 mb-4 h-8">{guide.guideContent}</p>
                                <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                        <CheckCircle2 size={12} className="text-green-500" /> Active Guide
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                setTargetProduct(guide)
                                                setGuideContent(guide.guideContent)
                                                setShowAddModal(true)
                                            }}
                                            className="p-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => removeGuide(guide)}
                                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {targetProduct ? 'Edit Guide' : 'Create New Guide'}
                            </h2>
                            <button onClick={() => {setShowAddModal(false); setTargetProduct(null)}} className="text-zinc-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </header>

                        <div className="p-6 overflow-y-auto space-y-6">
                            {!targetProduct ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                            <Input 
                                                placeholder="Search products to guide..." 
                                                className="pl-10 bg-zinc-950 border-zinc-800"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar min-w-fit">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                                        selectedCategory === cat ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {filteredForModal.map(p => (
                                            <button 
                                                key={p._id}
                                                onClick={() => setTargetProduct(p)}
                                                className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-yellow-400 transition-all text-left group"
                                            >
                                                <div className="w-10 h-10 bg-zinc-900 rounded-lg p-1 relative overflow-hidden">
                                                    <Image src={p.image} alt={p.name} fill className="object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-zinc-100 truncate">{p.name}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase">{p.category}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center gap-4 p-4 bg-zinc-950 rounded-2xl border border-yellow-400/20">
                                        <div className="w-16 h-16 bg-zinc-900 rounded-xl p-2 relative overflow-hidden shrink-0">
                                            <Image src={targetProduct.image} alt={targetProduct.name} fill className="object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{targetProduct.name}</h4>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{targetProduct.mainCategory} / {targetProduct.category}</p>
                                            <button onClick={() => setTargetProduct(null)} className="text-[10px] text-yellow-400 hover:underline mt-1">Change Product</button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Guide Content / Advice</label>
                                        <textarea 
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400 outline-none transition-all h-40"
                                            placeholder="Write your guide content or buying advice here..."
                                            value={guideContent}
                                            onChange={(e) => setGuideContent(e.target.value)}
                                        />
                                        <p className="text-[10px] text-zinc-600 pl-1 italic">This content will be shown on the main guides page as educational summary.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <footer className="p-6 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-900/50">
                            <button 
                                onClick={() => {setShowAddModal(false); setTargetProduct(null)}}
                                className="px-6 py-2.5 text-zinc-400 font-bold hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddGuide}
                                disabled={submitting || !targetProduct || !guideContent.trim()}
                                className="px-8 py-2.5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
                            >
                                {submitting ? <Loader2 className="animate-spin" size={18} /> : (targetProduct?.isGuide ? 'Update Guide' : 'Create Guide')}
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    )
}
