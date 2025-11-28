"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState("");

  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      const response = await axios.post(
        `https://techtrove-server-side.vercel.app/product`,
        newProduct
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      setServerError(error?.response?.data?.message || "Failed to add product");
      toast.error(error?.response?.data?.message || "Failed to add product", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      rating: parseFloat(data.rating),
      relevant: data.relevant === "true",
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
      priority: parseInt(data.priority) || 0,
    };
    addProductMutation.mutate(formattedData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-gradient p-6 inter">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/70">
        <h1 className="poppins text-3xl font-bold text-white text-center mb-6">
          Add New Product
        </h1>
        {serverError && (
          <p className="text-red-500 mb-4 text-center font-medium">
            {serverError}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { name: "sku", label: "SKU", required: true },
            { name: "title", label: "Title", required: true },
            {
              name: "short_description",
              label: "Short Description",
              required: true,
            },
            {
              name: "price",
              label: "Price ($)",
              type: "number",
              required: true,
            },
            {
              name: "released_date",
              label: "Released Date",
              type: "date",
              required: true,
            },
            { name: "priority", label: "Priority", type: "number" },
            { name: "image_url", label: "Image URL" },
            { name: "brand", label: "Brand" },
            { name: "stock", label: "Stock", type: "number", required: true },
            {
              name: "rating",
              label: "Rating (0 - 5)",
              type: "number",
              step: "0.1",
            },
            { name: "tags", label: "Tags (comma-separated)" },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-white mb-1">{field.label}</label>
              <input
                type={field.type || "text"}
                step={field.step}
                {...register(
                  field.name,
                  field.required
                    ? { required: `${field.label} is required` }
                    : {}
                )}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                placeholder={`Enter ${field.label}...`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
          <div>
            <label className="text-white font-medium mb-1">Relevant</label>
            <select
              {...register("relevant")}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-white font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select Category</option>
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
              <option value="Camera">Camera</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="text-white font-medium mb-1">
              Full Description
            </label>
            <textarea
              {...register("full_description", {
                required: "Full description is required",
              })}
              rows="4"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Full Description..."
            ></textarea>
            {errors.full_description && (
              <p className="text-red-500 text-sm">
                {errors.full_description.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="poppins w-full py-3 rounded-xl bg-white text-black font-semibold text-lg hover:bg-white/90 transition-all duration-300 cursor-pointer"
              disabled={addProductMutation.isLoading}
            >
              {addProductMutation.isLoading ? <Loader /> : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
