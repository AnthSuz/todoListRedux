import axios from "axios";
export const LIST_MOVIE = "LIST_MOVIE";

export function loadMovie() {
  return dispatch => {
    return axios
      .get("https://api-allocine.herokuapp.com/api/movies/upcoming")
      .then(response => {
        dispatch(listMovies(response.data.results));
      });
  };
}

export function listMovies(movie) {
  return {
    type: LIST_MOVIE,
    movie
  };
}
