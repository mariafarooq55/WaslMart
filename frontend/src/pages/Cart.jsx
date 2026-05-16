import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  cartTotal,
  DecrementQuantity,
  deleteCartItem,
  fetchCart,
  IncrementQuantity,
  saveCart,
} from "../features/Cart/CartSlice";

const Cart = () => {
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.Cart.cart);
  const cartAllTotal = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartData, dispatch]);

  useEffect(() => {
    let userId = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    if (token && userId && cartData.length > 0) {
      dispatch(
        saveCart({
          userId: userId,
          cartItem: cartData,
          totalPrice: cartAllTotal.TotalPrice,
          totalQuantity: cartAllTotal.TotalQuantity,
        }),
      );
    }
  }, [cartData, cartAllTotal, dispatch]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("user");

    if (!token) {
      toast.error("Please login to access your Cart");
      navigate("/login");
      return;
    }
    if (userId) {
      dispatch(fetchCart(userId));
      setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
    }
  }, [dispatch, navigate]);

  if (checkingAuth) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          Loading Cart....
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl p-4 sm:p-6 overflow-y-auto mx-auto max-h-[90vh] rounded-xl shadow-lg relative">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-xl sm:text-2xl"
        >
          <IoIosCloseCircleOutline />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-center text-emerald-600 mb-4">
          Your Cart
        </h2>
        <ul className="divide-y divide-gray-300">
          {cartData.map((value, index) => (
            <li key={index} className="w-full flex flex-col gap-3 py-3 sm:py-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
                <img
                  src={`/uploads/${value.productImage}`}
                  alt=""
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                    {value.productName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {value.productDesc || ""}
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ml-0 sm:ml-auto">
                <p className="font-semibold text-green-600 text-sm">
                  {value.productPrice} Rs
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      dispatch(DecrementQuantity(value));
                    }}
                    className="p-2 bg-gradient-to-r from-emerald-500 to-slate-600 text-white rounded-md hover:from-emerald-600 hover:to-slate-700 hover:opacity-95"
                    aria-label="decrease"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-2">{value.qunatity}</span>
                  <button
                    onClick={() => {
                      dispatch(IncrementQuantity(value));
                    }}
                    className="p-2 bg-gradient-to-r from-emerald-500 to-slate-600 text-white rounded-md hover:from-emerald-600 hover:to-slate-700 hover:opacity-95"
                    aria-label="increase"
                  >
                    <FaPlus />
                  </button>
                </div>

                <MdDelete
                  onClick={() => {
                    dispatch(deleteCartItem(value));
                  }}
                  className="text-gray-700 hover:text-red-600 text-2xl hover:cursor-pointer mt-1 sm:mt-0"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 text-right">
          <p className="font-semibold text-gray-700 text-lg">
            Total Products Quantity :-
            <span className="text-emerald-600">
              {cartAllTotal.TotalQuantity}
            </span>
          </p>
          <p className="font-semibold text-right text-gray-700 text-lg">
            Total Price:-
            <span className="text-emerald-600">
              {cartAllTotal.TotalPrice} Rs
            </span>
          </p>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-slate-600 text-white rounded-full hover:from-emerald-600 hover:to-slate-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
