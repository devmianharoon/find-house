import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedQuestion: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
});

export const { setSelectedQuestion } = questionSlice.actions;
export default questionSlice.reducer;
