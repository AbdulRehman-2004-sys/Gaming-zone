import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GamingFurnitureCategory } from '@/components/products/gaming-furniture-category';
import { getProducts } from '@/lib/actions/product';
import { formatProduct } from '@/lib/utils';

export const metadata = {
  title: 'Gaming Desks | Drop Zone',
  description: 'Premium gaming desks with adjustable height, cable management, and ergonomic design. From fixed to motorized standing desks.',
};

const filters = [
  {
    title: 'CATEGORIES',
    options: [
      { name: 'All Products' },
      { name: 'Gaming Desks', count: 24 },
      { name: 'Desk Accessories', count: 18 },
    ],
  },
];

const infoSections = [
  {
    title: 'The Perfect Foundation',
    content:
      'A great gaming setup starts with a solid foundation. Our gaming desks are built with durable materials and feature-rich designs to enhance your performance.',
  },
];

export default async function GamingDesksPage() {
  const dbProducts = await getProducts({ 
    mainCategory: 'Gaming Furniture', 
    category: 'Gaming Desks' 
  });
  
  const allProducts = dbProducts.map(formatProduct);

  return (
    <>
      <Header />
      <GamingFurnitureCategory
        title="Gaming Desks"
        description="Build your dream battle station on a rock-solid foundation. Premium desks designed for ultimate performance and organization."
        heroImage="/new-images/gaming-furniture/Whisk_e864d6902d59baebdc0453877e8a224adr.jpeg"
        filters={filters}
        products={allProducts}
        infoSections={infoSections}
      />
      <Footer />
    </>
  );
}
