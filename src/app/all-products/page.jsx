"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "@/components/ProductCard/ProductCard";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProducts = async (category, search) => {
  let url = `https://techtrove-server-side.vercel.app/products?`;
  if (category) url += `category=${category}&`;
  if (search) url += `search=${search}&`;

  const response = await axios.get(url);
  return response.data;
};

const AllProducts = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", category, search],
    queryFn: () => fetchProducts(category, search),
  });

  const categories = ["Laptop", "Phone", "Camera", "Accessories", "Watch"];

  if (isError) {
    toast.error(`Failed to fetch products: ${error.message}`);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Explorer</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 poppins tracking-tight">
            {category ? <span className="text-primary-gradient">{category}</span> : "All"} Products
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Discover the latest in high-performance technology. Filtered and curated for your digital lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center mb-12">
          <div className="relative flex-grow w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search for gear, brands, or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide justify-center md:justify-start">
          <button
            onClick={() => setCategory("")}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${!category ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            All Gear
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${category === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <p className="mt-4 text-slate-400 font-bold animate-pulse">Scanning Archive...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No gear found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">We couldn't find anything matching your search. Try different keywords or categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
