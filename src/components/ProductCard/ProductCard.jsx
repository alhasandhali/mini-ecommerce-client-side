"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { _id, title, price, image_url, brand, stock, rating, category } =
    product;

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error("Product out of stock!");
      return;
    }
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="w-full p-2">
      <div className="card">
        <div className="card__shine"></div>
        <div className="card__glow"></div>
        <div className="card__content">
          <div className="card__badge capitalize">★ {rating}</div>
          <div className="card__image h-44 md:h-52 relative">
            <Image
              src={image_url}
              alt={title}
              fill
              placeholder="blur"
              blurDataURL="/loader.png"
              loader={({ src }) => src}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="card__title">{title}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="card__description">
              Brand: <span className="font-bold">{brand}</span>
            </p>
            <p className="card__description">
              Category: <span className="font-bold">{category}</span>
            </p>
          </div>
          <div className="card__footer mt-3 flex justify-between items-center">
            <div className="card__quantity">
              $<span className="font-bold">{price}</span>
            </div>
            <div className="flex space-x-2">
              <Link href={`/product/${_id}`} className="card__button">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
