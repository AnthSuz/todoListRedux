import * as Actions from "../actions";

const initialState = {
  result: []
};

const movieReducers = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LIST_MOVIE: {
      return {
        result: [...action.movie]
      };
    }

    default: {
      return state;
    }
  }
};

export default movieReducers;
