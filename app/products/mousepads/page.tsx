import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Mousepads | Drop Zone',
  description: 'Premium gaming mousepads with optimized surfaces for precision and control. Large formats for competitive gaming.',
};

export default async function MousepadsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Mousepads' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Mousepads',
            subtitle: 'Latest additions to our gaming mousepad collection',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING MOUSEPADS"
                    productDescription="Optimized surfaces for maximum precision. From compact tracking pads to massive full-desk RGB surfaces."
                    heroImage="/new-images/gaming-gear/mousepad.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
