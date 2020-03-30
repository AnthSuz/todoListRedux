import axios from "axios";

export const SUBMIT_FORM = "SUBMIT_FORM";
export const NOVALID_FORM = "NOVALID_FORM";

export function submitForm(payload) {
  return dispatch => {
    return axios
      .post("http://localhost:3010/create/user", payload)
      .then(() => {
        dispatch({ type: SUBMIT_FORM, payload });
      })
      .catch(error => {
        dispatch({ type: NOVALID_FORM, payload });
        throw error;
      });
  };
}
