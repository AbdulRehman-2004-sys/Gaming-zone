import { GuidesLayout } from '@/components/guides/guides-layout';
import { ArticleCard } from '@/components/guides/article-card';
import { getProducts } from '@/lib/actions/product';

export default async function GuidesPage() {
    const guides = await getProducts({ isGuide: true });

    return (
        <GuidesLayout title="Guides & Articles" category="GAMER">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {guides.length > 0 ? (
                    guides.map((product: any) => (
                        <ArticleCard 
                            key={product._id} 
                            title={product.name}
                            category={product.mainCategory}
                            type="HOW TO"
                            image={product.image || "/placeholder.png"}
                            href={`/products/${product.slug}`}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-zinc-500">
                        No guides available at the moment. Check back later!
                    </div>
                )}
            </div>
        </GuidesLayout>
    );
}
