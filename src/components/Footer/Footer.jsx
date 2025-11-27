import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <div>
          <h6 className="footer-title mb-3">Services</h6>
          <ul className="space-y-2">
            <li className="link link-hover">Branding</li>
            <li className="link link-hover">Design</li>
            <li className="link link-hover">Marketing</li>
            <li className="link link-hover">Advertisement</li>
          </ul>
        </div>

        <div>
          <h6 className="footer-title mb-3">Company</h6>
          <ul className="space-y-2">
            <li className="link link-hover">About us</li>
            <li className="link link-hover">Contact</li>
            <li className="link link-hover">Jobs</li>
            <li className="link link-hover">Press kit</li>
          </ul>
        </div>

        <div>
          <h6 className="footer-title mb-3">Legal</h6>
          <ul className="space-y-2">
            <li className="link link-hover">Terms of use</li>
            <li className="link link-hover">Privacy policy</li>
            <li className="link link-hover">Cookie policy</li>
          </ul>
        </div>

        <div>
          <h6 className="footer-title mb-3">Social</h6>
          <ul className="space-y-2">
            <li className="link link-hover">Twitter</li>
            <li className="link link-hover">Instagram</li>
            <li className="link link-hover">Facebook</li>
            <li className="link link-hover">GitHub</li>
          </ul>
        </div>

        <div>
          <h6 className="footer-title mb-3">Explore</h6>
          <ul className="space-y-2">
            <li className="link link-hover">Features</li>
            <li className="link link-hover">Enterprise</li>
            <li className="link link-hover">Security</li>
            <li className="link link-hover">Pricing</li>
          </ul>
        </div>

        <div>
          <h6 className="footer-title mb-3">Apps</h6>
          <ul className="space-y-2">
            <li className="link link-hover">Mac</li>
            <li className="link link-hover">Windows</li>
            <li className="link link-hover">iPhone</li>
            <li className="link link-hover">Android</li>
          </ul>
        </div>
      </div>

      {/* Social Icons + Copyright */}
      <div className="border-t border-neutral-content/20 mt-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          {/* Social Icons */}
          <div className="flex gap-5 mb-4 md:mb-0 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaGithub className="cursor-pointer hover:text-white" />
          </div>

          {/* Copyright */}
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
