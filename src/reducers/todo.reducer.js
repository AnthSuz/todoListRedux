import * as Actions from "../actions";

const initialState = {
  tasks: []
};

const toDoReducers = function(state = initialState, action) {
  // Si il y a un action.type il va tester les types jusqu'a trouver celui qui correspond
  switch (action.type) {
    // Quand il trouve il execute le return dans la case
    // case === cas
    case Actions.ADD_TODO: {
      console.log("action.payload", action.payload);
      return {
        tasks: [...state.tasks, { title: action.payload, edit: false }]
      };
    }
    case Actions.EDIT_TODO: {
      console.log(11111, action.payload);
      return (
        state.tasks.filter(task => task.title === action.payload) && {
          tasks: [{ title: action.payload.title, edit: true }]
        }
      );
    }

    case Actions.CHANGE_TODO: {
      console.log(55555, action.payload);
      return {
        tasks: [...state.tasks, { title: action.payload, edit: false }]
      };
    }

    case Actions.DELETE_TODO: {
      console.log(22222, action.payload);
      return {
        tasks: [...state.tasks.filter(task => task !== action.payload)]
      };
    }
    //Si il se passe rien, cela renvoit l'état initial
    default: {
      return state;
    }
  }
};

export default toDoReducers;
