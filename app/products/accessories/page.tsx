import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ComparisonLayout } from '@/components/products/comparison-layout';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Accessories | Drop Zone',
  description: 'Premium gaming accessories to enhance your setup. From headsets stands to cleaning kits.',
};

export default async function AccessoriesPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Gear', 
        category: 'Accessories' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    
    const allCategories = formattedDbProducts.length > 0 ? [
        {
            title: 'Gaming Accessories',
            subtitle: 'Complete your battle station with our premium accessories',
            products: formattedDbProducts
        }
    ] : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <ComparisonLayout 
                    productType="GAMING ACCESSORIES"
                    productDescription="Small additions, big impact. The perfect finishing touches for your gaming setup."
                    heroImage="/new-images/gaming-gear/acessories.jpeg"
                    categories={allCategories}
                />
            </main>
            <Footer />
        </div>
    );
}
