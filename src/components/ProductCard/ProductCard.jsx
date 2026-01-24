"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { _id, title, price, image_url, brand, stock, rating, category } =
    product;

  return (
    <div className="group bg-white rounded-[32px] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full relative">
      {/* Category Badge - Small Hover Visual */}
      <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
        <span className="bg-slate-900 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{category}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-slate-50">
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/80 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2 py-1 rounded-lg border border-white/50 flex items-center gap-1 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating}
          </div>
        </div>

        {stock <= 0 && (
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] z-[5] flex items-center justify-center">
            <span className="bg-rose-500 text-white px-5 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl">Archived</span>
          </div>
        )}

        <div className="relative w-4/5 h-4/5 transition-transform duration-700 group-hover:scale-110">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest block">{brand}</span>
            <div className="h-px bg-slate-100 flex-grow"></div>
          </div>
          <h3 className="text-slate-900 font-bold text-lg line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-tight poppins">
            {title}
          </h3>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50 relative">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Standard Unit</span>
            <span className="text-2xl font-extrabold text-slate-900 poppins tracking-tighter">${price}</span>
          </div>
          <Link
            href={`/product/${_id}`}
            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-all duration-300 active:scale-95 shadow-xl shadow-slate-200 hover:shadow-primary/25"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
