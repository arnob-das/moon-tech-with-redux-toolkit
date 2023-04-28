import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import { productApi } from "../features/api/apiSlice"
import wishListSlice from "../features/wishList.js/wishListSlice";

const store = configureStore({
    // when production
    // devTools:false,
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartSlice,
        filter: filterSlice,
        wishList: wishListSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
})

export default store;