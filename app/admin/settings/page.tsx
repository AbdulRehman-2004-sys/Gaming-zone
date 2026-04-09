"use client"

import { useState, useEffect } from "react"
import {
    LayoutDashboard, Package, Settings as SettingsIcon, Save, Upload, Globe
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "react-toastify"
import { updateSettings, getSettings } from "@/lib/actions/settings"

export default function AdminSettings() {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [file, setFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        siteTitle: "",
        siteLogo: "",
        primaryColor: "#facc15", // yellow-400
        footerText: "",
        contactEmail: "",
    })

    useEffect(() => {
        async function loadSettings() {
            const settings = await getSettings()
            if (settings) {
                setFormData({
                    siteTitle: settings.siteTitle || "",
                    siteLogo: settings.siteLogo || "",
                    primaryColor: settings.primaryColor || "#facc15",
                    footerText: settings.footerText || "",
                    contactEmail: settings.contactEmail || "",
                })
            }
            setInitialLoading(false)
        }
        loadSettings()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let logoUrl = formData.siteLogo

            // 1. Upload new logo if selected
            if (file) {
                const uploadFormData = new FormData()
                uploadFormData.set('file', file)
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                })
                const uploadData = await uploadRes.json()
                if (!uploadRes.ok) throw new Error(uploadData.message)
                logoUrl = uploadData.url
            }

            // 2. Update Settings
            const settingsFormData = new FormData()
            settingsFormData.append('siteTitle', formData.siteTitle)
            settingsFormData.append('siteLogo', logoUrl)
            settingsFormData.append('primaryColor', formData.primaryColor)
            settingsFormData.append('footerText', formData.footerText)
            settingsFormData.append('contactEmail', formData.contactEmail)

            const result = await updateSettings(settingsFormData)

            if (result.success) {
                toast.success('Settings updated successfully!')
            } else {
                toast.error(result.error || 'Failed to update settings')
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center text-black font-bold">C</div>
                    <span className="font-bold text-xl tracking-tight">ADMIN</span>
                </div>
                <nav className="flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-all">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-all">
                        <Package size={20} />
                        <span className="font-medium">Products</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 bg-zinc-800 rounded-lg text-yellow-400 transition-colors">
                        <SettingsIcon size={20} />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <header className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                            <p className="text-zinc-500 mt-1">Configure your store's global appearance and contact info.</p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div> : <Save size={18} />}
                            Save Changes
                        </button>
                    </header>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Branding Section */}
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardContent className="p-6 flex flex-col gap-6">
                                <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-wider text-sm">
                                    <Globe size={16} /> Branding
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400">Site Title</label>
                                    <Input
                                        name="siteTitle"
                                        value={formData.siteTitle}
                                        onChange={handleChange}
                                        className="bg-zinc-950 border-zinc-800 focus:border-yellow-400"
                                        placeholder="e.g. CORSAIR Official Store"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400">Site Logo</label>
                                    <div className="flex items-center gap-4">
                                        {formData.siteLogo && (
                                            <div className="w-12 h-12 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center p-2">
                                                <img src={formData.siteLogo} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                                            </div>
                                        )}
                                        <label className="flex-1 cursor-pointer bg-zinc-950 border border-zinc-800 border-dashed rounded-lg p-4 hover:border-yellow-400/50 transition-all text-center">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            />
                                            <Upload className="mx-auto text-zinc-500 mb-1" size={20} />
                                            <span className="text-xs text-zinc-500">{file ? file.name : "Click to upload new logo"}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400">Primary Color</label>
                                    <div className="flex gap-3 items-center">
                                        <Input
                                            type="color"
                                            name="primaryColor"
                                            value={formData.primaryColor}
                                            onChange={handleChange}
                                            className="w-12 h-12 p-1 bg-zinc-950 border-zinc-800 rounded-md cursor-pointer"
                                        />
                                        <Input
                                            name="primaryColor"
                                            value={formData.primaryColor}
                                            onChange={handleChange}
                                            className="flex-1 bg-zinc-950 border-zinc-800 focus:border-yellow-400"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content & Contact Section */}
                        <Card className="bg-zinc-900 border-zinc-800 h-full">
                            <CardContent className="p-6 flex flex-col gap-6">
                                <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-wider text-sm">
                                    Contact & Info
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400">Contact Email</label>
                                    <Input
                                        name="contactEmail"
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        className="bg-zinc-950 border-zinc-800 focus:border-yellow-400"
                                        placeholder="support@corsair.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-zinc-400">Footer Text</label>
                                    <textarea
                                        name="footerText"
                                        rows={4}
                                        value={formData.footerText}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-sm focus:border-yellow-400 outline-none transition-all"
                                        placeholder="© 2024 CORSAIR. All rights reserved."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </main>
        </div>
    )
}
