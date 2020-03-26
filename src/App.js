import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./actions";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Checkbox,
  TextField,
  Button,
  IconButton,
  Typography
} from "@material-ui/core";
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
    borderRadius: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    border: 0,
    color: "white",
    height: 56,
    padding: "0 30px",
    boxShadow: "none"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

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
                  color="primary"
                  id={item.title}
                  checked={item.checked}
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
                    <TextField
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
                  <Typography
                    variant="h6"
                    htmlFor={item.title}
                    className={item.checked ? classes.doneTodo : ""}
                  >
                    {item.title}
                  </Typography>
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
          />

          <StyledButton
            variant="contained"
            color="primary"
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
