import * as Actions from "../actions";

const initialState = {
  tasks: [],
  inputValue: "",
  editInputValue: ""
};

const toDoReducers = function(state = initialState, action) {
  // Si il y a un action.type il va tester les types jusqu'a trouver celui qui correspond
  switch (action.type) {
    // Quand il trouve il execute le return dans la case
    // case === cas
    case Actions.ADD_TODO: {
      console.log("action.payload", action.payload);
      return {
        tasks: [
          ...state.tasks,
          { title: action.payload, edit: false, checked: false }
        ]
      };
    }

    case Actions.CHECKED_TODO: {
      return {
        tasks: [
          ...state.tasks.filter(task => task.title !== action.payload.title),
          {
            title: action.payload.title,
            edit: false,
            checked: action.payload.checked
          }
        ]
      };
    }

    case Actions.EDIT_TODO: {
      console.log(11111, action.payload);
      return {
        tasks: [
          ...state.tasks.filter(task => task.title !== action.payload.title),
          { title: action.payload.title, edit: true }
        ],
        editInputValue: action.payload.title
      };
    }

    case Actions.UPDATE_TODO: {
      console.log(66666, action.payload);
      return {
        tasks: [
          ...state.tasks.filter(
            task => task.title !== action.payload.item.title
          ),
          { title: action.payload.value, edit: false }
        ]
      };
    }

    case Actions.CHANGE_TODO: {
      console.log(55555, action.payload);
      return {
        ...state,
        inputValue: action.payload
      };
    }

    case Actions.DELETE_TODO: {
      console.log(22222, action.payload);
      return {
        tasks: [...state.tasks.filter(task => task !== action.payload)]
      };
    }

    case Actions.CHANGE_TASK: {
      console.log(77777, action.payload);
      return {
        ...state,
        editInputValue: action.payload
      };
    }

    //Si il se passe rien, cela renvoit l'état initial
    default: {
      return state;
    }
  }
};

export default toDoReducers;
