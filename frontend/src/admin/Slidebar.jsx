import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Slidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="w-full sm:w-64 bg-gray-800 min-h-screen text-white p-4 sm:p-6 space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
        Admin Panel
      </h1>
      <nav className="space-y-3 sm:space-y-4 flex flex-col">
        <Link
          to={"/admin/dashboard"}
          className="block text-xs sm:text-sm hover:text-emerald-400 py-2 px-2 rounded hover:bg-gray-700 transition"
        >
          <MdDashboard className="inline-block mr-2 text-emerald-600" />
          <span className="hidden sm:inline">Dashboard</span>
          <span className="sm:hidden">Dash</span>
        </Link>
        <Link
          to={"/admin/adminproduct"}
          className="block text-xs sm:text-sm hover:text-emerald-400 py-2 px-2 rounded hover:bg-gray-700 transition"
        >
          <FaShoppingCart className="inline-block mr-2 text-emerald-600" />
          <span className="hidden sm:inline">Manage Products</span>
          <span className="sm:hidden">Products</span>
        </Link>
        <Link
          to={"/admin/adminquery"}
          className="block text-xs sm:text-sm hover:text-emerald-400 py-2 px-2 rounded hover:bg-gray-700 transition"
        >
          <MdOutlineQueryStats className="inline-block text-emerald-600 mr-2" />
          <span className="hidden sm:inline">Manage Query's</span>
          <span className="sm:hidden">Queries</span>
        </Link>
        <button
          onClick={handleLogout}
          className="block text-xs sm:text-sm hover:text-emerald-400 w-full text-left py-2 px-2 rounded hover:bg-gray-700 transition"
        >
          <IoExit className="inline-block mr-2 text-emerald-600" />
          <span className="hidden sm:inline">Exit the Store</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </nav>
    </div>
  );
};

export default Slidebar;
