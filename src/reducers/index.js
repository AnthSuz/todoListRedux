import { combineReducers } from "redux";

import toDoReducers from "./todo.reducer";
import movieReducers from "./movie.reducer";
import postReducers from "./post.reducer";

const rootReducer = combineReducers({
  toDoReducers: toDoReducers,
  movieReducers: movieReducers,
  postReducers: postReducers
});

export default rootReducer;
