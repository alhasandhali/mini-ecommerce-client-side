import React from "react";

const PromoBanner = () => {
  return (
    <section className="relative py-28 md:py-40 text-white overflow-hidden group">
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/5XLmywHV/high-tech-futuristic-gaming-virtual-reality-headset.jpg')",
        }}
      />

      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-700"></div>

      {/* Floating Blobs */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/30 blur-[100px] rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-accent/20 blur-[80px] rounded-full opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            Next-Gen Experience
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 poppins tracking-tight">
            Upgrade Your <br />
            <span className="text-primary-gradient">Digital Life</span>
          </h2>

          <p className="text-lg md:text-2xl text-slate-300 font-medium mb-10 max-w-lg leading-relaxed">
            Experience the pinnacle of technology with our exclusive <span className="text-white font-bold italic">TechTrove</span> curated collections.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-all duration-300 active:scale-95 flex items-center gap-2">
              Explore Deals
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95">
              View Catalogue
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default PromoBanner;
