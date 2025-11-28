"use client";

import React from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `https://techtrove-server-side.vercel.app/product/${id}`
  );
  return data;
};

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  React.useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch product");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="w-11/12 max-w-4xl mx-auto mt-20 text-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-11/12 max-w-4xl mx-auto mt-20 text-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 md:p-12 bg-base-100 rounded-3xl shadow-lg inter">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-md h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl border-2 border-[#b9f3ff]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-primary-gradient poppins">
              {product.title}
            </h1>
            <p className="text-gray-500 mb-4 inter">
              {product.short_description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-primary-gradient poppins">
                {product.price}
                <sup className="text-primary-gradient">$</sup>
              </span>
              {product.rating && (
                <span className="text-[#f5c16c] font-semibold poppins">
                  ★ {product.rating}
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-6 inter text-justify">
              {product.full_description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold text-gray-600 poppins">Brand</p>
                <p className="inter">{product.brand}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 poppins">Stock</p>
                <p className="inter">{product.stock} available</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 poppins">Category</p>
                <p className="inter">{product.category}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600 poppins">Released</p>
                <p className="inter">{product.released_date}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-gradient text-white rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            <button
              onClick={() => router.back()}
              className="w-full bg-primary-gradient poppins text-white py-3 rounded-xl font-semibold hover:opacity-85 transition-all cursor-pointer"
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
