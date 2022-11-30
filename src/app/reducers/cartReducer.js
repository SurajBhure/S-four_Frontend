import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../../utils/discount";
const cartData = sessionStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : []; // cart not updating when we add new product in cart

function allItems(data) {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
}
function calcTotal(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += discount(data[i].price, data[i].discount) * data[i].quantity;
  }
  return total;
}

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    total: cartArray.length > 0 ? calcTotal(cartArray) : 0,
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.quantity;
      state.total +=
        discount(payload.price, payload.discount) * payload.quantity;
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.total += discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.total -= discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.quantity;
        state.total -= discount(find.price, find.discount) * find.quantity;
        state.cart.splice(index, 1);
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addCart, incQuantity, decQuantity, removeItem } =
  cartReducer.actions;

export default cartReducer.reducer;
