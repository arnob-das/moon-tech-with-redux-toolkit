import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishListedProducts: [],
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const selectedProduct = state.wishListedProducts.find((product) => product._id === action.payload._id);
            if (!selectedProduct) {
                state.wishListedProducts.push(action.payload)
            }
        },
        removeFromWishList: (state, action) => {
            state.wishListedProducts.filter(product => product._id !== action.payload._id)
        }
    }
})

export const { addToWishList,removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;