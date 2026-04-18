import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ShowcaseSection } from '@/components/showcase-section';
import { ProductCategories } from '@/components/product-categories';
import { FeaturedProducts } from '@/components/featured-products';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <ShowcaseSection />
      <ProductCategories />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
