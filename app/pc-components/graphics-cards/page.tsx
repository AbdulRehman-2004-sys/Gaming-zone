import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Graphics Cards (GPUs) | Drop Zone',
    description: 'DOMINATE THE GAME. Shop the latest NVIDIA GeForce RTX and AMD Radeon RX graphics cards.',
};

const series = [
    {
        title: 'NVIDIA GeForce RTX 40 Series',
        description: 'Beyond fast. Powered by Ada Lovelace architecture for realistic ray tracing and AI-accelerated performance.',
        image: '/new-images/pc-components/graphic-1.jpeg',
        href: '#',
        features: ['DLSS 3.0 Support', '3rd Gen Ray Tracing Cores', 'AV1 Encoding'],
        align: 'left' as const,
    },
    {
        title: 'AMD Radeon RX 7000 Series',
        description: 'Breakthrough performance with RDNA 3 architecture. High frame rates and advanced visual features for 4K gaming.',
        image: '/new-images/pc-components/graphic-2.jpeg',
        href: '#',
        features: ['Chiplet Architecture', 'DisplayPort 2.1', 'FSR 3.0 Ready'],
        align: 'right' as const,
    },
];


export default async function GraphicsCardsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Graphics Cards' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Graphics Cards"
                description="Visuals redefined. Experience lifelike graphics and high frame rates with our selection of top-tier GPUs."
                heroImage="/new-images/pc-components/graphic card.jpeg"
                series={series}
                products={formattedDbProducts}
            />
            <Footer />
        </>
    );
}
