"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aiden",
      text: "The quality is insane — my new headphones are a beast!",
    },
    {
      name: "Maya",
      text: "Fast delivery and super supportive customer service.",
    },
    {
      name: "Leo",
      text: "TechTrove is my go-to shop for all things tech.",
    },
    {
      name: "Sofia",
      text: "Amazing experience — smooth checkout and fast delivery.",
    },
    {
      name: "Ethan",
      text: "I found exactly what I needed at a great price!",
    },
    {
      name: "Olivia",
      text: "User-friendly website and quick shipping. Love it!",
    },
    {
      name: "Noah",
      text: "Excellent customer support — they helped me pick the perfect laptop.",
    },
    {
      name: "Ava",
      text: "The product quality exceeded my expectations!",
    },
    {
      name: "Lucas",
      text: "Fast, reliable, and hassle-free shopping experience.",
    },
    {
      name: "Chloe",
      text: "I’ll definitely be buying from TechTrove again!",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          autoplay={{ delay: 3000 }}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          className="w-full py-10"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide
              key={i}
              className="bg-base-300 rounded-xl p-8 shadow-lg max-w-xs md:max-w-sm"
            >
              <p className="italic text-lg opacity-80 mb-4 text-center">
                “{t.text}”
              </p>
              <h3 className="font-semibold text-xl text-center">— {t.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
