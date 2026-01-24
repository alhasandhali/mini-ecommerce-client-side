import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl poppins">T</span>
            </div>
            <span className="text-2xl font-bold tracking-tight poppins text-white">
              TechTrove
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed mb-8 max-w-sm font-medium">
            Elevating your digital experience with premium gadgets and next-gen technology. Join the future of tech today.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaFacebook /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaInstagram /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaTwitter /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaGithub /></a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-2">
          <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Shop</h6>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">Featured</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h6>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-4">
          <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h6>
          <p className="text-sm mb-6 font-medium text-slate-500 line-clamp-2">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors text-white font-medium shadow-2xl"
            />
            <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all active:scale-95 text-sm shadow-xl shadow-primary/20">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
          © {new Date().getFullYear()} TechTrove. Pure Excellence.
        </p>
        <div className="flex gap-8 text-xs font-bold text-slate-600 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
