import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
// import {logger} from "redux-logger";
import productsSlice from "../features/products/productsSlice";
import wishListSlice from "../features/wishList.js/wishListSlice";

const store = configureStore({
    // when production
    // devTools:false,
    reducer: {
        cart: cartSlice,    
        filter: filterSlice,
        products: productsSlice,
        wishList: wishListSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;