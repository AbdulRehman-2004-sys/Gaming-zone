'use client';

import { GuidesLayout } from '@/components/guides/guides-layout';
import { ArticleCard } from '@/components/guides/article-card';

const mockArticles = [
    {
        title: "iCUE GUIDES: MASTER YOUR RGB",
        category: "SOFTWARE",
        type: "HOW TO" as const,
        image: "/img/png-transparent-blue-light-efficiency-technology-electronic-components-of-the-circuit-light-effect-line-tortuous-thumbnail.png",
        href: "#",
    },
    {
        title: "ELGATO STREAM DECK FOR DESIGNERS",
        category: "SOFTWARE",
        type: "BLOG" as const,
        image: "/img/cartoon-game-streamer-concept-elements_23-2148918251.jpg",
        href: "#",
    },
    {
        title: "SOFTWARE COMPATIBILITY LIST 2025",
        category: "SOFTWARE",
        type: "NEWS" as const,
        image: "/img/Summary.png",
        href: "#",
    }
];

export default function SoftwareGuidesPage() {
    return (
        <GuidesLayout title="Software Guides" category="SOFTWARE">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockArticles.map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                ))}
            </div>
        </GuidesLayout>
    );
}
