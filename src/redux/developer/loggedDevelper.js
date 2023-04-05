import { createSlice } from "@reduxjs/toolkit";

export const loggedDeveloperSlice = createSlice({
  name: "loggedDeveloper",
  initialState: {
    value: {},
  },
  reducers: {
    setLoggedDeveloper: (state, action) => {
      state.value = action.payload.details;
    },
  },
});

export const { setLoggedDeveloper } = loggedDeveloperSlice.actions;
export default loggedDeveloperSlice.reducer;
