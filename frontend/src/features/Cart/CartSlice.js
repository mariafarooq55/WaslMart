import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveCart = createAsyncThunk("cart/save", async (cartData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/cart/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartData),
  });

  return await response.json();
});

export const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  let token = localStorage.getItem("token");
  const response = await fetch(`/api/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
});

const initialState = {
  cart: [],
  TotalPrice: 0,
  TotalQuantity: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const find = state.cart.findIndex(
        (value) => value._id === actions.payload._id
      );

      if (find !== -1) {
        state.cart[find].qunatity += 1;
      } else {
        state.cart.push({ ...actions.payload, qunatity: 1 });
      }
    },

    deleteCartItem: (state, actions) => {
      state.cart = state.cart.filter(
        (value) => value._id !== actions.payload._id
      );
    },

    IncrementQuantity: (state, actions) => {
      state.cart = state.cart.map((value) =>
        value._id === actions.payload._id
          ? { ...value, qunatity: value.qunatity + 1 }
          : value
      );
    },

    DecrementQuantity: (state, actions) => {
      state.cart = state.cart.map((value) =>
        value._id === actions.payload._id
          ? {
              ...value,
              qunatity: value.qunatity > 1 ? value.qunatity - 1 : 1,
            }
          : value
      );
    },

    cartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItems) => {
          const { productPrice, qunatity } = cartItems;
          const itemTotal = parseFloat(productPrice) * qunatity;

          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += qunatity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      state.TotalPrice = totalPrice;
      state.TotalQuantity = totalQuantity;
    },

    clearCart: (state) => {
      state.cart = [];
      state.TotalPrice = 0;
      state.TotalQuantity = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(saveCart.fulfilled, (state, actions) => {
      console.log("Cart saved:", actions.payload);
    });

    builder.addCase(fetchCart.fulfilled, (state, actions) => {
      state.cart = actions.payload.cartItem || [];
      state.TotalPrice = actions.payload.totalPrice || 0;
      state.TotalQuantity = actions.payload.totalQuantity || 0;
    });
  },
});

export const {
  addToCart,
  deleteCartItem,
  IncrementQuantity,
  DecrementQuantity,
  cartTotal,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
