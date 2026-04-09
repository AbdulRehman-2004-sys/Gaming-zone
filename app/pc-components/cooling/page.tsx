import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'PC Cooling | Drop Zone',
    description: 'Keep your system cool and quiet. High-performance CPU coolers, case fans, and custom liquid cooling solutions.',
};

const series: any[] = [
    {
        title: 'iCUE LINK - Smart Cooling',
        description: 'The future of DIY PC building. One cable connects multiple fans and coolers via a central hub, drastically reducing cable clutter.',
        image: '/img/pngtree-set-gaming-pc-computer-rgb-full-spesifikasi-vektor-png-image_4542581.png',
        href: '#',
        features: ['Single Cable Ecosystem', 'Smart Hub Integration', 'Magnetic Connections'],
        align: 'left' as const,
    },
    {
        title: 'ELITE LCD Liquid Coolers',
        description: 'Elite performance with a personalized touch. High-performance pump heads with integrated custom LCD screens.',
        image: '/img/pngtree-water-cooled-gaming-pc-with-rgb-rainbow-led-lighting-png-image_12371747.png',
        href: '#',
        features: ['Customizable IPS LCD', 'Extreme Cooling Performance', 'iCUE Controlled RGB'],
        align: 'right' as const,
    },
];

const buyingGuide = {
    title: 'Cooling Buyer\'s Guide',
    steps: [
        {
            title: '1. Air vs Liquid',
            content: 'Air coolers are reliable and simple. AIO Liquid coolers often offer better peak performance and aesthetics.',
        },
    ],
};

const guides: any[] = [
    {
        title: 'Cooling Performance 101',
        description: 'How to optimize your case airflow for lower temperatures.',
        image: '/img/pc-components-101-all.png',
        href: '#',
    },
];

export default async function CoolingPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Cooling' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Cooling"
                description="Stay frosty under pressure. Experience peak performance with our advanced air and liquid cooling solutions."
                heroImage="/new-images/pc-components/cooling.jpeg"
                series={series}
                products={formattedDbProducts}
                buyingGuide={buyingGuide}
                guides={guides}
            />
            <Footer />
        </>
    );
}
