import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const customerToken = sessionStorage.getItem("user-token");

const verifyToken = (keyName) => {
  const storageToken = sessionStorage.getItem(keyName);
  if (storageToken) {
    const decodeToken = jwtDecode(storageToken);
    const expiresIn = new Date(decodeToken.exp * 1000);
    //checking here is our decode token is expired or not if it is expired then remove from session storage
    if (new Date() > expiresIn) {
      sessionStorage.removeItem(keyName);
      return null;
    } else {
      return storageToken;
    }
  } else {
    return null;
  }
};

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    adminToken: verifyToken("admin-token"),
    userToken: verifyToken("user-token"),
    user: customerToken ? jwtDecode(customerToken) : null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logout: (state, { payload }) => {
      // dectructure from action payload
      sessionStorage.removeItem(payload);
      if (payload === "admin-token") {
        state.adminToken = null;
      } else if (payload === "user-token") {
        state.userToken = null;
        state.user = null;
      }
    },
  },
});

export const { setAdminToken, setUserToken, logout } = authReducer.actions;

export default authReducer.reducer;
