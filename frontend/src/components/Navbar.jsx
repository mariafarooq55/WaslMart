import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoLogOut } from "react-icons/io5";
import {
  FaSearch,
  FaHome,
  FaCartPlus,
  FaRegUserCircle,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaShieldAlt,
} from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchData from "./SearchData";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-16 relative">
          {/* LOGO */}
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-10 sm:h-16 md:h-20 w-auto"
            />
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden sm:block flex-1 mx-4">
            <div className="relative">
              <input
                className="w-full bg-slate-700 rounded-full pl-4 pr-10 py-2 shadow-sm text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Search products..."
                readOnly
                onFocus={() => setShowSearch(true)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="flex flex-col items-center">
              <FaHome className="text-2xl text-gray-200 hover:text-emerald-400 transition" />
              <p className="text-gray-200 text-sm">Home</p>
            </Link>

            <Link to="/query" className="flex flex-col items-center">
              <MdOutlineContactSupport className="text-2xl text-gray-200 hover:text-emerald-400 transition" />
              <p className="text-gray-200 text-sm">Query</p>
            </Link>

            <Link to="/cart" className="flex flex-col items-center">
              <FaCartPlus className="text-2xl text-gray-200 hover:text-emerald-400 transition" />
              <p className="text-gray-200 text-sm">Cart</p>
            </Link>

            {token && (
              <Link to="/my-orders" className="flex flex-col items-center">
                <FaClipboardList className="text-2xl text-gray-200 hover:text-emerald-400 transition" />
                <p className="text-gray-200 text-sm">Orders</p>
              </Link>
            )}

            {!token ? (
              <Link to="/login" className="flex flex-col items-center">
                <FaRegUserCircle className="text-2xl text-gray-200 hover:text-emerald-400 transition" />
                <p className="text-gray-200 text-sm">User</p>
              </Link>
            ) : role === "admin" ? (
              <button className="flex flex-col items-center">
                <FaShieldAlt className="text-2xl text-amber-400 hover:text-amber-300 transition" />
                <p className="text-gray-200 text-sm">Admin</p>
              </button>
            ) : (
              <button className="flex flex-col items-center">
                <FaRegUserCircle className="text-2xl text-emerald-400 hover:text-emerald-300 transition" />
                <p className="text-gray-200 text-sm">{userName}</p>
              </button>
            )}

            {token && (
              <button
                onClick={handleLogOut}
                className="flex flex-col items-center"
              >
                <IoLogOut className="text-2xl text-gray-200 hover:text-red-400 transition" />
                <p className="text-gray-200 text-sm">Logout</p>
              </button>
            )}
          </div>

          {/* MOBILE SEARCH + TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="text-2xl text-emerald-400 hover:text-emerald-300 transition"
            >
              <FaSearch />
            </button>

            <button
              onClick={toggleMenu}
              className="text-2xl text-emerald-400 hover:text-emerald-300 transition"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 px-4 py-3 space-y-2 shadow-xl border-t border-slate-700">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-emerald-400 transition py-2"
            >
              Home
            </Link>

            <Link
              to="/query"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-emerald-400 transition py-2"
            >
              Query
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-emerald-400 transition py-2"
            >
              Cart
            </Link>

            {token && (
              <Link
                to="/my-orders"
                onClick={() => setIsOpen(false)}
                className="block text-gray-200 hover:text-emerald-400 transition py-2"
              >
                My Orders
              </Link>
            )}

            {!token ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-200 hover:text-emerald-400 transition py-2"
              >
                Login
              </Link>
            ) : (
              <>
                <div className="block text-gray-200 font-semibold py-2">
                  {role === "admin" ? "👤 Admin" : `👤 ${userName}`}
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsOpen(false);
                  }}
                  className="block text-left w-full text-red-400 hover:text-red-300 transition py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* SEARCH MODAL */}
      {showSearch && <SearchData onClose={setShowSearch} />}
    </nav>
  );
};

export default Navbar;
