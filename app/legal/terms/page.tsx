export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Terms of Service
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-base md:text-lg">
          <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <p>
            Welcome to DROP ZONE. By accessing or using our website, purchasing our premium gaming gear, or using our services, you agree to be bound by these Terms of Service.
            Please read them carefully before making any purchases or using our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Agreement to Terms</h2>
          <p>
            By accessing this website, you agree to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">User Conduct & Account Security</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400 marker:text-yellow-400">
             <li>Systematically retrieve data or other content from the Site to create or compile a collection or database.</li>
             <li>Trick, defraud, or mislead us and other users.</li>
             <li>Engage in unauthorized framing of or linking to the Site.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Product Warranty & Returns</h2>
          <p>
            All physical products and components sold through DROP ZONE come with a standard manufacturer warranty unless stated otherwise on the product page. Returns must be initiated within 30 days of the purchase date.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Limitation of Liability</h2>
          <p>
           In no event shall DROP ZONE or its suppliers be liable for any damages arising out of the use or inability to use the materials on DROP ZONE's website.
          </p>
        </div>
      </div>
    </div>
  );
}
