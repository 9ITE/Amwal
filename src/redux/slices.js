import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncome: (state, action) => {
      state.amount = action.payload;
    },
    creditIncome: (state, action) => {
      state.amount = state.amount + action.payload;
    },
    debitIncome: (state, action) => {
      state.amount =
        state.amount >= action.payload
          ? state.amount - action.payload
          : state.amount;
    },
  },
});

export const { setIncome, creditIncome, debitIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
