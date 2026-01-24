"use client";

import React from "react";

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <div className="bg-slate-900 pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 poppins tracking-tight">
            Pioneering the <span className="text-primary-gradient">Digital</span> Frontier
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            TechTrove was born from a simple idea: that everyone deserves access to the tools that shape our future.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content Side */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="space-y-8 text-slate-600 text-lg leading-relaxed font-medium">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 poppins">Who We Are</h2>
                  <p className="text-justify">
                    TechTrove is more than just an electronics store; we are a community of innovators and creators.
                    Based globally, we specialize in curating the finest laptops, mobile devices, and professional-grade
                    optical equipment. Every item in our inventory is hand-picked for its excellence in engineering
                    and its ability to empower the user.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 poppins">Our Mission</h2>
                  <p className="text-justify">
                    Our mission is to democratize high-end technology. We believe that professional-grade tools should
                    be accessible to everyone—from the student coding their first app to the professional filmmaker
                    capturing their masterpiece. We bridge the gap between innovation and accessibility.
                  </p>
                </section>

                <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 text-accent">Professional Integrity</h3>
                    <p className="text-slate-400">
                      We maintain rigorous quality control standards. Every product is tested by our internal engineering team
                      before it ever reaches our retail shelf. If it's not good enough for us, it's not good enough for you.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats Side */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-primary-gradient rounded-[40px] p-10 text-white shadow-xl shadow-primary/30">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-white/80">Snapshot</h3>
              <div className="space-y-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold poppins tracking-tighter">50k+</span>
                  <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-1">Global Users</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold poppins tracking-tighter">150+</span>
                  <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-1">Premium Brands</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold poppins tracking-tighter">24hr</span>
                  <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-1">Response Time</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs">Sustainability</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                We are committed to reducing tech waste through our trade-in programs and eco-friendly packaging initiatives.
              </p>
              <button className="mt-6 text-primary font-bold text-sm hover:underline">Learn about our green initiative →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
