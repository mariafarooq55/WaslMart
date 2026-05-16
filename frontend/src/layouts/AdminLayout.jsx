import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { toast } from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ADMIN HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 flex-wrap gap-4">
            {/* LOGO/TITLE */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Admin Dashboard
              </h1>
            </div>

            {/* ADMIN INFO */}
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-end">
              <div className="text-white hidden sm:block">
                <p className="text-sm">Welcome,</p>
                <p className="font-semibold">Admin</p>
              </div>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base"
              >
                <IoLogOut className="text-lg sm:text-xl" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN CONTENT */}
      <div className="pt-20 sm:pt-10">{children}</div>
    </div>
  );
};

export default AdminLayout;
