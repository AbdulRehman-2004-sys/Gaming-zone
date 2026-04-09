import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingPCCategory } from '@/components/products/gaming-pc-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Pre-built Gaming Systems | Drop Zone',
    description: 'Ready to play out of the box. Our pre-built systems are professionally assembled and tested for maximum performance.',
};

const filters = [
    {
        name: 'Form Factor',
        options: ['Tower', 'Small Form Factor', 'Mid-Tower'],
    },
];

const infoSections = [
    {
        title: 'Plug and Play',
        content: 'No assembly required. Our pre-built systems come fully configured with the latest hardware and software, so you can start gaming immediately.',
    },
];

export default async function PreBuiltSystemsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming PCs', 
        category: 'Pre-built Systems' 
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
                title="Pre-built Systems"
                description="Expertly built, tournament ready. High-performance gaming PCs assembled by professionals using premium CORSAIR components."
                heroImage="/new-images/gaming-pc/pre-built.jpeg"
                products={formattedDbProducts}
                filters={filters}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
