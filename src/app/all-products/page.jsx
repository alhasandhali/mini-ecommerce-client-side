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
    refetch,
  } = useQuery({
    queryKey: ["products", category, search],
    queryFn: () => fetchProducts(category, search),
  });

  const categories = ["Laptop", "Phone", "Camera"];

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isError) {
    toast.error(`Failed to fetch products: ${error.message}`);
  }

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#8b5cf6] border-b-2 pb-2">
        {category ? `${category} Products` : "All Products"}
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <p className="text-center text-gray-500 py-10 text-lg">
          No products found.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
