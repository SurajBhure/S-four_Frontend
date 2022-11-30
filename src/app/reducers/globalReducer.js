import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "globalReducer",
  initialState: {
    success: "",
    searchBar: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      // console.log("action", action); // check what is in payload
      state.success = action.payload;
    },
    clearMessage: (state) => {
      state.success = "";
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
  },
});

export const { setSuccess, clearMessage, toggleSearchBar } =
globalReducer.actions;

export default globalReducer.reducer;
