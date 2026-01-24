"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aiden",
      role: "Software Engineer",
      text: "The quality is insane — my new setup looks absolutely professional and runs like a dream!",
    },
    {
      name: "Maya",
      role: "Graphic Designer",
      text: "Fast delivery and super supportive customer service. They really know their tech!",
    },
    {
      name: "Leo",
      role: "Tech Enthusiast",
      text: "TechTrove is my go-to shop. Their selection of rare gadgets is unmatched in the market.",
    },
    {
      name: "Sofia",
      role: "Marketing Manager",
      text: "Amazing experience — smooth checkout and lightning fast delivery even during peak seasons.",
    },
    {
      name: "Ethan",
      role: "Student",
      text: "I found exactly what I needed at a price that didn't break my bank. Highly recommended!",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Kind Words</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Backed by <span className="text-primary-gradient">Thousands</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-full">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col relative group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-8 right-8 text-primary opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold text-lg border-2 border-white shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{t.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-4 flex-grow relative z-10">
                  “{t.text}”
                </p>

                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
