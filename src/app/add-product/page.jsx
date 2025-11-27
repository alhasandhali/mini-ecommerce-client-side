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
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl border border-white/40">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
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
          { name: "price", label: "Price ($)", type: "number", required: true },
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
            <label className="font-medium mb-1">{field.label}</label>
            <input
              type={field.type || "text"}
              step={field.step}
              {...register(
                field.name,
                field.required ? { required: `${field.label} is required` } : {}
              )}
              className="w-full border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
        <div>
          <label className="font-medium mb-1">Relevant</label>
          <select
            {...register("relevant")}
            className="w-full border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
          <label className="font-medium mb-1">Full Description</label>
          <textarea
            {...register("full_description", {
              required: "Full description is required",
            })}
            rows="4"
            className="w-full border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-md w-full md:w-auto flex items-center justify-center gap-2"
            disabled={addProductMutation.isLoading}
          >
            {addProductMutation.isLoading ? <Loader /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
