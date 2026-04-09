import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Power Supply Units (PSUs) | Drop Zone',
    description: 'Reliable power for your high-performance PC. Shop 80 PLUS certified power supplies.',
};

const series = [
    {
        title: 'RMx Series',
        description: 'Fully modular power supplies with 80 PLUS Gold efficiency and magnetic levitation fans.',
        image: '/img/pc-component.png',
        href: '#',
        features: ['80 PLUS Gold Certified', 'Fully Modular', 'Zero RPM Fan Mode'],
        align: 'left' as const,
    },
];

const buyingGuide = {
    title: 'PSU Guide',
    steps: [
        {
            title: '1. Wattage Requirements',
            content: 'Calculate your total system power draw. For high-end GPUs, we recommend at least 850W-1000W.',
        },
    ],
};

export default async function PowerSupplyPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Power Supply' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Power Supply"
                description="The lifeblood of your setup. Premium power supplies providing stable, efficient electricity for your hardware."
                heroImage="/new-images/pc-components/power-supply.jpeg"
                series={series}
                products={formattedDbProducts}
                buyingGuide={buyingGuide}
            />
            <Footer />
        </>
    );
}
