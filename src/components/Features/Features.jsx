import Link from "next/link";
import React from "react";

const Features = () => {
  const features = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      desc: "Quick & secure shipping worldwide.",
    },
    {
      icon: "💎",
      title: "Quality Products",
      desc: "Only the best tech gadgets.",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      desc: "Your data is always protected.",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      desc: `We're here whenever you need help.`,
    },
  ];

  return (
    <section className="py-10 bg-linear-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl poppins font-bold text-center mb-10">
          <span className="text-primary-gradient">Why Choose</span>{" "}
          <span>TechTrove?</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                bg-white/60 
                backdrop-blur-xl 
                p-8 rounded-2xl shadow-md 
                hover:shadow-xl 
                hover:-translate-y-2 
                transition-all 
                duration-300 
                border border-white/40
                animate-fadeIn
              "
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-softGray text-white text-4xl shadow-lg border-2 border-primary">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">
                {item.title}
              </h3>
              <p className="text-center opacity-70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
