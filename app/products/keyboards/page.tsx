import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Keyboards | Drop Zone',
  description: 'Explore our premium gaming keyboards collection. High-performance mechanical keyboards for competitive gaming and professional typing.',
};

export default async function KeyboardsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Keyboards' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Keyboards',
            subtitle: 'Latest additions to our gaming keyboard collection',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ComparisonLayout 
                    productType="GAMING KEYBOARDS"
                    productDescription="From full-size powerhouses to compact competitive rigs, find the perfect keyboard for your playstyle."
                    heroImage="/new-images/gaming-gear/keyboard.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
