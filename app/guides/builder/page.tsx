import { GuidesLayout } from '@/components/guides/guides-layout';
import { getProducts } from '@/lib/actions/product';

export default async function BuilderGuidesPage() {
    const guides = await getProducts({ isGuide: true, category: 'BUILDER' });

    return (
        <GuidesLayout title="Builder Guides" category="BUILDER" articles={guides} />
    );
}
