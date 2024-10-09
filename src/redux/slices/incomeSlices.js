import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    creditIncome: (state, action) => {
      state.amount = parseInt((state.amount + action.payload)?.toFixed(2));
    },
    debitIncome: (state, action) => {
      state.amount = parseInt(
        (state.amount >= action.payload
          ? state.amount - action.payload
          : state.amount
        )?.toFixed(2)
      );
    },
  },
});

export const { creditIncome, debitIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
