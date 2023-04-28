import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
    }),
    // tagTypes: ["products","users,","services"],
    tagTypes: ["Products","SingleProduct"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "/products"
            }),
            providesTags: ["Products"]
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`
            }),
            providesTags: ["SingleProduct"]
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Products"]
        }),
        removeProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/product/${product.id}`,
                method: "PUT",
                body: product.product
            }),
            invalidatesTags: ["Products","SingleProduct"]
        })
    })
})

export const { useGetProductsQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useGetSingleProductQuery,
    useUpdateProductMutation
} = productApi;