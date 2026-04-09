import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'PC Cables & Sleeving | Drop Zone',
    description: 'Customized power and data cables. Premium sleeved cable kits for a professional look.',
};

const series = [
    {
        title: 'Premium Sleeved Cable Kits',
        description: 'Complete your build with high-quality paracord sleeved cables available in various colors.',
        image: '/img/pc-component.png',
        href: '#',
        features: ['Flexible Paracord Sleeving', 'Pre-installed Cable Combs', 'Wide Compatibility'],
        align: 'left' as const,
    },
];

export default async function PCCablesPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Cables' 
    });
    
    const formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));

    return (
        <>
            <Header />
            <PCComponentLayout
                title="PC Cables"
                description="Professional cable management. Enhance your build's aesthetics with our premium sleeved cable solutions."
                heroImage="/new-images/pc-components/cables.jpeg"
                series={series}
                products={formattedDbProducts}
            />
            <Footer />
        </>
    );
}
