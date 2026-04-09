import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Mice | Drop Zone',
  description: 'Explore our premium gaming mice collection. High-precision sensors and ergonomic designs for competitive gaming.',
};

export default async function MicePage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Mice' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Mice',
            subtitle: 'Explore our collection of high-performance gaming mice',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING MICE"
                    productDescription="Engineered for precision and speed. From lightweight wired options to zero-latency wireless powerhouses."
                    heroImage="/new-images/gaming-gear/mouse.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
