"use client";

import Banner from "@/components/Banner/Banner";
import Features from "@/components/Features/Features";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Testimonials from "@/components/Testimonials/Testimonials";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-base-300">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Banner />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FeaturedProducts />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Features />
      </motion.div>

      <Testimonials />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PromoBanner />
      </motion.div>
    </div>
  );
}
