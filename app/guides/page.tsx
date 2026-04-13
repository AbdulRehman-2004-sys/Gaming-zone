import { GuidesLayout } from '@/components/guides/guides-layout';
import { getProducts } from '@/lib/actions/product';

export default async function GuidesPage() {
    const guides = await getProducts({ isGuide: true });

    return (
        <GuidesLayout 
            title="Guides & Articles" 
            category="ALL" 
            articles={guides} 
        />
    );
}
