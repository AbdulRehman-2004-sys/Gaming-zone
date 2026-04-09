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
        title: "GALLEON 100 SD",
        category: "GAMER",
        type: "QUICK START GUIDE" as const,
        image: "/img/gamepad-game-controller-icon-isolated-3d-render-illustration_47987-6409.jpg",
        href: "#",
    },
    {
        title: "HIGHGUARD SYSTEM REQUIREMENTS AND RECOMMENDED SPECS",
        category: "GAMER",
        type: "GAME NEWS" as const,
        image: "/img/highendgamingpc-setup.png",
        href: "#",
    },
    {
        title: "ARC RAIDERS EXPLAINED",
        category: "GAMER",
        type: "GAME GUIDES" as const,
        image: "/img/gamingpc-setup.png",
        href: "#",
    },
    {
        title: "MARATHON SYSTEM REQUIREMENTS AND RECOMMENDED SPECS",
        category: "GAMER",
        type: "GAME NEWS" as const,
        image: "/img/png-clipart-laptop-graphics-cards-video-adapters-computer-hardware-desktop-computers-pc-game-electronics-computer.png",
        href: "#",
    },
    {
        title: "CORSAIR GALLEON 100 SD: RGB LIGHTING FOR THE DIALS",
        category: "GAMER",
        type: "HOW TO" as const,
        image: "/img/png-transparent-laptop-gaming-computer-personal-computer-homebuilt-computer-pc-game-gaming-computer-hd-game-electronics-computer-thumbnail.png",
        href: "#",
    },
    {
        title: "NOVABLADE PRO FIRMWARE UPDATE IMPROVES G-KEY REMAPPING BEHAVIOR",
        category: "GAMER",
        type: "NEWS" as const,
        image: "/img/png-transparent-graphics-cards-video-adapters-computer-cases-housings-playstation-4-gaming-computer-video-game-pc-game-electronics-computer-video-game.png",
        href: "#",
    },
    {
        title: "IS ARC RAIDERS CROSSPLAY COMPATIBLE?",
        category: "GAMER",
        type: "GAME GUIDES" as const,
        image: "/img/Computer-Accessories-PNG-Image-HD.png",
        href: "#",
    }
];

export default function GuidesPage() {
    return (
        <GuidesLayout title="Guides & Articles" category="GAMER">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockArticles.map((article, idx) => (
                    <ArticleCard key={idx} {...article} />
                ))}
            </div>
        </GuidesLayout>
    );
}
