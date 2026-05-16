import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders || []);
        } else {
          toast.error(data.message || "Failed to load orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Something went wrong while loading orders");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto mt-24 p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-emerald-600">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded p-4 mb-4">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>
              Status:{" "}
              <span className="text-emerald-600 font-semibold">
                {order.status || "Pending"}
              </span>
            </p>
            <p>Total: {order.amount || 0} Rs</p>
            <p className="text-sm text-gray-500">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Date not available"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
