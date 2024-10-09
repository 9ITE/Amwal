import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetItems: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetItems: (state, action) => {
      state.budgetItems = action.payload;
    },
  },
});

export const { setBudgetItems } = budgetSlice.actions;

export default budgetSlice.reducer;
