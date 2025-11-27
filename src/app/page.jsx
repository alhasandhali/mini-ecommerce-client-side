import Image from "next/image";
import Banner from "@/components/Banner/Banner";
import Features from "@/components/Features/Features";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Testimonials from "@/components/Testimonials/Testimonials";
import PromoBanner from "@/components/PromoBanner/PromoBanner";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="bg-base-300">
      <ToastContainer position="top-right" autoClose={3000} />
      <Banner />
      <FeaturedProducts />
      <Features />
      <Testimonials />
      <PromoBanner />
    </div>
  );
}
