'use client';

import { GuidesLayout } from '@/components/guides/guides-layout';
import { ArticleCard } from '@/components/guides/article-card';

const mockArticles = [
    {
        title: "THE MANY BENEFITS OF STREAM DECK INTEGRATION",
        category: "GAMER",
        type: "BLOG" as const,
        image: "/img/cartoon-game-streamer-concept-elements_23-2148918251.jpg",
        href: "#",
    },
    {
        title: "BEST SETTINGS FOR ARC RAIDERS",
        category: "GAMER",
        type: "GAME GUIDES" as const,
        image: "/img/game-controller-illustration_23-2151602211.jpg",
        href: "#",
    },
    {
        title: "HIGHGUARD SYSTEM REQUIREMENTS AND RECOMMENDED SPECS",
        category: "GAMER",
        type: "GAME NEWS" as const,
        image: "/img/highendgamingpc-setup.png",
        href: "#",
    }
];

export default function GamerGuidesPage() {
    return (
        <GuidesLayout title="Gamer Guides" category="GAMER">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockArticles.map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                ))}
            </div>
        </GuidesLayout>
    );
}
