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
        `https://techtrove-server-side.vercel.app/products`
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
      <section className="md:w-11/12 m-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 overflow-hidden relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            loop
            pagination={{ clickable: true }}
            className="rounded-2xl"
          >
            {randomProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="flex flex-col md:flex-row w-full h-72 md:h-96 lg:h-112 bg-white rounded-3xl overflow-hidden transition-shadow duration-500">
                  <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 w-full md:w-1/2 h-full rounded-l-3xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 drop-shadow-lg">
                      {product.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-600 mb-5 drop-shadow-md">
                      ${product.price}
                    </p>
                    <Link href={`/product/${product._id}`}>
                      <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-max cursor-pointer">
                        View Product
                      </button>
                    </Link>
                  </div>
                  <div className="relative w-full md:w-1/2 h-64 md:h-full">
                    <Image
                      src={
                        product.image_url ||
                        "https://i.ibb.co/cjR2CTy/laptop.png"
                      }
                      alt={product.title || "Product Image"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-tr-3xl rounded-br-3xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:col-span-4 flex flex-col gap-6">
          <div
            className="relative group h-full p-0.5 rounded-3xl shadow-xl hover:shadow-2xl hover:opacity-80 transition-all duration-500
               bg-[linear-gradient(135deg,#facc15,#f59e0b,#d97706)] cursor-pointer"
          >
            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                  🔥 Special Deal
                </h2>
                <p className="text-white/90 mt-3 text-lg md:text-xl leading-relaxed">
                  Get <span className="font-bold">20% OFF</span> on selected
                  laptops!
                </p>
              </div>
              <button className="mt-5 bg-white text-amber-600 font-semibold w-max px-5 py-3 rounded-xl shadow-lg hover:bg-amber-100 hover:shadow-2xl active:scale-95 transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="relative group h-full p-0.5 rounded-3xl shadow-xl hover:shadow-2xl hover:opacity-80 transition-all duration-500
               bg-[linear-gradient(135deg,#ef4444,#ec4899,#8b5cf6)] cursor-pointer"
          >
            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                  🎁 Mega Offer
                </h2>
                <p className="text-white/90 mt-3 text-lg md:text-xl leading-relaxed">
                  Buy 1 get 1 FREE on accessories!
                </p>
              </div>
              <button className="mt-5 bg-white text-pink-600 font-semibold w-max px-5 py-3 rounded-xl shadow-lg hover:bg-pink-100 hover:shadow-2xl active:scale-95 transition-all duration-300">
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
