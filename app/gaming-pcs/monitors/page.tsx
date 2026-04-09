import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingPCCategory } from '@/components/products/gaming-pc-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Gaming Monitors | Drop Zone',
    description: 'Immerse yourself in the action with CORSAIR gaming monitors. Fast refresh rates, stunning colors, and ultra-wide options for a competitive edge.',
};

const filters = [
    {
        name: 'Resolution',
        options: ['4K UHD', '1440p QHD', '1080p FHD'],
    },
    {
        name: 'Panel Type',
        options: ['OLED', 'IPS', 'VA'],
    },
];

const infoSections = [
    {
        title: 'See the Difference',
        content: 'From ultra-fast refresh rates to stunning color accuracy, CORSAIR monitors are built to provide the ultimate visual experience. Whether you are a competitive esports player or a cinematic enthusiast, we have the perfect screen for you.',
    },
];

export default async function MonitorsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'Gaming PCs', 
        category: 'Monitors' 
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
                title="Gaming Monitors"
                description="Elevate your visual experience with CORSAIR XENEON monitors. Featuring high refresh rates, HDR, and cutting-edge panel technology."
                heroImage="/new-images/gaming-pc/monitors.jpeg"
                products={formattedDbProducts}
                filters={filters}
                infoSections={infoSections}
            />
            <Footer />
        </>
    );
}
