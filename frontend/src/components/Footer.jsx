import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import logo from "../assets/lo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  const whatsappNumber = "03190223849"; // Replace with actual number
  const emailAddress = "mariyafarooq879@gmail.com"; // Replace with actual email

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 h-1"></div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <div className="text-2xl font-extrabold text-emerald-400">
                      WaslMart
                    </div>
                    <div className="text-sm text-slate-500">
                      Quality products. Fast delivery. Trusted payments.
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-slate-600 max-w-md">
                  Discover curated deals across electronics, fashion, beauty and
                  home. We bring value and convenience together so you can shop
                  with confidence.
                </p>
              </div>

              {/* Center */}
              <div className="w-full lg:w-1/4">
                <div className="text-slate-800  font-bold mb-3">
                  Quick Links
                </div>
                <div className="flex flex-col gap-2 text-slate-600">
                  <Link
                    to="/"
                    className="hover:text-emerald-400 transition-colors font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/query"
                    className="hover:text-emerald-400 transition-colors font-medium"
                  >
                    Query
                  </Link>
                  <Link
                    to="/products"
                    className="hover:text-emerald-400 transition-colors font-medium"
                  >
                    Products
                  </Link>
                </div>
              </div>

              {/* Right */}
              <div className="w-full lg:w-1/4">
                <div className="text-slate-800 font-semibold mb-3">
                  Contact & Socials
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-500 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-red-600 no-underline hover:text-red-500 transition-colors"
                    aria-label="Email"
                  >
                    <FaEnvelope size={20} />
                  </a>

                  <a
                    href="https://github.com/mariafarooq55"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-500 transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/maria-farooq-350673321/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-8 pt-6 text-center text-slate-500 text-sm">
              <div>© {year} WaslMart. All rights reserved.</div>
              <div className="mt-1">
                Designed and developed by{" "}
                <span className="font-medium text-slate-800">
                  Maria Farooq
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
