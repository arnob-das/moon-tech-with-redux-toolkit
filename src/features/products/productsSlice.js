import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    isError: false,
    error: "",
}

// createAsyncThunk(actionName, async function())

// get products
export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
});

// add products
export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const product = postProduct(data);
    return product;
});

// delete products
export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkAPI) => {
    // delete product from server
    const product = await deleteProduct(id);
    // after deleting from server
    // delete product from local state
    thunkAPI.dispatch(removeFromList(id));
    return product;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            // get products
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            // add product
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
                state.postSuccess = false
                state.isError = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postSuccess = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.postSuccess = false
                state.error = action.error.message;
            })
            // delete product
            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true;
                state.deleteSuccess = false
                state.isError = false;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteSuccess = true;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.deleteSuccess = false
                state.error = action.error.message;
            })
    },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } = productsSlice.actions;

export default productsSlice.reducer;