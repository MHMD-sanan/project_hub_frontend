import { createSlice } from "@reduxjs/toolkit";

export const SingleProjectSlice = createSlice({
  name: "singleProject",
  initialState: {
    value: {},
  },
  reducers: {
    setSingleProject: (state, action) => {
      state.value = action.payload.id;
    },
  },
});

export const { setSingleProject } = SingleProjectSlice.actions;
export default SingleProjectSlice.reducer;
