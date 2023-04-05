import { createSlice } from "@reduxjs/toolkit";

export const AdminLogin = createSlice({
  name: "isLogged",
  initialState: {
    value: false,
  },
  reducers: {
    changeAdminStatus: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeAdminStatus } = AdminLogin.actions;

export default AdminLogin.reducer;
