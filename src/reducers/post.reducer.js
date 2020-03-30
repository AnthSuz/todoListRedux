import * as Actions from "../actions";

const initialState = {
  name: "",
  firstname: "",
  username: "",
  age: "",
  valid: false,
  novalid: false
};

const postReducers = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SUBMIT_FORM: {
      return {
        ...action.payload,
        valid: true
      };
    }

    case Actions.NOVALID_FORM: {
      return {
        ...state,
        novalid: true
      };
    }

    default: {
      return state;
    }
  }
};

export default postReducers;
