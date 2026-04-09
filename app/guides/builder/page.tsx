'use client';

import { GuidesLayout } from '@/components/guides/guides-layout';
import { ArticleCard } from '@/components/guides/article-card';

const mockArticles = [
    {
        title: "HOW TO BUILD A PC: THE ULTIMATE GUIDE",
        category: "BUILDER",
        type: "HOW TO" as const,
        image: "/img/49-492918_pc-components-png-transparent-png.png",
        href: "#",
    },
    {
        title: "SELECTING THE RIGHT POWER SUPPLY",
        category: "BUILDER",
        type: "BUYER'S GUIDES" as const,
        image: "/img/black-machine-with-word-power-it_723616-13650.jpg",
        href: "#",
    },
    {
        title: "CABLE MANAGEMENT MASTERCLASS",
        category: "BUILDER",
        type: "HOW TO" as const,
        image: "/img/pc-component.png",
        href: "#",
    }
];

export default function BuilderGuidesPage() {
    return (
        <GuidesLayout title="Builder Guides" category="BUILDER">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockArticles.map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                ))}
            </div>
        </GuidesLayout>
    );
}
