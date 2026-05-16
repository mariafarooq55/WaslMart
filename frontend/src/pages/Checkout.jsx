import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartTotal } from "../features/Cart/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart.cart);
  const totals = useSelector((state) => state.Cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartTotal());
  }, [cart, dispatch]);

  return (
    <div className="max-w-5xl mx-auto mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
      {/* LEFT - ITEMS */}
      <div className="lg:col-span-2 bg-white shadow rounded p-4 sm:p-5 border-t-4 border-emerald-500">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-emerald-600">
          Checkout Items
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            Your cart is empty
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 border-b py-3 sm:py-4"
            >
              <img
                src={`/uploads/${item.productImage}`}
                alt={item.productName}
                className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-md border"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                  {item.productName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Quantity: {item.qunatity}
                </p>
              </div>

              <p className="font-semibold text-emerald-600 text-sm sm:text-base whitespace-nowrap">
                {item.productPrice * item.qunatity} Rs
              </p>
            </div>
          ))
        )}
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-white shadow rounded p-4 sm:p-5 h-fit">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-emerald-600">
          Order Summary
        </h2>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Total Items</span>
          <span>{totals.TotalQuantity}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm sm:text-base">
          <span>Total Price</span>
          <span className="font-semibold text-green-600">
            {totals.TotalPrice} Rs
          </span>
        </div>

        <p className="text-xs sm:text-sm mb-4">
          <strong>Payment Method:</strong> Cash on Delivery
        </p>

        <button
          onClick={() => navigate("/shipping")}
          className="w-full mt-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-500 to-slate-600 text-white rounded text-sm sm:text-base hover:from-emerald-600 hover:to-slate-700 transition"
        >
          Continue to Shipping
        </button>
      </div>
    </div>
  );
};

export default Checkout;
