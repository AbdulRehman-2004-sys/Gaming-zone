import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatProduct(product: any) {
    const specsObj: Record<string, string> = {};
    const specsArray: string[] = [];
    
    if (Array.isArray(product.specs)) {
        product.specs.forEach((s: string) => {
            const [k, v] = s.split(': ');
            if (k && v) {
                specsObj[k] = v;
                specsArray.push(v);
            } else {
                specsArray.push(s);
            }
        });
    } else if (product.specs && typeof product.specs === 'object') {
        Object.entries(product.specs).forEach(([k, v]) => {
            specsObj[k] = String(v);
            specsArray.push(String(v));
        });
    }

    return {
        ...product,
        id: product._id || product.id,
        price: typeof product.price === 'number' 
            ? `Rs. ${product.price.toLocaleString()}` 
            : product.price,
        specs: specsObj,
        specsArray: specsArray.length > 0 ? specsArray : undefined
    };
}
