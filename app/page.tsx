import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ShowcaseSection } from '@/components/showcase-section';
import { ProductCategories } from '@/components/product-categories';
import { FeaturedCollections } from '@/components/featured-collections';
import { FeaturedProducts } from '@/components/featured-products';
import { GuidesSection } from '@/components/guides-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <ShowcaseSection />
      <ProductCategories />
      <FeaturedCollections />
      <FeaturedProducts />
      <GuidesSection />
      <Footer />
    </main>
  );
}
