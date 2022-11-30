import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productServices = createApi({
  reducerPath: "products",
  tagTypes: "products", // for invalidate tags we have to first give tagTypes and pass this same name to invalidateTags in mutation and pass same in provideTags in query methods this is maily use for refetching the data
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    // get token from headers so here builtin function is prepare headers in that we get headers and state
    prepareHeaders: (headers, { getState }) => {
      // destructured state into {getState}
      // console.log("state", state.getState()); // call state with getState function to check how much reducers there we have in redux store
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      // console.log("Token",token); // check whether the token we are reciving or not
      headers.set("authorization", token ? `Bearer ${token}` : ""); // Bearer tell server that token is API token for that we needs Bearer
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"], // for mutation we need invalidatesTags // also for refetching/refresh the data we need this
      }),
      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/product",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"], // for mutation we need invalidatesTags // also for refetching/refresh the data we need this
      }),
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/delete/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"], // for mutation we need invalidatesTags // also for refetching/refresh the data we need this
      }),
      getProducts: builder.query({
        query: (page) => {
          return {
            url: `/products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"], // for qurry we need providesTags
      }),
      fetchProduct: builder.query({
        query: (id) => {
          return {
            url: `/edit-product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      productDetail:builder.query({
        query:(id)=>{
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        }
      })
    };
  },
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useFetchProductQuery,
  useProductDetailQuery,
} = productServices;
export default productServices;
