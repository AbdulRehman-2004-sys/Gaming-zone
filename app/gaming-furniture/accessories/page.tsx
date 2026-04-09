import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingFurnitureCategory } from '@/components/products/gaming-furniture-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Furniture Accessories | Drop Zone',
    description: 'Add the finishing touches to your gaming setup with our furniture accessories. Rugs, lighting, and cable management.',
};

const filters = [
    {
        title: 'TYPE',
        options: [
            { name: 'Cable Management', count: 5 },
            { name: 'Lighting', count: 3 },
            { name: 'Floor Mats', count: 4 },
        ],
    },
];

const infoSections = [
    {
        title: 'Complete the Look',
        content: 'Your setup is not complete without the right accessories. Enhance your floor with a gaming rug or manage your cables with our premium solutions.',
    },
];

export default async function FurnitureAccessoriesPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming Furniture', 
        category: 'Furniture Accessories' 
    });
    
    const allProducts = dbProducts.map(formatProduct);

    return (
        <>
            <Header />
            <GamingFurnitureCategory
                title="Furniture Accessories"
                description="The ultimate finishing touches. Enhance your comfort and organization with our premium furniture accessories."
                heroImage="/new-images/gaming-furniture/Whisk_2832e00a6e252c79f7f458c908442a93dr.jpeg"
                filters={filters}
                products={allProducts}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
