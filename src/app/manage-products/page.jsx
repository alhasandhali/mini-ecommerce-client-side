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
      document.getElementById("edit_modal").close();
      toast.success("Product updated successfully!");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update product");
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
      toast.success("Product deleted successfully!");
    },
    onError: (err) => {
      setDeleteError(err?.response?.data?.message || "Failed to delete");
      toast.error(err?.response?.data?.message || "Failed to delete");
    },
  });

  const onSubmit = (data) => updateProductMutation.mutate(data);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  if (isError)
    return <p className="text-center py-10 text-red-500">{error.message}</p>;

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-10 inter">
      <h1 className="text-3xl md:text-4xl font-bold mb-1 text-primary-gradient poppins">
        My Products
      </h1>
      <div className="w-full h-0.5 bg-primary-gradient rounded-2xl mb-6"></div>

      {deleteError && (
        <p className="text-red-500 mb-4 text-center">{deleteError}</p>
      )}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-base-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Image", "Title", "Price", "Stock", "Category", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>

                <td className="poppins px-6 py-4 font-medium text-gray-900">
                  <Link
                    href={`/product/${product._id}`}
                    className="hover:text-primary hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>

                <td className="px-6 py-4 font-bold text-amber-600">
                  {product.price}
                  <sup>$</sup>
                </td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4 flex items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-error hover:text-white"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "This product will be deleted permanently!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteMutation.mutate(product._id, {
                            onSuccess: () => {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted successfully.",
                                icon: "success",
                              });
                            },
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog
        id="edit_modal"
        className="modal modal-bottom sm:modal-middle"
        open={!!editingProduct}
      >
        <div className="modal-box max-h-[90vh] max-w-3xl overflow-y-auto bg-primary-gradient">
          <h1 className="poppins text-3xl font-bold text-white text-center mb-6">
            Update Product
          </h1>

          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:text-black"
            onClick={() => setEditingProduct(null)}
          >
            ✕
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { name: "sku", label: "SKU", required: true },
              { name: "title", label: "Title", required: true },
              { name: "short_description", label: "Short Description" },
              { name: "price", label: "Price ($)", type: "number" },
              { name: "priority", label: "Priority", type: "number" },
              { name: "image_url", label: "Image URL" },
              { name: "brand", label: "Brand" },
              { name: "stock", label: "Stock", type: "number" },
              { name: "tags", label: "Tags (comma separated)" },
            ].map((field, index) => (
              <div key={index}>
                <label className="text-white mb-1">{field.label}</label>
                <input
                  {...register(
                    field.name,
                    field.required
                      ? { required: `${field.label} is required` }
                      : {}
                  )}
                  type={field.type || "text"}
                  className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                  placeholder={`Enter ${field.label}...`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-white mb-1">Full Description</label>
              <textarea
                {...register("full_description")}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter full description..."
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={updateProductMutation.isLoading}
                className="poppins w-full py-3 rounded-xl bg-white text-black font-semibold text-lg hover:bg-white/90 transition-all duration-300 cursor-pointer"
              >
                {updateProductMutation.isLoading
                  ? "Updating..."
                  : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
