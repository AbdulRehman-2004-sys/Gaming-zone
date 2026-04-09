import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Controllers | Drop Zone',
  description: 'Premium gaming controllers for PC and consoles. High-performance gamepads for competitive play.',
};

export default async function ControllersPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Controllers' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Controllers',
            subtitle: 'Latest additions to our gaming controller collection',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING CONTROLLERS"
                    productDescription="Engineered for performance. Professional-grade controllers with customizable buttons and low latency."
                    heroImage="/new-images/gaming-gear/controllers.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
