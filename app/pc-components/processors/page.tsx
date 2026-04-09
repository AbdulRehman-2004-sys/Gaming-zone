import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Processors (CPUs) | Drop Zone',
    description: 'The brain of your PC. Shop the latest Intel Core and AMD Ryzen processors for gaming and productivity.',
};

const series = [
    {
        title: 'Intel Core 14th Gen',
        description: 'Blazing fast clock speeds and hybrid architecture for elite gaming and multitasking.',
        image: '/img/pc-component.png',
        href: '#',
        features: ['Up to 6.0GHz Boost', 'Performance-cores & Efficient-cores', 'DDR5 Support'],
        align: 'left' as const,
    },
    {
        title: 'AMD Ryzen 7000 Series',
        description: 'The world\'s most advanced desktop processors, powered by Zen 4 architecture.',
        image: '/img/Gaming-Pc-PNG-Isolated-Photo.png',
        href: '#',
        features: ['5nm Process Technology', 'PCIe 5.0 Support', 'AM5 Platform'],
        align: 'right' as const,
    },
];

const buyingGuide = {
    title: 'Choosing Your CPU',
    steps: [
        {
            title: '1. Gaming Focus',
            content: 'For pure gaming, 6-8 cores like the Ryzen 7 7800X3D or Core i7-14700K are the sweet spot.',
        },
    ],
};

export default async function ProcessorsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Processors' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Processors"
                description="Power at the core. Discover high-performance CPUs that drive your gaming and creative workloads."
                heroImage="/new-images/pc-components/processor.jpeg"
                series={series}
                products={formattedDbProducts}
                buyingGuide={buyingGuide}
            />
            <Footer />
        </>
    );
}
