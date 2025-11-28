"use client";

import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeaturedProducts = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `https://techtrove-server-side.vercel.app/products`
      );
      return res.data;
    },
    onError: (err) => {
      toast.error("Failed to fetch products!");
    },
  });

  if (isLoading) return <Loader />;

  if (isError) return null;

  const topProducts = products.slice(0, 6);

  return (
    <div>
      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl poppins font-bold text-center mb-14 text-primary-gradient">
            Featured Products
          </h2>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {topProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
