export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col py-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-yellow-400 mb-12 tracking-tighter">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed text-base md:text-lg">
          <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <p>
            At <strong>DROP ZONE</strong>, protecting your privacy is important to us. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website including any other media form, media channel, mobile website, or mobile application related or connected thereto.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400 marker:text-yellow-400">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and the pages you have viewed.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method that we may collect when you purchase or order.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400 marker:text-yellow-400">
            <li>Create and manage your account.</li>
            <li>Fulfill and manage purchases, orders, payments.</li>
            <li>Email you regarding your account or order.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 border-b border-zinc-800 pb-2">Data Security</h2>
          <p>
             We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>

        </div>
      </div>
    </div>
  );
}
