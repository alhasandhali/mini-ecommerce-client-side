"use client";

import React from "react";
import Link from "next/link";
import "./Navbar.css";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const navLinkStyle =
    "inter text-sm md:text-lg rounded-none hover:text-primary hover:border-b-2 hover:border-primary transition-all duration-300";

  const { data: session, status } = useSession();
  const pathname = usePathname();

  console.log("Current path: ", pathname);

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
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="260"
              height="60"
              viewBox="0 0 260 60"
              role="img"
              aria-label="TechTrove logo"
            >
              <title className="">TechTrove</title>
              <defs>
                <linearGradient id="cyanGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#00C4FF" />
                  <stop offset="1" stopColor="#1A73E8" />
                </linearGradient>
              </defs>

              <text x="0" y="38" className="poppins font-semibold text-3xl">
                <tspan fill="#1A73E8">Tech</tspan>
                <tspan fill="#39424E">Trove</tspan>
              </text>

              <rect
                x="5"
                y="45"
                width="150"
                height="4"
                rx="2"
                fill="url(#cyanGrad)"
                opacity="0.95"
              />
            </svg>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/all-products"
                className={`${navLinkStyle} ${
                  pathname === "/all-products"
                    ? "border-b-2 border-primary text-carbonGray font-semibold"
                    : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${navLinkStyle} ${
                  pathname === "/about"
                    ? "border-b-2 border-primary text-carbonGray font-semibold"
                    : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${navLinkStyle} ${
                  pathname === "/contact"
                    ? "border-b-2 border-primary text-carbonGray font-semibold"
                    : ""
                }`}
              >
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
              <button
                tabIndex={0}
                className="px-4 py-2 poppins font-bold text-primary-gradient cursor-pointer"
              >
                {user.name || user.email}
              </button>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    href="/add-product"
                    className={`block w-full text-sm ${navLinkStyle} ${
                      pathname === "/add-product"
                        ? "border-b-2 border-primary text-carbonGray font-semibold"
                        : ""
                    }`}
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-products"
                    className={`block w-full text-sm ${navLinkStyle} ${
                      pathname === "/manage-products"
                        ? "border-b-2 border-primary text-carbonGray font-semibold"
                        : ""
                    }`}
                  >
                    Manage Products
                  </Link>
                </li>
                <li>
                  <a
                    className="block w-full text-center py-1 rounded-md inter text-sm md:text-lg bg-primary-gradient text-white font-semibold hover:text-accent transition-all duration-300 mt-3"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <span className="btn bg-primary-gradient rounded-md inter text-sm md:text-lg text-white font-semibold hover:opacity-85 transition-all duration-300">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="btn bg-primary-gradient rounded-md inter text-sm md:text-lg text-white font-semibold hover:opacity-85 transition-all duration-300">
                  Register
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
