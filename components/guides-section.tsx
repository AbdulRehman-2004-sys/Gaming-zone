'use client';

const guides = [
  {
    id: 1,
    title: 'Do I Need to Plug in Both CPU Power Cables?',
    icon: '🔌',
    span: 'col-span-1',
  },
  {
    id: 2,
    title: 'How Hot is Too Hot for a CPU?',
    icon: '🌡️',
    span: 'col-span-1',
  },
  {
    id: 3,
    title: 'How Hot is Too Hot for a CPU?',
    icon: '❄️',
    span: 'col-span-1',
  },
  {
    id: 4,
    title: 'DROP ZONE PC BUILDER',
    subtitle: 'Get recommendations on compatibility and pick the perfect DROP ZONE components',
    icon: '🛠️',
    span: 'col-span-1 md:col-span-2',
    large: true,
  },
  {
    id: 5,
    title: 'DROP ZONE iCUE LINK',
    subtitle: 'Simplify your PC Build with a single connector',
    icon: '⚡',
    span: 'col-span-1 md:col-span-2',
    large: true,
  },
  {
    id: 6,
    title: 'HYDRO X SERIES',
    subtitle: 'Extreme custom cooling for your PC',
    icon: '❄️',
    span: 'col-span-1',
    large: false,
  },
];

export function GuidesSection() {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 overflow-visible">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">GUIDES, TIPS & TRICKS</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">FEATURED VIDEOS</p>
        </div>

        {/* First row: 3 small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-8">
          {guides.slice(0, 3).map((guide) => (
            <div
              key={guide.id}
              className="group relative overflow-visible bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 hover:border-yellow-400/50 transition-all h-48 sm:h-56 md:h-56 p-6 sm:p-8 flex flex-col justify-end cursor-pointer"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 md:mb-4 group-hover:scale-110 transition-transform flex-shrink-0">{guide.icon}</div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                {guide.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Second row: 2x2 grid for larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-8">
          {/* Large left card */}
          <div className="group relative overflow-visible bg-gradient-to-br from-purple-900/20 via-black to-black border border-yellow-400/20 hover:border-yellow-400/50 transition-all h-64 sm:h-72 md:h-80 p-8 sm:p-10 md:p-10 flex flex-col justify-end cursor-pointer">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform flex-shrink-0">🛠️</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-2 sm:mb-3 md:mb-3">
              DROP ZONE PC BUILDER
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 line-clamp-2">
              Get recommendations on compatibility and pick the perfect DROP ZONE components to build your dream PC.
            </p>
            <button className="w-fit bg-yellow-400 text-black px-4 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-3 font-bold hover:bg-yellow-300 transition-all text-xs sm:text-sm md:text-base">
              PLAN YOUR BUILD
            </button>
          </div>

          {/* Stack of 2 cards on right */}
          <div className="space-y-6 sm:space-y-8 md:space-y-8">
            {/* iCUE Link Card */}
            <div className="group relative overflow-visible bg-gradient-to-br from-pink-900/20 via-black to-black border border-yellow-400/20 hover:border-yellow-400/50 transition-all h-40 sm:h-44 md:h-40 p-6 sm:p-8 md:p-8 flex flex-col justify-end cursor-pointer">
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 md:mb-3 group-hover:scale-110 transition-transform flex-shrink-0">⚡</div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-1 sm:mb-2 md:mb-2 line-clamp-1">
                DROP ZONE iCUE LINK
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-1">Simplify your PC Build with a single connector</p>
            </div>

            {/* Hydro X Card */}
            <div className="group relative overflow-visible bg-gradient-to-br from-cyan-900/20 via-black to-black border border-yellow-400/20 hover:border-yellow-400/50 transition-all h-40 sm:h-44 md:h-40 p-6 sm:p-8 md:p-8 flex flex-col justify-end cursor-pointer">
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 md:mb-3 group-hover:scale-110 transition-transform flex-shrink-0">❄️</div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-1 sm:mb-2 md:mb-2 line-clamp-1">
                HYDRO X SERIES
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-1">Extreme custom cooling for your PC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
