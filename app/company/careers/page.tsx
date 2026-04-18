export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Join Our Squad
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg mb-16">
          <p>
            Build the future of gaming gear. Work with passionate gamers and engineers pushing the boundaries of performance.
            At DROP ZONE, we don't just sell components; we empower gamers to achieve their highest potential. Our mission is to engineer and provide the most advanced gaming hardware in the world.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Perks & Benefits</h3>
              <ul className="space-y-4 marker:text-yellow-400 list-disc pl-5">
                  <li className="text-zinc-400">Competitive Salary & Equity Packages</li>
                  <li className="text-zinc-400">Top-of-the-line gaming gear stipend</li>
                  <li className="text-zinc-400">Remote / Hybrid work flexibility</li>
                  <li className="text-zinc-400">Comprehensive Health & Dental Insurance</li>
              </ul>
          </div>
        </div>

        <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tight border-b border-zinc-800 pb-4">
           Open Positions
        </h2>
        <p className="text-zinc-400 text-lg mb-8 italic">We currently do not have any open positions available. We will update you as soon as new opportunities arise. Keep an eye out!</p>
        
        <div className="grid grid-cols-1 gap-6 opacity-60">
           {[
             { title: "Senior Hardware Engineer", dept: "Engineering", loc: "Remote / Hybrid", type: "Full-Time" },
             { title: "Frontend Web Developer (React/Next.js)", dept: "Engineering", loc: "Remote", type: "Full-Time" },
             { title: "Community Manager", dept: "Marketing", loc: "Lahore, PK / Remote", type: "Full-Time" },
             { title: "Technical Support Specialist", dept: "Customer Success", loc: "Remote", type: "Contract" },
           ].map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl transition-all duration-300">
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium">
                       <span className="uppercase tracking-widest text-zinc-400">{job.dept}</span>
                       <span>•</span>
                       <span>{job.loc}</span>
                       <span>•</span>
                       <span>{job.type}</span>
                    </div>
                 </div>
                 <div className="mt-4 sm:mt-0 text-sm font-bold uppercase text-zinc-500 shrink-0">
                    Currently Unavailable
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
