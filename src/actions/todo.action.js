export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const CHANGE_TODO = "CHANGE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export function addTodo(payload) {
  return { type: ADD_TODO, payload };
  //payload === mon ajouté sur le onClick
}

export function changeTodo(payload) {
  return { type: CHANGE_TODO, payload };
  //payload === mon ajouté sur le onClick
}

export function editTodo(payload) {
  return { type: EDIT_TODO, payload };
}

export function updateTodo(payload) {
  return { type: UPDATE_TODO, payload };
  //payload === mon modifié sur le onClick
}

export function deleteTodo(payload) {
  return { type: DELETE_TODO, payload };
  //payload === mon supprimé sur le onClick
}
