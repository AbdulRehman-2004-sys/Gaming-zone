export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Cookie Policy
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-base md:text-lg">
          <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <p>
            Our website uses cookies to distinguish you from other users. This helps us to provide you with a good 
            experience when you browse our website and also allows us to improve our site by understanding how you interact with it.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">What are Cookies?</h2>
          <p>
            A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer or mobile device if you agree. They allow the website to recognize your device and store some information about your preferences or past actions.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">How we use them</h2>
          <ul className="list-disc pl-6 space-y-4 mt-4 text-zinc-400 marker:text-yellow-400">
             <li>
               <strong>Strictly necessary cookies:</strong> Required for the operation of our website, e.g., shopping cart functionality.
             </li>
             <li>
               <strong>Analytical or performance cookies:</strong> Allows us to recognize and count the number of visitors and to see how visitors move around our website.
             </li>
             <li>
               <strong>Functionality cookies:</strong> Used to recognize you when you return to our website and personalize content.
             </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Managing Cookies</h2>
          <p>
             You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. If you block essential cookies, you may not be able to access parts of our website.
          </p>
        </div>
      </div>
    </div>
  );
}
