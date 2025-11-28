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

  if (isLoading) return <Loader />;

  const randomProducts = products.slice(0, 3);

  return (
    <div className="py-8">
      <section className="w-11/12 m-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="md:col-span-8 relative overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            loop
            pagination={{ clickable: true }}
            className="rounded-2xl"
          >
            {randomProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div
                  className="
                    flex flex-col-reverse md:flex-row 
                    w-full h-[420px] sm:h-[460px] md:h-[450px]
                    bg-white rounded-3xl overflow-hidden 
                    transition-shadow duration-500 shadow-md
                  "
                >
                  <div
                    className="
                      flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-14
                      w-full md:w-1/2 h-1/2 md:h-full
                    "
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-gradient mb-3 leading-tight">
                      {product.title}
                    </h2>

                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-soft-gradient mb-6 ml-5">
                      {product.price}
                      <sup className="text-soft-gradient">$</sup>
                    </p>

                    <Link href={`/product/${product._id}`}>
                      <button
                        className="
                          bg-primary-gradient 
                          text-white font-semibold 
                          px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 
                          rounded-xl shadow-lg hover:shadow-2xl 
                          transition-all duration-300 w-max cursor-pointer hover:opacity-85
                        "
                      >
                        View Product
                      </button>
                    </Link>
                  </div>
                  <div
                    className="
                      relative w-full md:w-1/2 h-60 sm:h-72 md:h-[420px] lg:h-[480px] xl:h-[520px]
                    "
                  >
                    <Image
                      src={
                        product.image_url ||
                        "https://i.ibb.co/cjR2CTy/laptop.png"
                      }
                      alt={product.title || "Product Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="
                        object-contain rounded-t-3xl md:rounded-none md:rounded-r-3xl
                        transition-transform duration-500 p-3 sm:p-4 md:p-6
                      "
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:col-span-4 flex flex-col gap-6">
          <div
            className="
              relative group h-full w-full py-5 rounded-3xl shadow-xl 
              hover:shadow-2xl hover:opacity-90 transition-all duration-500
              bg-linear-to-br from-primary via-accent to-softAccent
              cursor-pointer flex items-center justify-center
            "
          >
            <div className="flex flex-col items-center justify-center text-white text-center px-5">
              <h2 className="text-2xl md:text-3xl font-extrabold drop-shadow">
                🔥 Special Deal
              </h2>
              <p className="mt-3 text-lg md:text-xl leading-relaxed">
                Get <span className="font-bold">20% OFF</span> on selected
                laptops!
              </p>
              <button className="mt-5 bg-white text-primary font-semibold w-max px-5 py-3 rounded-xl shadow-lg hover:bg-softAccent hover:shadow-2xl active:scale-95 transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="
              relative group h-full w-full py-5 rounded-3xl shadow-xl 
              hover:shadow-2xl hover:opacity-90 transition-all duration-500
              bg-linear-to-br from-accent via-softAccent to-primaryNeutral
              cursor-pointer flex items-center justify-center
            "
          >
            <div className="flex flex-col items-center justify-center text-white text-center px-5">
              <h2 className="text-2xl md:text-3xl font-extrabold drop-shadow">
                🎁 Mega Offer
              </h2>
              <p className="mt-3 text-lg md:text-xl leading-relaxed">
                Buy 1 get 1 <span className="font-bold">FREE</span> on
                accessories!
              </p>
              <button className="mt-5 bg-white text-accent font-semibold w-max px-5 py-3 rounded-xl shadow-lg hover:bg-softAccent hover:shadow-2xl active:scale-95 transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
