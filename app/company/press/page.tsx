export default function PressPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Press & Media
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg mb-16">
          <p>
            Official news, announcements, and media assets from DROP ZONE. If you are a member of the press, content creator, or media analyst and need information about DROP ZONE products or company updates, our public relations team is ready to assist you.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl w-full">
             <p className="font-medium text-white mb-2">Press Inquiries:</p>
             <a href="mailto:press@dropzone.com" className="text-yellow-400 hover:text-white transition-colors font-bold text-xl">press@dropzone.com</a>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white uppercase mb-8 tracking-tight border-b border-zinc-800 pb-4">
           Latest Announcements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "DROP ZONE Unveils Next-Gen Mechanical Switches at CES", date: "Jan 15, 2026", excerpt: "Revolutionary new tactile feedback technology promises to reshape competitive esports." },
             { title: "Galleon 100 SD Wins 'Keyboard of the Year'", date: "Nov 22, 2025", excerpt: "Critics and players unite in praising the extreme durability and ultra-low latency of the new Galleon series." },
             { title: "Global Expansion: New Fulfilment Centers Open in Europe", date: "Sep 05, 2025", excerpt: "To meet unprecedented demand, DROP ZONE is expanding its global footprint to deliver hardware faster." },
             { title: "Partnership announced with World Cyber Games", date: "Jul 10, 2025", excerpt: "DROP ZONE will be the exclusive official peripheral provider for the world's largest esports tournament." },
           ].map((news, idx) => (
              <div key={idx} className="flex flex-col p-8 bg-zinc-900 border border-zinc-800 rounded-2xl h-full">
                 <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">{news.date}</span>
                 <h3 className="text-2xl font-bold text-white mb-4">{news.title}</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-6">{news.excerpt}</p>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
