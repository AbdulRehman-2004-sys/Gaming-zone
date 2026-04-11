import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Memory (RAM) | Drop Zone',
    description: 'High-performance DDR4 and DDR5 memory. Featuring CORSAIR VENGEANCE and DOMINATOR series with RGB lighting.',
};

const series: any[] = [
    {
        title: 'DOMINATOR TITANIUM DDR5',
        description: 'The ultimate in luxury and performance. Patented DHX cooling, interchangeable top bars, and extreme overclocking potential.',
        image: '/new-images/pc-components/memory-1.jpeg',
        href: '#',
        features: ['Premium Die-Cast Aluminum', '11-Zone RGB Lighting', 'XMP 3.0 & EXPO Ready'],
        align: 'left' as const,
    },
    {
        title: 'VENGEANCE RGB DDR5',
        description: 'Push the limits of your system with dynamic ten-zone RGB lighting and tightly screened high-frequency memory chips.',
        image: '/new-images/pc-components/memory-2.jpeg',
        href: '#',
        features: ['Panoramic RGB Light Bar', 'Optimized for Intel & AMD', 'Custom PCB Design'],
        align: 'right' as const,
    },
];


export default async function MemoryPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Memory' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Memory"
                description="Push the limits of your system. Get high-speed, high-capacity DDR4 and DDR5 memory modules for seamless gaming and multitasking."
                heroImage="/new-images/pc-components/memory.jpeg"
                series={series}
                products={formattedDbProducts}
            />
            <Footer />
        </>
    );
}
