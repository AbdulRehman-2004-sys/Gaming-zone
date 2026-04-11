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
        title: 'Intel Core i9 13th Gen',
        description: 'Blazing fast clock speeds and hybrid architecture for elite gaming and multitasking.',
        image: '/new-images/pc-components/processor-1.jpeg',
        href: '#',
        features: ['Up to 6.0GHz Boost', 'Performance-cores & Efficient-cores', 'DDR5 Support'],
        align: 'left' as const,
    },
    {
        title: 'AMD Ryzen 7000 Series',
        description: 'The world\'s most advanced desktop processors, powered by Zen 4 architecture.',
        image: '/new-images/pc-components/processor-2.jpeg',
        href: '#',
        features: ['5nm Process Technology', 'PCIe 5.0 Support', 'AM5 Platform'],
        align: 'right' as const,
    },
];


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
            />
            <Footer />
        </>
    );
}
