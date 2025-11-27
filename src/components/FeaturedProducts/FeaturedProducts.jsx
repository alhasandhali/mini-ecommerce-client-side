"use client";

import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FeaturedProducts = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `https://techtrove-server-side.vercel.app/products`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error fetching products</p>
    );

  const topProducts = products.slice(0, 6);

  return (
    <div>
      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            Featured Products
          </h2>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {topProducts.map((product, i) => (
              <ProductCard key={i} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
