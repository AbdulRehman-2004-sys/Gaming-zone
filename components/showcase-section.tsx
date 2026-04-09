import Image from 'next/image';

export function ShowcaseSection() {
  const showcases = [
    {
      id: 1,
      title: 'SABRE v2 PRO CF',
      subtitle: 'CARBON FIBER UNREADY',
      description: 'Professional gaming mouse',
      image: '/img/rgb-gaming-mouse-advanced-design-neon-lights_84443-51580.jpg',
    },
    {
      id: 2,
      title: 'NUKA COLA',
      subtitle: 'WASTELANDER-APPROVED',
      description: 'Limited edition collection',
      image: '/img/gamepad-game-controller-icon-isolated-3d-render-illustration_47987-6409.jpg',
    },
  ];

  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {showcases.map((item, idx) => (
            <div
              key={item.id}
              className="relative group overflow-hidden h-64 sm:h-72 md:h-96 bg-gray-900 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 rounded-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

              {/* Content */}
              <div className="relative h-full w-full flex flex-col justify-end p-6 sm:p-8 md:p-8 z-20">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-yellow-400 font-semibold uppercase tracking-wider mb-4">
                  {item.subtitle}
                </p>
                <button className="w-fit bg-yellow-400 text-black px-6 py-2.5 text-xs sm:text-sm font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 rounded-full">
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
