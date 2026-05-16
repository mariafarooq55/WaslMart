import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { clearCart } from "../features/Cart/CartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.Cart.cart);
  const total = useSelector((state) => state.Cart.TotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // 🚨 CART GUARD
  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      return toast.error("All fields required");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          amount: total,
          shippingAddress: form,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        dispatch(clearCart());
        toast.success("Order placed successfully 🎉");
        navigate("/");
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (error) {
      toast.error("Order failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-emerald-600">
        Shipping Details
      </h2>

      {/* ORDER ITEMS */}
      <div className="mb-4 border-b pb-4">
        <h3 className="font-semibold mb-2">Order Items</h3>

        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-3 mb-2">
            <img
              src={`/uploads/${item.productImage}`}
              className="w-14 h-14 object-cover border rounded"
              alt={item.productName}
            />
            <div className="flex-1">
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-500">
                {item.qunatity} × {item.productPrice} Rs
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <input
        name="name"
        placeholder="Full Name"
        className="w-full border border-slate-400 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full border border-slate-400 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        className="w-full border border-slate-400 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        className="w-full border border-slate-400 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={handleChange}
      />

      <button
        onClick={placeOrder}
        className="w-full bg-gradient-to-r from-emerald-500 to-slate-600 text-white py-2 rounded hover:from-emerald-600 hover:to-slate-700"
      >
        Place Order (COD)
      </button>
    </div>
  );
};

export default Shipping;
