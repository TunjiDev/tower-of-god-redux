import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  // token: '',
  //   isLoggedIn: false,
  navClick: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    navClickSwitch(state) {
      state.navClick = !state.navClick;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
