import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingPCCategory } from '@/components/products/gaming-pc-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'High-Performance Workstations | Drop Zone',
    description: 'Power your creativity. High-end workstations for video editing, 3D rendering, and professional workloads.',
};

const filters = [
    {
        name: 'CPU Type',
        options: ['Threadripper', 'Xeon', 'Ryzen 9', 'Core i9'],
    },
];

const infoSections = [
    {
        title: 'Professional Performance',
        content: 'Our workstations are equipped with the most powerful processors and large amounts of high-speed memory to ensure your professional applications run smoothly.',
    },
];

export default async function WorkstationsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming PCs', 
        category: 'Workstations' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => {
        const fp = formatProduct(p);
        return {
            ...fp,
            specs: fp.specsArray || []
        };
    });

    return (
        <>
            <Header />
            <GamingPCCategory
                title="Professional Workstations"
                description="Engineered for creators. Massive processing power and high-speed memory for your most demanding tasks."
                heroImage="/new-images/gaming-pc/workstations.jpeg"
                products={formattedDbProducts}
                filters={filters}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
