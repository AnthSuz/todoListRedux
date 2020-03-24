import { combineReducers } from "redux";

import toDoReducers from "./todo.reducer";

const rootReducer = combineReducers({
  toDoReducers: toDoReducers
});

export default rootReducer;
