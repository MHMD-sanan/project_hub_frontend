import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: false,
  },
  reducers: {
    changeStatus: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = !state.value;
    },
  },
});

export const { changeStatus } = loginSlice.actions;

export default loginSlice.reducer;
