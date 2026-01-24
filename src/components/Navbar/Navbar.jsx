"use client";

import React from "react";
import Link from "next/link";
import "./Navbar.css";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoading = status === "loading";
  const user = session?.user;

  const navLinkStyle = "inter text-sm font-bold tracking-wide transition-all duration-300 relative py-2 px-1";
  const activeClass = "text-primary";
  const inactiveClass = "text-slate-600 hover:text-slate-900";

  return (
    <div className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden p-2 mr-2 hover:bg-slate-100 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-3xl w-64 border border-slate-100 animate-fadeIn">
              <li className="mb-2"><Link href="/all-products" className="font-bold p-3 rounded-2xl">Products</Link></li>
              <li className="mb-2"><Link href="/about" className="font-bold p-3 rounded-2xl">About</Link></li>
              <li className="mb-4"><Link href="/contact" className="font-bold p-3 rounded-2xl">Contact</Link></li>
              <div className="divider opacity-50"></div>
              {user ? (
                <>
                  <li className="mb-2"><Link href="/add-product" className="p-3 rounded-2xl">Add Product</Link></li>
                  <li className="mb-2"><Link href="/manage-products" className="p-3 rounded-2xl">Manage Products</Link></li>
                  <li className="mt-4"><button onClick={() => signOut()} className="btn btn-error btn-sm rounded-xl text-white">Sign Out</button></li>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/login" className="btn btn-primary rounded-2xl">Sign in</Link>
                  <Link href="/signup" className="btn btn-outline rounded-2xl">Sign Up</Link>
                </div>
              )}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-bold text-xl poppins">T</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold tracking-tight poppins">
              <span className="text-slate-900">Tech</span>
              <span className="text-primary">Trove</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-10">
            <li>
              <Link href="/all-products" className={`${navLinkStyle} ${pathname === "/all-products" ? activeClass : inactiveClass}`}>
                Products
                {pathname === "/all-products" && <span className="absolute bottom-0 left-1 right-1 h-1 bg-primary rounded-full"></span>}
              </Link>
            </li>
            <li>
              <Link href="/about" className={`${navLinkStyle} ${pathname === "/about" ? activeClass : inactiveClass}`}>
                About
                {pathname === "/about" && <span className="absolute bottom-0 left-1 right-1 h-1 bg-primary rounded-full"></span>}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`${navLinkStyle} ${pathname === "/contact" ? activeClass : inactiveClass}`}>
                Contact
                {pathname === "/contact" && <span className="absolute bottom-0 left-1 right-1 h-1 bg-primary rounded-full"></span>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {isLoading ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="loading loading-spinner loading-sm text-primary"></span>
            </div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-all overflow-hidden avatar active:scale-90">
                {user.image ? (
                  <img src={user.image} alt={user.name} />
                ) : (
                  <div className="bg-primary-gradient w-full h-full flex items-center justify-center text-white font-bold">{user.name?.charAt(0)}</div>
                )}
              </button>
              <ul tabIndex={0} className="mt-4 z-[1] p-6 shadow-2xl menu menu-sm dropdown-content bg-white rounded-[32px] w-72 border border-slate-100 animate-fadeIn">
                <div className="flex flex-col mb-6 p-4 bg-slate-50 rounded-2xl">
                  <p className="text-slate-900 font-bold text-base truncate">{user.name || "Administrator"}</p>
                  <p className="text-slate-500 text-xs font-medium truncate">{user.email}</p>
                </div>
                <li><Link href="/add-product" className="py-3 px-4 font-bold text-slate-700 rounded-xl mb-1">Add Product</Link></li>
                <li><Link href="/manage-products" className="py-3 px-4 font-bold text-slate-700 rounded-xl mb-4">Manage Products</Link></li>
                <li>
                  <button onClick={() => signOut()} className="w-full py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-600 hover:text-white transition-all text-center flex justify-center">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 px-4 rounded-xl hover:bg-slate-50">
                Sign in
              </Link>
              <Link href="/signup" className="hidden sm:flex btn btn-primary px-6 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all border-none">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
