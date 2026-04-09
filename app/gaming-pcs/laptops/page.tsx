import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingPCCategory } from '@/components/products/gaming-pc-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Gaming Laptops | Drop Zone',
    description: 'Experience true mobile gaming performance with CORSAIR laptops. High refresh rate screens, mechanical keyboards, and desktop-class power in a portable form factor.',
};

const filters = [
    {
        name: 'Screen Size',
        options: ['16-inch', '17-inch'],
    },
    {
        name: 'Processor',
        options: ['AMD Ryzen 9', 'AMD Ryzen 7'],
    },
];

const infoSections = [
    {
        title: 'Mobile Powerhouse',
        content: 'CORSAIR gaming laptops are designed to deliver desktop-level performance in a portable package. With advanced cooling systems, high-refresh rate displays, and premium build quality, you can game, stream, and create content from anywhere.',
    },
];

export default async function LaptopsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming PCs', 
        category: 'Laptops' 
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
                title="Gaming Laptops"
                description="Unleash your potential with CORSAIR gaming laptops. Engineered for the modern gamer and streamer, combining raw power with innovative features like the S-Key macro bar."
                heroImage="/new-images/gaming-pc/laptops.jpeg"
                products={formattedDbProducts}
                filters={filters}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
