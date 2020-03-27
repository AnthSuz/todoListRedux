import * as Actions from "../actions";

const initialState = {
  name: "",
  firstname: "",
  username: "",
  age: "",
  valid: false
};

const postReducers = function(state = initialState, action) {
  switch (action.type) {
    case Actions.INPUT_NAME: {
      return {
        ...state,
        name: action.name
      };
    }

    case Actions.INPUT_FIRSTNAME: {
      return {
        ...state,
        firstname: action.firstname
      };
    }

    case Actions.INPUT_USERNAME: {
      return {
        ...state,
        username: action.username
      };
    }

    case Actions.INPUT_AGE: {
      return {
        ...state,
        age: action.age
      };
    }

    case Actions.VALID_FORM: {
      return {
        ...state,
        valid: true
      };
    }

    default: {
      return state;
    }
  }
};

export default postReducers;
