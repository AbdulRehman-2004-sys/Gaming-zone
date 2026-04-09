import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingFurnitureCategory } from '@/components/products/gaming-furniture-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Gaming Chairs | Drop Zone',
    description: 'Ergonomic gaming chairs designed for comfort and performance. Explore our range of racing-style and office hybrid chairs.',
};

const filters = [
    {
        title: 'SERIES',
        options: [
            { name: 'TC Series', count: 8 },
            { name: 'T3 Rush', count: 5 },
            { name: 'TC100', count: 3 },
        ],
    },
    {
        title: 'MATERIAL',
        options: [
            { name: 'Fabric', count: 10 },
            { name: 'Leatherette', count: 8 },
            { name: 'Plush', count: 2 },
        ],
    },
];

const infoSections = [
    {
        title: 'Sit to Win',
        content:
            'A great gaming chair is more than just a seat; it\'s a command center. Our chairs are designed with ergonomics in mind, supporting your posture through long sessions.',
    },
    {
        title: 'Fabric vs Leatherette',
        content:
            'Choose the material that suits your style. Soft fabric offers breathability, while leatherette provides a sleek, premium look that is easy to clean.',
    },
];

export default async function GamingChairsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Furniture', 
        category: 'Gaming Chairs' 
    });
    
    const allProducts = dbProducts.map(formatProduct);

    return (
        <>
            <Header />
            <GamingFurnitureCategory
                title="Gaming Chairs"
                description="Experience ultimate comfort with CORSAIR gaming chairs. Racing-inspired designs, premium materials, and ergonomic features for all-day gaming."
                heroImage="/new-images/gaming-furniture/Whisk_dcfc8108b5d51029a0b4e69dc536ec9ddr.jpeg"
                filters={filters}
                products={allProducts}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
