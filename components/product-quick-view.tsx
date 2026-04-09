'use client';
import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export interface QuickViewProduct {
    id: number | string;
    name: string;
    description: string;
    image: string;
    price?: string;
    specs?: string[] | Record<string, string | number | undefined>;
    category: string;
}

interface ProductQuickViewProps {
    product: QuickViewProduct | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    const [isClosing, setIsClosing] = useState(false);
    const { user } = useAuth();
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300); // Wait for animation
    };

    const handleAddToCart = () => {
        if (!user) {
            toast.info('Please sign in to add items to your cart');
            router.push('/signin');
            return;
        }

        if (product) {
            addToCart(product);
            handleClose();
        }
    };

    if (!isOpen && !isClosing) return null;

    if (!product) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative bg-gray-900 border border-yellow-400/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl flex flex-col md:flex-row ${isClosing ? 'animate-out zoom-out-95 duration-300' : 'animate-in zoom-in-95 duration-300'}`}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-yellow-400 transition-colors bg-black/50 p-2 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Product Image */}
                <div className="w-full md:w-1/2 relative bg-black aspect-square md:aspect-auto">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-gray-900">
                    <div className="mb-2">
                        <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider px-2 py-1 bg-yellow-400/10 rounded">
                            {product.category}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {product.name}
                    </h2>

                    <div className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">
                        {product.price || 'Check Price'}
                    </div>

                    <div className="prose prose-invert prose-sm mb-6 flex-grow">
                        <p className="text-gray-300 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Specs */}
                    {product.specs && (
                        <div className="mb-8 p-4 bg-black/40 rounded border border-gray-800">
                            <h3 className="text-sm font-bold text-white uppercase mb-3">Specifications</h3>
                            <ul className="space-y-2">
                                {Array.isArray(product.specs) ? (
                                    product.specs.map((spec, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                            <span>{spec}</span>
                                        </li>
                                    ))
                                ) : (
                                    Object.entries(product.specs).map(([key, value]) => (
                                        <li key={key} className="flex items-center justify-between text-sm border-b border-gray-800/50 pb-1 last:border-0 last:pb-0">
                                            <span className="text-gray-500 uppercase text-xs font-semibold">{key}</span>
                                            <span className="text-gray-300">{value}</span>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto space-y-3">
                        <Button 
                            onClick={handleAddToCart}
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-6 text-lg uppercase tracking-wider"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white py-6 uppercase tracking-wider"
                            onClick={handleClose}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
