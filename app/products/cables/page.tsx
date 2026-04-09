import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Cables | Drop Zone',
  description: 'High-performance cables for gaming and data transfer. Durable and fast connections for your gear.',
};

export default async function CablesPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Cables' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Cables',
            subtitle: 'Premium cables for reliable performance',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING CABLES"
                    productDescription="Stay connected with high-speed, high-durability cables designed for enthusiast gamers."
                    heroImage="/new-images/gaming-gear/cable.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
