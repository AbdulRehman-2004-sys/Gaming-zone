import { GuidesLayout } from '@/components/guides/guides-layout';
import { getProducts } from '@/lib/actions/product';

export default async function GamerGuidesPage() {
    const guides = await getProducts({ isGuide: true, category: 'GAMER' });

    return (
        <GuidesLayout title="Gamer Guides" category="GAMER" articles={guides} />
    );
}
