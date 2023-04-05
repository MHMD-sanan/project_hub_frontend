import { createSlice } from "@reduxjs/toolkit";

export const kanbanSlice = createSlice({
  name: "board",
  initialState: {
    value: [],
  },
  reducers: {
    setBoard: (state, action) => {
      state.value = action.payload.board;
    },
  },
});

export const { setBoard } = kanbanSlice.actions;
export default kanbanSlice.reducer;
