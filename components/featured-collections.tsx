'use client';

const collections = [
  {
    id: 1,
    title: 'XENEON EDGE',
    subtitle: 'LEVEL UP YOUR BATTLESTATION',
    icon: '🖥️',
  },
  {
    id: 2,
    title: 'FRAME 4000D LCD',
    subtitle: 'BUILD YOUR DREAM MACHINE',
    icon: '📦',
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10 md:mb-12">Featured Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-visible h-56 sm:h-64 md:h-80 bg-gradient-to-br from-blue-900/30 via-black to-black border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/40 transition-all duration-300 pointer-events-none" />

              {/* Icon background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                <div className="text-7xl sm:text-8xl md:text-9xl flex-shrink-0">{collection.icon}</div>
              </div>

              {/* Content */}
              <div className="relative h-full w-full flex flex-col justify-end p-6 sm:p-8 md:p-8">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {collection.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-yellow-400 font-semibold uppercase tracking-wider mb-4 sm:mb-5">
                  {collection.subtitle}
                </p>
                <button className="w-fit bg-yellow-400 text-black px-4 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-2.5 text-xs sm:text-sm font-bold hover:bg-yellow-300 transition-all transform hover:scale-105">
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
