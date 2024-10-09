import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goal: [],
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    setSavingGoals: (state, action) => {
      state.goal = action.payload;
    },
  },
});

export const { setSavingGoals } = goalSlice.actions;

export default goalSlice.reducer;
