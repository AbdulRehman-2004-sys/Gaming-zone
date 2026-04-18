import { PCComponentLayout } from '@/components/products/pc-component-layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
    title: 'PC Cases | Drop Zone',
    description: 'Build your dream rig with our premium PC cases. Superior airflow, expansive interiors, and stunning tempered glass designs.',
};

const series: any[] = [
    {
        title: 'High-Airflow Mesh Cases',
        description: 'Designed to breathe. Massive mesh front panels with strategically placed RGB fans ensure your high-performance hardware runs cool even under intense overclocking.',
        image: '/img/pngtree-a-sleek-gaming-pc-case-showcasing-vibrant-rgb-fans-and-components-png-image_15866247.png',
        href: '#',
        features: ['Optimized Airflow', 'Removable Dust Filters', 'Cable Routing Options'],
        align: 'left' as const,
    },
    {
        title: 'Tempered Glass Showpiece',
        description: 'Show off your masterpiece. Seamless edge-to-edge tempered glass panels provide an unobstructed panoramic view of your custom loop and components.',
        image: '/img/pngtree-vibrant-pc-case-showcase-png-image_11081161.png',
        href: '#',
        features: ['Tool-Free Glass Panels', 'Vertical GPU Mounting', 'Integrated RGB Lighting'],
        align: 'right' as const,
    },
];

export default async function CasesPage() {
    const dbProducts = await getProducts({ 
        mainCategory: 'PC Components', 
        category: 'Cases' 
    });
    
    let formattedDbProducts = [];
    if(dbProducts && dbProducts.length > 0) {
       formattedDbProducts = dbProducts.map((p: any) => formatProduct(p));
    }

    return (
        <>
            <Header />
            <PCComponentLayout
                title="PC Cases"
                description="The foundation of any great build starts here. Explore our cases that offer the perfect balance of aesthetics, ultimate cooling capability, and unmatched building convenience."
                heroImage="/img/computer-cases-housings-corsair-components-computer-system-cooling-parts-gaming-computer-atx-crystal.jpg"
                series={series}
                products={formattedDbProducts}
            />
            <Footer />
        </>
    );
}
