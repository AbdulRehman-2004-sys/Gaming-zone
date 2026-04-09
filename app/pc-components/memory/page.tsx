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
        image: '/img/Computer-Motherboard-PNG-Photos.png',
        href: '#',
        features: ['Premium Die-Cast Aluminum', '11-Zone RGB Lighting', 'XMP 3.0 & EXPO Ready'],
        align: 'left' as const,
    },
    {
        title: 'VENGEANCE RGB DDR5',
        description: 'Push the limits of your system with dynamic ten-zone RGB lighting and tightly screened high-frequency memory chips.',
        image: '/img/high-performance-gaming-pc-with-an-open-case-showing-illuminated-internal-components-like-the-motherboard-and-graphics-card-on-a-transparent-background-free-png.png',
        href: '#',
        features: ['Panoramic RGB Light Bar', 'Optimized for Intel & AMD', 'Custom PCB Design'],
        align: 'right' as const,
    },
];

const buyingGuide = {
    title: 'RAM Buyer\'s Guide',
    steps: [
        {
            title: '1. DDR4 vs DDR5',
            content: 'Check your motherboard/CPU compatibility. DDR5 offers higher speeds and bandwidth.',
        },
    ],
};

const guides: any[] = [
    {
        title: 'DDR5 Explained',
        description: 'Why upgrading to DDR5 matters for next-gen gaming.',
        image: '/img/pc-components-101-all.png',
        href: '#',
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
                buyingGuide={buyingGuide}
                guides={guides}
            />
            <Footer />
        </>
    );
}
