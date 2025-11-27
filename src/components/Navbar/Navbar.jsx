"use client";

import React from "react";
import Link from "next/link";
import "./Navbar.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const navLinkStyle = "text-sm md:text-lg rounded-none";

  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const user = session?.user;

  return (
    <div className="bg-base-100 sticky top-0 z-50 shadow">
      <div className="navbar md:w-11/12 m-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {isLoading ? (
                  <Loader></Loader>
                ) : user ? (
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost">
                      {user.name || user.email}
                    </button>
                    <ul
                      tabIndex="-1"
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <Link
                          href="/add-product"
                          className="block w-full text-sm"
                        >
                          Add Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/manage-products"
                          className="block w-full text-sm"
                        >
                          Manage Products
                        </Link>
                      </li>
                      <li>
                        <a
                          className="block w-full text-sm"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </li>
              <li>
                <Link href="/all-products" className={navLinkStyle}>
                  Products
                </Link>
              </li>
              <li>
                <details>
                  <summary className={navLinkStyle}>Categories</summary>
                  <ul className="p-2 z-10">
                    <li>
                      <Link href="/all-products?category=Laptop">Laptop</Link>
                    </li>
                    <li>
                      <Link href="/all-products?category=Phone">Phone</Link>
                    </li>
                    <li>
                      <Link href="/all-products?category=Camera">Camera</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/about" className={navLinkStyle}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={navLinkStyle}>
                  Contact
                </Link>
              </li>
              <li>
                {isLoading ? (
                  <Loader></Loader>
                ) : user ? (
                  ""
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="btn">
                      Login
                    </Link>
                    <Link href="/signup" className="btn">
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <Link href="/" className="text-3xl font-extrabold text-[#8b5cf6]">
            TechTrove
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/all-products" className={navLinkStyle}>
                Products
              </Link>
            </li>
            <li>
              <details>
                <summary className={navLinkStyle}>Categories</summary>
                <ul className="p-2 z-10">
                  <li>
                    <Link href="/all-products?category=Laptop">Laptop</Link>
                  </li>
                  <li>
                    <Link href="/all-products?category=Phone">Phone</Link>
                  </li>
                  <li>
                    <Link href="/all-products?category=Camera">Camera</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/about" className={navLinkStyle}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={navLinkStyle}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isLoading ? (
            <Loader></Loader>
          ) : user ? (
            <div className="dropdown dropdown-end hidden md:block">
              <button tabIndex={0} className="btn btn-ghost">
                {user.name || user.email}
              </button>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/add-product" className="block w-full text-sm">
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-products"
                    className="block w-full text-sm"
                  >
                    Manage Products
                  </Link>
                </li>
                <li>
                  <a
                    className="block w-full text-sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login" className="btn">
                Login
              </Link>
              <Link href="/signup" className="btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
