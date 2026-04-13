import { GuidesLayout } from '@/components/guides/guides-layout';
import { getProducts } from '@/lib/actions/product';

export default async function SoftwareGuidesPage() {
    const guides = await getProducts({ isGuide: true, category: 'SOFTWARE' });

    return (
        <GuidesLayout title="Software Guides" category="SOFTWARE" articles={guides} />
    );
}
