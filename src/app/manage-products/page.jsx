"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";

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

  // Populate form when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      // Load only fields that exist in the form
      [
        "sku",
        "title",
        "short_description",
        "full_description",
        "price",
        "released_date",
        "priority",
        "image_url",
        "brand",
        "stock",
        "rating",
        "category",
        "relevant",
        "tags",
      ].forEach((field) => {
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

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (formData) => {
      // Remove _id so MongoDB won't throw an error
      const { _id, ...originalData } = editingProduct;

      const sanitized = {
        sku: formData.sku,
        title: formData.title,
        short_description: formData.short_description,
        full_description: formData.full_description,
        price: parseFloat(formData.price),
        released_date: formData.released_date,
        priority: parseInt(formData.priority) || 0,
        image_url: formData.image_url,
        brand: formData.brand,
        stock: parseInt(formData.stock),
        rating: parseFloat(formData.rating),
        category: formData.category,
        relevant: formData.relevant === "true",
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
    },
    onError: (error) => {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to update product");
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `https://techtrove-server-side.vercel.app/product/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      setDeleteError(
        err?.response?.data?.message || "Failed to delete product"
      );
    },
  });

  const onSubmit = (data) => {
    updateProductMutation.mutate(data);
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-700">Loading...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">{error.message}</p>;

  return (
    <div className="w-11/12 max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>
      {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}

      {/* Products Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={product.image_url || "/placeholder.png"}
                      alt={product.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-amber-600 font-bold">
                  ${product.price}
                </td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this product?")
                      ) {
                        deleteMutation.mutate(product._id);
                      }
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

      {/* Edit Modal */}
      <dialog
        id="edit_modal"
        className="modal modal-bottom sm:modal-middle"
        open={!!editingProduct}
      >
        <div className="modal-box overflow-y-auto max-h-[90vh]">
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h1>

          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setEditingProduct(null)}
          >
            ✕
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
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
                name: "full_description",
                label: "Full Description",
                required: true,
                type: "textarea",
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
              { name: "rating", label: "Rating", type: "number", step: "0.1" },
              { name: "tags", label: "Tags (comma-separated)" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="font-medium mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    {...register(
                      field.name,
                      field.required
                        ? { required: `${field.label} is required` }
                        : {}
                    )}
                    defaultValue={editingProduct?.[field.name] || ""}
                    rows={3}
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    step={field.step}
                    {...register(
                      field.name,
                      field.required
                        ? { required: `${field.label} is required` }
                        : {}
                    )}
                    defaultValue={editingProduct?.[field.name] || ""}
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Relevant */}
            <div>
              <label className="font-medium mb-1">Relevant</label>
              <select
                {...register("relevant")}
                defaultValue={editingProduct?.relevant ? "true" : "false"}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="font-medium mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue={editingProduct?.category || ""}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Camera">Camera</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
            >
              {updateProductMutation.isLoading
                ? "Updating..."
                : "Update Product"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageProducts;
