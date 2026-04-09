import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Motherboards | Drop Zone',
    description: 'The foundation of your build. Shop the latest Intel and AMD motherboards from top brands.',
};

const series = [
    {
        title: 'Z790 Premium Series',
        description: 'Designed for enthusiasts who demand the best in power delivery and connectivity.',
        image: '/img/Computer-Motherboard-PNG-Photos.png',
        href: '#',
        features: ['Robust Power Delivery', 'PCIe 5.0 Support', 'Wi-Fi 7 Ready'],
        align: 'left' as const,
    },
];

const buyingGuide = {
    title: 'Motherboard Guide',
    steps: [
        {
            title: '1. Socket Compatibility',
            content: 'Ensure your motherboard socket matches your CPU (e.g., LGA1700 for 14th Gen Intel or AM5 for Ryzen 7000).',
        },
    ],
};

export default async function MotherboardsPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Motherboards' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Motherboards"
                description="The backbone of performance. Choose the perfect motherboard to connect and power your dream rig."
                heroImage="/img/Computer-Motherboard-PNG-Photos.png"
                series={series}
                products={formattedDbProducts}
                buyingGuide={buyingGuide}
            />
            <Footer />
        </>
    );
}
