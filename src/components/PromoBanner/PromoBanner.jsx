import React from "react";

const PromoBanner = () => {
  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/5XLmywHV/high-tech-futuristic-gaming-virtual-reality-headset.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/40 blur-3xl rounded-full opacity-40"></div>
      <div className="absolute top-0 -right-10 w-72 h-72 bg-secondary/40 blur-3xl rounded-full opacity-40"></div>
      <div className="relative max-w-3xl mx-auto text-center px-5 animate-fadeIn">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Upgrade Your Tech Game
        </h2>

        <p className="mt-4 text-lg md:text-xl opacity-90">
          Grab the latest gadgets with exclusive{" "}
          <span className="font-bold">TechTrove</span> deals.
        </p>
        <button className="mt-8 px-8 py-4 bg-primary-gradient text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
          Shop Deals
        </button>
      </div>
    </section>
  );
};

export default PromoBanner;
