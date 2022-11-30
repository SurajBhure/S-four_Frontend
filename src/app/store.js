import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import authServices from "./Services/authServices";
import categoryServices from "./Services/categoryServices";
import globalReducer from "./reducers/globalReducer";
import cartReducer from "./reducers/cartReducer";
import homeProdServices from "./Services/homeProdServices";
import productServices from "./Services/productServices";
import paymentServices from "./Services/paymentServices";

const store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [homeProdServices.reducerPath]: homeProdServices.reducer,
    [paymentServices.reducerPath]: paymentServices.reducer,
    cart: cartReducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authServices.middleware,
      categoryServices.middleware,
      productServices.middleware,
      homeProdServices.middleware,
      paymentServices.middleware,
    ]), // get data from cache middleware give data from cache
});

export default store;
