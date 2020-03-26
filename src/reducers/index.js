import { combineReducers } from "redux";

import toDoReducers from "./todo.reducer";
import movieReducers from "./movie.reducer";

const rootReducer = combineReducers({
  toDoReducers: toDoReducers,
  movieReducers: movieReducers
});

export default rootReducer;
