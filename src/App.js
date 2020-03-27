import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./actions";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Checkbox,
  TextField,
  Button,
  IconButton,
  Typography,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%"
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
  },
  hr: {
    size: 2,
    align: "center",
    width: "100%"
  }
});

const theme = createMuiTheme({
  palette: {
    secondary: green
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
  //--- TODOLIST REDUX ---
  const tasks = useSelector(state => state.toDoReducers.tasks);
  const inputValue = useSelector(state => state.toDoReducers.inputValue);
  const editInputValue = useSelector(
    state => state.toDoReducers.editInputValue
  );
  //-------------------

  //--- API .GET REDUX ---
  const movieList = useSelector(state => state.movieReducers.result);
  //-------------------

  //--- API .POST REDUX ---
  const name = useSelector(state => state.postReducers.name);
  const firstname = useSelector(state => state.postReducers.firstname);
  const username = useSelector(state => state.postReducers.username);
  const age = useSelector(state => state.postReducers.age);
  const valid = useSelector(state => state.postReducers.valid);

  //-------------------
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Actions.loadMovie());
  }, [dispatch]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <h2>TO DO LIST REDUX</h2>
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
          <hr className={classes.hr} />
          <p>APPEL API REDUX .GET</p>
          {movieList.length > 0 &&
            movieList.map((item, index) => {
              return (
                <div key={index}>
                  <p>
                    {" "}
                    Title : {item.title} - Popularity : {item.popularity}
                  </p>
                </div>
              );
            })}
          <hr className={classes.hr} />
          <p>APPEL API REDUX .POST</p>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => dispatch(Actions.inputName(e.target.value))}
          />
          <br />
          <TextField
            label="Firstname"
            variant="outlined"
            value={firstname}
            onChange={e => dispatch(Actions.inputFirstname(e.target.value))}
          />
          <br />
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => dispatch(Actions.inputUsername(e.target.value))}
          />
          <br />
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={e => dispatch(Actions.inputAge(e.target.value))}
          />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={event => {
              event.preventDefault();
              dispatch(Actions.createData(name, firstname, username, age));
              dispatch(Actions.validForm(valid));
              dispatch(Actions.inputName(""));
              dispatch(Actions.inputFirstname(""));
              dispatch(Actions.inputUsername(""));
              dispatch(Actions.inputAge(""));
            }}
          >
            Valider
          </Button>
          {valid && <p>Formulaire envoyé</p>}
          <br />
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
