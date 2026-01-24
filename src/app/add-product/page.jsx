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
      toast.success("Product successfully added to archives.");
    },
    onError: (error) => {
      setServerError(error?.response?.data?.message || "Protocol deployment failed");
      toast.error(error?.response?.data?.message || "Failed to add product");
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Archive Management</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 poppins tracking-tight">
            Deploy New <span className="text-primary-gradient">Asset</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Initialize product specifications and deploy to the global digital catalogue.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          {serverError && (
            <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <section>
              <h3 className="text-slate-900 font-bold text-lg mb-6 border-b border-slate-50 pb-4">Core Specifications</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { name: "sku", label: "SKU / Asset ID", required: true },
                  { name: "title", label: "Asset Title", required: true },
                  { name: "brand", label: "Manufacturer / Brand" },
                  { name: "price", label: "Asset Value ($)", type: "number", required: true },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                      placeholder={field.label}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-slate-900 font-bold text-lg mb-6 border-b border-slate-50 pb-4">Inventory Details</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "stock", label: "Unit Count", type: "number", required: true },
                  { name: "category", label: "Classification", type: "select", options: ["Laptop", "Phone", "Camera", "Watch", "Accessories"], required: true },
                  { name: "released_date", label: "Launch Date", type: "date", required: true },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        {...register(field.name, { required: field.required })}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        {...register(field.name, { required: field.required })}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-slate-900 font-bold text-lg mb-6 border-b border-slate-50 pb-4">Digital Assets & Metadata</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Visual Resource (URL)</label>
                  <input
                    {...register("image_url")}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tags (Comma Separated)</label>
                  <input
                    {...register("tags")}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                    placeholder="ai, portable, high-performance"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Archive Summary</label>
                <input
                  {...register("short_description", { required: true })}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                  placeholder="Brief description for index..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Documentation</label>
                <textarea
                  {...register("full_description", { required: true })}
                  rows={6}
                  className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 resize-none"
                  placeholder="Complete technical dossier..."
                />
              </div>
            </section>

            <div className="pt-10">
              <button
                type="submit"
                disabled={addProductMutation.isPending}
                className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale"
              >
                {addProductMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing Deployment...
                  </>
                ) : (
                  <>
                    Initialize Asset Deployment
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
