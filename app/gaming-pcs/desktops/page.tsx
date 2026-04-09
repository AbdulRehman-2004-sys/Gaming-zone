import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingPCCategory } from '@/components/products/gaming-pc-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Gaming Desktops | Drop Zone',
    description: 'Explore our full range of CORSAIR Gaming Desktops. From custom configurators to pre-built powerhouses, find the perfect tower for your setup.',
};

const filters = [
    {
        name: 'Series',
        options: ['One', 'Vengeance', 'Voyager'],
    },
    {
        name: 'Processor Type',
        options: ['Intel Core i9', 'Intel Core i7', 'AMD Ryzen 9', 'AMD Ryzen 7'],
    },
];

const infoSections = [
    {
        title: 'Custom-Grade Cooling',
        content: 'Our gaming desktops feature advanced liquid cooling solutions to keep your system running cool and quiet, even during intense gaming sessions.',
    },
    {
        title: 'iCUE Integration',
        content: 'Seamlessly control your entire CORSAIR ecosystem with iCUE software. Synchronize RGB lighting, monitor system performance, and customize fan curves from a single interface.',
    },
];

export default async function DesktopsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming PCs', 
        category: 'Desktops' 
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
                title="Gaming Desktops"
                description="Dominate the competition with CORSAIR gaming desktops. Engineered for maximum performance, stunning aesthetics, and superior cooling."
                heroImage="/new-images/gaming-pc/desktop.jpeg"
                products={formattedDbProducts}
                filters={filters}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
