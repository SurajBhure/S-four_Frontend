import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryServices = createApi({
  reducerPath: "category",
  tagTypes: "categories", // for invalidate tags we have to first give tagTypes and pass this same name to invalidateTags in mutation and pas same in provideTags in query methods
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    // get token from headers so here buildin function is prepare headers in that we get headers and state
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
      createCat: builder.mutation({
        query: (name) => {
          return {
            url: "create-category",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"], // for mutation we need invalidatesTags
      }),
      getCat: builder.query({
        query: (page) => {
          return {
            url: `categories/${page}`,
            method: "GET",
          };
        },
        providesTags: ["categories"], // for qurry we need providesTags
      }),
      fetchCategory: builder.query({
        query: (id) => {
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"], // for qurry we need providesTags
      }),
      updateCategory: builder.mutation({
        query: (data) => {
          return {
            url: `update-category/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["categories"], // for mutation we need invalidatesTags // also for refetching/refresh the data we need this
      }),
      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"], // for mutation we need invalidatesTags // also for refetching/refresh the data we need this
      }),
      allCategories: builder.query({
        query: () => {
          return {
            url: "allcategories",
            method: "GET",
          };
        },
        providesTags: ["categories"], // for qurry we need providesTags
      }),
      randomCategories: builder.query({
        query: () => {
          return {
            url: "random-categories",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateCatMutation,
  useGetCatQuery,
  useAllCategoriesQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useRandomCategoriesQuery,
} = categoryServices;
export default categoryServices;
