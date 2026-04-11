import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'Storage (SSDs & HDDs) | Drop Zone',
    description: 'Blazing fast speeds for your games and apps. Shop NVMe SSDs and high-capacity hard drives.',
};

const series = [
    {
        title: 'MP700 PRO Gen5 NVMe',
        description: 'Experience incredible sequential read and write speeds up to 12,400MB/sec.',
        image: '/new-images/pc-components/storage-1.jpeg',
        href: '#',
        features: ['PCIe Gen5 x4 Interface', 'High-Density 3D TLC NAND', 'Integrated Air Cooler'],
        align: 'left' as const,
    },
];


export default async function StoragePage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Storage' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="Storage"
                description="Fast loading, massive space. Upgrade to high-performance NVMe SSDs for a smoother gaming experience."
                heroImage="/new-images/pc-components/storage.jpeg"
                series={series}
                products={formattedDbProducts}
            />
            <Footer />
        </>
    );
}
