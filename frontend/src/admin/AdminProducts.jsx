import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const AdminProducts = () => {
  const [product, setProduct] = useState([]);

  async function getAllProducts() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/getproduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const record = await response.json();
      if (response.ok) {
        setProduct(record.data);
      } else {
        toast.error(record.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/productdelete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        getAllProducts();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row mt-16">
      <Slidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-h-screen bg-slate-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-700">
          Manage Products
        </h1>
        <Link to="/admin/add-products">
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 text-sm sm:text-base">
            Add Products
          </button>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-5">
          {product.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-3 sm:p-4 hover:shadow-xl transition border-t-4 border-emerald-500"
            >
              <img
                src={`/uploads/${item.productImage}`}
                alt=""
                className="w-full h-32 sm:h-40 object-contain rounded-md mb-3 sm:mb-4 border"
              />
              <h2 className="text-base sm:text-xl font-semibold text-gray-700 line-clamp-2">
                {item.productName}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                {item.productDescription}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Category :- {item.productCategory}
              </p>
              <p className="text-purple-600 font-bold mt-1 text-sm sm:text-base">
                {item.productPrice} Rs
              </p>
              {item.productStatus === "In-Stock" ? (
                <p className="text-green-700 font-semibold text-xs sm:text-sm">
                  {item.productStatus}
                </p>
              ) : (
                <p className="text-red-700 font-semibold text-xs sm:text-sm">
                  {item.productStatus}
                </p>
              )}

              <div className="flex gap-4 mt-3 sm:mt-4 justify-center">
                <Link
                  to={`/admin/edit-product/${item._id}`}
                  className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 text-lg sm:text-xl transition"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 text-lg sm:text-xl transition"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
