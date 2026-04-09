import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Headsets | Drop Zone',
  description: 'Premium gaming headsets with crystal-clear audio and noise cancellation for immersive gaming.',
};

export default async function HeadsetsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Headsets' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Headsets',
            subtitle: 'Explore our collection of gaming headsets',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING HEADSETS"
                    productDescription="Immerse yourself in crystal-clear audio. From flagship wireless models to zero-latency wired surround sound headsets."
                    heroImage="/new-images/gaming-gear/headset.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
