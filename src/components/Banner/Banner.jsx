"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";

const Banner = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://techtrove-server-side.vercel.app/products"
      );
      return res.data;
    },
  });

  if (isError) {
    toast.error("Failed to fetch products!");
  }

  if (isLoading) return <div className="h-[500px] flex items-center justify-center"><Loader /></div>;

  const sliderProducts = products.slice(0, 4);

  return (
    <div className="py-6 sm:py-10 bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Main Swiper Section */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true, dynamicBullets: true }}
            className="h-[480px] sm:h-[520px] lg:h-[550px]"
          >
            {sliderProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="relative w-full h-full flex flex-col md:flex-row bg-white group select-none overflow-hidden">
                  {/* Content Section */}
                  <div className="relative z-20 flex flex-col justify-center px-6 sm:px-12 md:pl-16 md:pr-4 w-full md:w-[55%] bg-white md:bg-gradient-to-r md:from-white md:via-white md:to-transparent pt-10 sm:pt-16 md:pt-0 pb-6 md:pb-0">
                    <div className="max-w-md lg:max-w-lg">
                      <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 block animate-fadeIn">
                        Featured Collection
                      </span>
                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-[1.15] sm:leading-tight">
                        {product.title}
                      </h2>
                      <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <span className="text-xl sm:text-3xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-base sm:text-xl text-slate-400 line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>
                      <Link href={`/product/${product._id}`}>
                        <button className="btn btn-primary sm:btn-md btn-sm px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 w-max">
                          Shop Now
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                  {/* Image Section */}
                  <div className="relative z-10 w-full md:w-[45%] h-full min-h-[220px] md:min-h-0 flex items-center justify-center md:pr-10 p-6 md:p-4">
                    <div className="relative w-full h-full max-h-[200px] sm:max-h-[300px] md:max-h-none md:w-[95%] md:h-[85%] transition-all duration-1000 group-hover:scale-105">
                      <Image
                        src={product.image_url || "https://i.ibb.co/cjR2CTy/laptop.png"}
                        alt={product.title}
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Banner Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
          <div className="relative h-1/2 rounded-3xl overflow-hidden group cursor-pointer bg-primary-gradient p-8 text-white shadow-xl shadow-blue-500/20">
            <div className="relative z-10">
              <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">Limited Time</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 leading-tight">Summer Mega<br />Clearance Sale</h3>
              <p className="mt-2 text-white/90 font-medium">Up to 60% OFF</p>
              <button className="mt-6 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Shop Deals <span className="text-xl">→</span>
              </button>
            </div>
            {/* Abstract Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
          </div>

          <div className="relative h-1/2 rounded-3xl overflow-hidden group cursor-pointer bg-slate-900 p-8 text-white shadow-xl">
            <div className="relative z-10">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">New Arrival</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 leading-tight">Pro Accessories<br />Collection</h3>
              <p className="mt-2 text-slate-400 font-medium">Free Shipping Included</p>
              <button className="mt-6 font-bold flex items-center gap-2 hover:gap-3 transition-all text-accent">
                Explore Now <span className="text-xl">→</span>
              </button>
            </div>
            {/* Abstract Background Elements */}
            <div className="absolute top-[20%] right-[-10%] w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:translate-x-4 transition-transform duration-500"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
