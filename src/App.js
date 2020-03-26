import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./actions";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Checkbox, TextField, Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  list: {
    width: "25%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  input: {
    minWidth: 130
  },
  doneTodo: {
    textDecoration: "line-through"
  }
});

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 0,
    borderTopRightRadius: 4,
    border: 0,
    color: "white",
    height: 56,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

// position: relative;
// transition: background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
// background-color: rgba(0, 0, 0, 0.09);
// border-top-left-radius: 4px;
// border-top-right-radius: 4px;

// color: rgba(0, 0, 0, 0.54);
//     padding: 0;
//     font-size: 1rem;
//     font-family: "Roboto", "Helvetica", "Arial", sans-serif;
//     font-weight: 400;
//     line-height: 1;
//     letter-spacing: 0.00938em;

// const InputBase = withStyles({
//   root: {
//     "&after": {
//       borderBottomColor: "green"
//     },
//     height: 56,
//     position: "relative",
//     backgroundColor: "rgba(0,0,0,0.09)",
//     // borderTopLeftRadius: 40,
//     // borderTopRightRadius: 4
//     borderRadius: 0,
//     top: 0
//   },
//   label: {
//     // color: "rgba(0, 0, 0, 0.54)",
//     padding: 0,
//     fontSize: "1rem",
//     fontWeight: 400,
//     lineHeight: 1,
//     letterSpacing: "0.00938em"
//   }
// })(InputBase);

function App() {
  const tasks = useSelector(state => state.toDoReducers.tasks);
  const inputValue = useSelector(state => state.toDoReducers.inputValue);
  const editInputValue = useSelector(
    state => state.toDoReducers.editInputValue
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h2>TO DO LIST</h2>
        {tasks &&
          tasks.map((item, index) => {
            return (
              <div key={item + "_" + index} className={classes.list}>
                <Checkbox
                  id={item.title}
                  onChange={e =>
                    dispatch(
                      Actions.checkedTodo({
                        checked: e.target.checked,
                        title: item.title
                      })
                    )
                  }
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                {item.edit ? (
                  <>
                    <input
                      className={classes.input}
                      value={editInputValue}
                      onChange={e =>
                        dispatch(Actions.changeTask(e.target.value))
                      }
                    />
                    <IconButton
                      onClick={event => {
                        event.preventDefault();
                        dispatch(
                          Actions.updateTodo({ value: editInputValue, item })
                        );
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </>
                ) : (
                  //J ARRIVE PAS A MODIFIER L EDIT
                  <label
                    htmlFor={item.title}
                    className={item.checked ? classes.doneTodo : ""}
                  >
                    {item.title}
                  </label>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch(Actions.deleteTodo(item));
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    dispatch(Actions.editTodo(item));
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            );
          })}
        <div>
          <TextField
            value={inputValue}
            onChange={e => dispatch(Actions.changeTodo(e.target.value))}
            label="Votre tâche"
            variant="filled"
            className={classes.inputTodo}
          />
          <StyledButton
            variant="contained"
            color="secondary"
            size="large"
            onClick={event => {
              event.preventDefault();
              dispatch(Actions.addTodo(inputValue));
              dispatch(Actions.changeTodo(""));
            }}
          >
            Ajouter
          </StyledButton>
        </div>
      </div>
    </>
  );
}

export default App;
