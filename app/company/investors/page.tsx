export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Investor Relations
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg mb-16">
          <p>
            Empowering the world's most demanding gamers through exceptional financial and strategic growth.
            DROP ZONE has emerged as a global leader in high-performance computer hardware. 
            With a relentless focus on engineering and community, we have consistently delivered profitable growth and expanded our market share across the premium peripheral space.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl w-full">
             <h3 className="text-xl font-bold text-white mb-2">Stock Information</h3>
             <div className="flex items-baseline gap-2 mb-1">
                 <span className="text-3xl font-black text-yellow-400">NASDAQ: DPZN</span>
             </div>
             <p className="text-green-400 font-bold flex items-center">
                 ▲ +4.25 (2.1%)
             </p>
             <p className="text-zinc-500 text-sm mt-4">Data delayed by 15 mins. As of Last Trading Session.</p>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white uppercase mb-8 tracking-tight border-b border-zinc-800 pb-4">
           Financial Reports
        </h2>
        
        <div className="space-y-4">
           {[
             { year: "2025", title: "Q4 2025 Earnings Release", type: "PDF", size: "1.2 MB" },
             { year: "2025", title: "Q3 2025 Quarterly Report (10-Q)", type: "PDF", size: "2.1 MB" },
             { year: "2024", title: "2024 Annual Report (10-K)", type: "PDF", size: "5.4 MB" },
             { year: "2024", title: "2024 Proxy Statement", type: "PDF", size: "1.8 MB" },
           ].map((doc, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-xl opacity-75">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-black border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 text-zinc-500 font-black text-xs">
                        {doc.type}
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-1">{doc.year}</span>
                        <h3 className="text-lg font-bold text-white">{doc.title}</h3>
                    </div>
                 </div>
                 <div className="mt-4 sm:mt-0 flex items-center gap-4 text-zinc-500 text-sm font-medium">
                    <span>{doc.size}</span>
                    <span className="px-4 py-2 uppercase text-xs font-bold text-zinc-500">
                        Not Available Yet
                    </span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
