import { combineReducers } from "@reduxjs/toolkit";
import incomeReducer from "./slices/incomeSlices";
import budgetReducer from "./slices/budgetSlices";
import goalReducer from "./slices/goalSlices";

const rootReducer = combineReducers({
  income: incomeReducer,
  budget: budgetReducer,
  goals: goalReducer,
});

export default rootReducer;
