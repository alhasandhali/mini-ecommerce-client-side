"use client";

import React from "react";

const About = () => {
  return (
    <div className="w-11/12 max-w-5xl mx-auto mt-12 p-6 md:p-12 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-8 text-center">
        About TechTrove
      </h1>

      <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
        <p>
          TechTrove is your one-stop online store for high-quality electronics,
          including laptops, phones, and cameras. Our mission is to provide
          premium tech products with reliable service and competitive prices.
        </p>

        <p>
          We carefully curate our products to ensure every item meets our
          standards for performance, durability, and value. Whether you’re a
          professional, a student, or just a tech enthusiast, TechTrove has the
          right product for you.
        </p>

        <p>
          Our team is passionate about technology and committed to delivering an
          outstanding online shopping experience. From easy navigation to secure
          payments and fast shipping, we take care of every step so you can
          focus on enjoying your new gadgets.
        </p>

        <div className="mt-8 p-6 bg-linear-to-r from-blue-200 via-blue-100 to-white rounded-2xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-blue-700">
            Our Vision
          </h2>
          <p>
            To become a trusted online tech store that connects customers with
            the best electronics while providing exceptional customer service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
