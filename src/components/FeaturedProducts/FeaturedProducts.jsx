"use client";

import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import Link from "next/link";

const FeaturedProducts = () => {
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

  if (isLoading) return <div className="py-20 flex justify-center"><Loader /></div>;
  if (isError) return null;

  const topProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
              Curated for you
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Trending <span className="text-primary-gradient">Gear</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Explore our hand-picked selection of top-rated tech essentials designed to elevate your everyday experience.
            </p>
          </div>
          <Link href="/all-products" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300 border-b-2 border-primary/20 hover:border-primary pb-1">
            Browse All Collection
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {topProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
