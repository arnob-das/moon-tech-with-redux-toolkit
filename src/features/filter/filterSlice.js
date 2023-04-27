import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock: false,
    brands: [],
    keywords: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggle: (state) => {
            state.stock = !state.stock;
        },

        toggleBrands: (state, action) => {
            if (!state.brands.includes(action.payload)) {
                state.brands.push(action.payload);
            } else {
                state.brands = state.brands.filter((brand) => brand !== action.payload)
            }
        },
        searchKeyword: (state, action) => {
            state.keywords = action.payload;
        }
    }
})

export const {toggle,toggleBrands,searchKeyword} = filterSlice.actions;

export default filterSlice.reducer;