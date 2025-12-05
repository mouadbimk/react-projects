import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Pizza Double",
    //   quantity: 2,
    //   unitePrice: 16,
    //   totalPrice: 32,
    // },
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (pizaa) => pizaa.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity > 20) return;
      item.quantity++;
      item.totalPrice = Number(item.quantity) * Number(item.unitPrice);
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = Number(item.quantity) * Number(item.unitPrice);
      if (item.quantity < 1) {
        const confirmed = confirm("Are you sure want to delete this item?");
        if (confirmed) cartSlice.caseReducers.deleteItem(state, action);
        else {
          item.quantity++;
          item.totalPrice = Number(item.quantity) * Number(item.unitPrice);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);
export const getCart = (state) => state.cart.cart;
export const getCurrentQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
// 'reselect library for better performance'
