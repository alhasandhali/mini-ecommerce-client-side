"use client";

import React from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `https://techtrove-server-side.vercel.app/product/${id}`
  );
  return data;
};

const ProductDetails = () => {
  const params = useParams(); // <-- get params safely
  const { id } = params;

  const router = useRouter();

  // Fetch product with React Query
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) {
    return (
      <div className="w-11/12 max-w-4xl mx-auto mt-20 text-center">
        <p className="text-xl text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="w-11/12 max-w-4xl mx-auto mt-20 text-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(135deg,#ef444440,#ec489940,#facc1520)] max-w-6xl mx-auto my-12 p-6 md:p-12 bg-white rounded-3xl shadow-lg">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-md h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.image_url || "/placeholder.png"}
              alt={product.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3">{product.title}</h1>
            <p className="text-gray-500 mb-4">{product.short_description}</p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-[#8b5cf6]">
                ${product.price}
              </span>
              {product.rating && (
                <span className="text-yellow-500 font-semibold">
                  ★ {product.rating}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.full_description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold text-gray-600">Brand</p>
                <p>{product.brand}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Stock</p>
                <p>{product.stock} available</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Category</p>
                <p>{product.category}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Released</p>
                <p>{product.released_date}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-[#8b5cf6] rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto bg-[#8b5cf6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
