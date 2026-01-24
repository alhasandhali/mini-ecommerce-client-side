"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const queryClient = useQueryClient();
  const [deleteError, setDeleteError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingProduct) {
      const editableFields = [
        "sku",
        "title",
        "short_description",
        "full_description",
        "price",
        "priority",
        "image_url",
        "brand",
        "stock",
        "tags",
      ];

      editableFields.forEach((field) => {
        if (field === "tags") {
          setValue("tags", editingProduct.tags?.join(", ") || "");
        } else {
          setValue(field, editingProduct[field]);
        }
      });
    } else {
      reset();
    }
  }, [editingProduct, setValue, reset]);

  const updateProductMutation = useMutation({
    mutationFn: async (formData) => {
      const sanitized = {
        sku: formData.sku,
        title: formData.title,
        short_description: formData.short_description,
        full_description: formData.full_description,
        price: parseFloat(formData.price),
        priority: parseInt(formData.priority) || 0,
        image_url: formData.image_url,
        brand: formData.brand,
        stock: parseInt(formData.stock),
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
      };

      const response = await axios.patch(
        `https://techtrove-server-side.vercel.app/product/${editingProduct._id}`,
        sanitized
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setEditingProduct(null);
      toast.success("Product successfully re-calibrated.");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Calibration failure");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `https://techtrove-server-side.vercel.app/product/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Asset decommissioned successfully.");
    },
    onError: (err) => {
      setDeleteError(err?.response?.data?.message || "Decommission failure");
      toast.error(err?.response?.data?.message || "Failed to delete");
    },
  });

  const onSubmit = (data) => updateProductMutation.mutate(data);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader />
        <p className="mt-4 text-slate-400 font-bold animate-pulse">Syncing Inventory Ledger...</p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sync Error</h2>
        <p className="text-slate-500 max-w-sm mx-auto mb-8">{error.message}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary px-8 rounded-2xl">Retry Sync</button>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <div className="bg-slate-900 pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Central Command</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 poppins tracking-tight">
            Inventory <span className="text-primary-gradient">Ledger</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Manage, modify, and decommission digital assets across the global network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100 italic">
                <tr>
                  {["Asset", "Identity", "Valuation", "Inventory", "Actions"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-8 py-6 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {products.map((product) => (
                  <tr key={product._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{product.brand}</span>
                        <Link
                          href={`/product/${product._id}`}
                          className="text-slate-900 font-bold hover:text-primary transition-colors text-lg"
                        >
                          {product.title}
                        </Link>
                        <span className="text-slate-400 text-xs font-medium mt-1">{product.category}</span>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <span className="text-xl font-extrabold text-slate-900">${product.price}</span>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                        <span className="font-bold text-slate-700">{product.stock} Units</span>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-primary transition-all shadow-lg shadow-slate-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Terminate Asset?",
                              text: "This action will permanently erase the product from global archives.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#f43f5e",
                              cancelButtonColor: "#64748b",
                              confirmButtonText: "Permanently Delete",
                              background: "#ffffff",
                              customClass: {
                                popup: 'rounded-[32px] p-8',
                                confirmButton: 'rounded-xl px-6 py-3 font-bold',
                                cancelButton: 'rounded-xl px-6 py-3 font-bold'
                              }
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMutation.mutate(product._id);
                              }
                            });
                          }}
                          className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 animate-fadeIn bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 relative">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold"
            >✕</button>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 poppins tracking-tight">Recalibrate Asset</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { name: "sku", label: "SKU / Asset ID", required: true },
                  { name: "title", label: "Asset Title", required: true },
                  { name: "brand", label: "Manufacturer" },
                  { name: "price", label: "Valuation ($)", type: "number" },
                  { name: "stock", label: "Inventory Count", type: "number" },
                  { name: "priority", label: "Sync Priority", type: "number" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <input
                      {...register(field.name, field.required ? { required: true } : {})}
                      type={field.type || "text"}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Visual Resource URL</label>
                <input
                  {...register("image_url")}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tags (Comma Separated)</label>
                <input
                  {...register("tags")}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Dossier</label>
                <textarea
                  {...register("full_description")}
                  rows={8}
                  className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="submit" disabled={updateProductMutation.isPending} className="flex-grow py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 disabled:grayscale disabled:opacity-50">
                  {updateProductMutation.isPending ? 'Propagating Changes...' : 'Synchronize Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
