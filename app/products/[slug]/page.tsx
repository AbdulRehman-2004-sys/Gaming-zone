import { getProductBySlug } from '@/lib/actions/product';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';
import { GuideDetail } from '@/components/guides/guide-detail';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Determine which layout to show
    if (product.isGuide) {
        return (
            <>
                <Header />
                <GuideDetail guide={product} />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <ProductDetail product={product} />
            <Footer />
        </>
    );
}
