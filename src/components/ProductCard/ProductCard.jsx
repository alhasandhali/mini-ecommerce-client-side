"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProductCard.css";

// "_id": "69267bff82bb246f816277e4",
//     "sku": "APL-MBA-M2-13",
//     "title": "MacBook Air 13 (M2)",
//     "short_description": "Apple's thin and silent fanless laptop.",
//     "full_description": "The MacBook Air M2 features a lightweight design, bright display, and fast M2 chip, making it a strong option for school, work, and creative tasks.",
//     "price": 1090,
//     "released_date": "2022-07-01T00:00:00.000Z",
//     "priority": 1,
//     "relevant": false,
//     "image_url": "https://i.ibb.co.com/cjR2CTy/laptop.png",
//     "brand": "Apple",
//     "stock": 25,
//     "rating": 4.8,
//     "tags": [
//       "apple",
//       "m2",
//       "lightweight"
//     ],
//     "category": "Laptop"

const ProductCard = ({ product }) => {
  const { _id, title, price, image_url, brand, stock, rating, category } =
    product;

  return (
    <div className="w-full p-2">
      {/* From Uiverse.io by SachinKumar666 */}
      <div to="/" className="card">
        <div className="card__shine"></div>
        <div className="card__glow"></div>
        <div className="card__content">
          <div className="card__badge capitalize">★ {rating}</div>
          <div className="card__image h-44 md:h-52">
            <div className="relative h-full w-full">
              <Image src={image_url} alt={title} fill />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="card__title">{title}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="card__description">
              Brand: <span className="font-bold">{brand}</span>
            </p>
            <p className="card__description">
              Category: <span className="font-bold">{category}</span>
            </p>
          </div>
          <div className="card__footer">
            <div className="card__quantity">
              $<span className="font-bold">{price}</span>
            </div>
            <Link href={`/product/${_id}`} className="card__button">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
