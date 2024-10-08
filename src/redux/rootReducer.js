import { combineReducers } from "@reduxjs/toolkit";
import  incomeReducer  from "./slices";

const rootReducer = combineReducers({
  income: incomeReducer,
});

export default rootReducer;
