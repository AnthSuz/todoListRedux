import axios from "axios";
export const INPUT_NAME = "INPUT_NAME";
export const INPUT_FIRSTNAME = "INPUT_FIRSTNAME";
export const INPUT_USERNAME = "INPUT_USERNAME";
export const INPUT_AGE = "INPUT_AGE";
export const SEND_FORM = "SEND_FORM";
export const VALID_FORM = "VALID_FORM";

export function createData(name, firstname, username, age) {
  return dispatch => {
    return axios
      .post("http://localhost:3010/create/user", {
        name,
        firstname,
        username,
        age
      })
      .then(response => {
        dispatch(createDataSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function validForm(payload) {
  return {
    type: VALID_FORM,
    payload
  };
}

export function createDataSuccess(data) {
  return {
    type: SEND_FORM,
    data
  };
}

export function inputName(name) {
  return {
    type: INPUT_NAME,
    name
  };
}
export function inputFirstname(firstname) {
  return {
    type: INPUT_FIRSTNAME,
    firstname
  };
}
export function inputUsername(username) {
  return {
    type: INPUT_USERNAME,
    username
  };
}
export function inputAge(age) {
  return {
    type: INPUT_AGE,
    age
  };
}
