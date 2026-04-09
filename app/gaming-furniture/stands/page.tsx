import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingFurnitureCategory } from '@/components/products/gaming-furniture-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Monitor Stands & Mounts | Drop Zone',
    description: 'Elevate your visual experience. Sturdy monitor stands and gas-spring mounts for single and dual monitor setups.',
};

const filters = [
    {
        title: 'TYPE',
        options: [
            { name: 'Desk Mount', count: 12 },
            { name: 'Stand', count: 8 },
        ],
    },
];

const infoSections = [
    {
        title: 'Optimize Your View',
        content: 'Correct monitor height is crucial for long gaming sessions. our stands and mounts provide full adjustability to ensure ergonomic comfort.',
    },
];

export default async function StandsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Furniture', 
        category: 'Stands' 
    });
    
    const allProducts = dbProducts.map(formatProduct);

    return (
        <>
            <Header />
            <GamingFurnitureCategory
                title="Monitor Stands & Mounts"
                description="Elevate your gameplay. Premium monitor arms and stands designed for flexibility and desk space optimization."
                heroImage="/new-images/gaming-furniture/Whisk_c8b5d08b40749f0ac5f472baf3efda72dr.jpeg"
                filters={filters}
                products={allProducts}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
