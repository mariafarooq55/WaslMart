import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch products
  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/getproduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setProducts(result.data || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // Fetch total orders
  const getOrderStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/order-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setTotalOrders(result.totalOrders || 0);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    getAllProducts();
    getOrderStats();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-700">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Total Products */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-emerald-500">
            <h2 className="text-base sm:text-lg font-semibold text-slate-600">
              Total Products
            </h2>
            <p className="text-3xl sm:text-4xl mt-3 text-emerald-600 font-bold">
              {products.length}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-base sm:text-lg font-semibold text-gray-600">
              Total Orders
            </h2>
            <p className="text-3xl sm:text-4xl mt-3 text-emerald-600 font-bold">
              {totalOrders}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
