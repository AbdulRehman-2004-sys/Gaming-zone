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
        image: '/new-images/pc-components/cooling-1.jpeg',
        href: '#',
        features: ['Single Cable Ecosystem', 'Smart Hub Integration', 'Magnetic Connections'],
        align: 'left' as const,
    },
    {
        title: 'ELITE LCD Liquid Coolers',
        description: 'Elite performance with a personalized touch. High-performance pump heads with integrated custom LCD screens.',
        image: '/new-images/pc-components/cooling-2.jpeg',
        href: '#',
        features: ['Customizable IPS LCD', 'Extreme Cooling Performance', 'iCUE Controlled RGB'],
        align: 'right' as const,
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
            />
            <Footer />
        </>
    );
}
