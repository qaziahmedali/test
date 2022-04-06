import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  loading: false,
  isAuth: false,
  user: [],
};

export const authReducer = createSlice({
  name: "Users",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload.data.access_token;
      state.user = payload.data.data;
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
    isMeAuth: (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.data;
    },
    logoutMe: (state) => {
      state.token = null;
      state.isAuth = false;
      state.user = [];
      localStorage.removeItem("user");
    },
  },
  extraReducers: {},
});
export const { logoutMe, isMeAuth, loginPending, loginSuccess, loginFail } =
  authReducer.actions;
export default authReducer.reducer;
