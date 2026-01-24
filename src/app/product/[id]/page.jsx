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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader />
        <p className="mt-4 text-slate-400 font-bold animate-pulse">Consulting Database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-sm">The item you're looking for might have been moved or is no longer available.</p>
        <button onClick={() => router.push('/all-products')} className="btn btn-primary px-8 rounded-2xl">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <div className="bg-slate-900 pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-bold text-sm uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Archives
          </button>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">{product.category}</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-wider border border-white/5">{product.brand}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 poppins tracking-tight max-w-4xl">
            {product.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery Side */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center relative group min-h-[400px] md:min-h-[600px]">
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-contain p-8 md:p-16 transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-6 right-6">
                <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center justify-center border border-slate-100">
                  <span className="text-slate-900 font-bold text-lg leading-none">{product.rating}</span>
                  <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-tighter">Stars</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Standard Pricing</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 poppins tracking-tight">${product.price}</span>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-bold ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-slate-900 font-bold text-lg mb-3">Overview</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {product.short_description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Manufacturer</span>
                  <p className="font-bold text-slate-900">{product.brand}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Release</span>
                  <p className="font-bold text-slate-900">{product.released_date || 'Q4 2023'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <button className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to System
                </button>
                <button className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95">
                  Buy it Now
                </button>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-slate-900 font-bold text-lg mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.tags?.map((tag) => (
                    <div key={tag} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <span className="text-slate-600 font-medium text-sm">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description Section */}
        <div className="mt-12 bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 border-b border-slate-50 pb-6 poppins tracking-tight">Product Dossier</h2>
          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
            {product.full_description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
