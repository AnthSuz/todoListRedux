import React, { useState, useEffect } from "react";
import "./App.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./actions";

// MATERIAL UI
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Checkbox,
  TextField,
  Button,
  IconButton,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

// FACEBOOK
import FacebookLogin from "react-facebook-login";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100%",
  },
  list: {
    width: "25%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    minWidth: 130,
  },
  doneTodo: {
    textDecoration: "line-through",
  },
  hr: {
    size: 2,
    align: "center",
    width: "100%",
  },
});

const theme = createMuiTheme({
  palette: {
    secondary: green,
  },
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
    boxShadow: "none",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

function App() {
  //--- TODOLIST REDUX ---
  const tasks = useSelector((state) => state.toDoReducers.tasks);
  const inputValue = useSelector((state) => state.toDoReducers.inputValue);
  const editInputValue = useSelector(
    (state) => state.toDoReducers.editInputValue
  );
  //-------------------

  //--- API .GET REDUX ---
  const movieList = useSelector((state) => state.movieReducers.result);
  //-------------------

  //--- API .POST REDUX ---
  const valid = useSelector((state) => state.postReducers.valid);
  const novalid = useSelector((state) => state.postReducers.novalid);
  //-------------------

  const [form, setForm] = useState({
    name: "",
    firstname: "",
    username: "",
    age: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit() {
    dispatch(Actions.submitForm(form));
  }

  const dispatch = useDispatch();
  const classes = useStyles();

  const responseFacebook = (response) => {
    console.log(response);
  };

  // FB.getLoginStatus(function (response) {
  //   statusChangeCallback(response);
  // });

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
                    onChange={(e) =>
                      dispatch(
                        Actions.checkedTodo({
                          checked: e.target.checked,
                          title: item.title,
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
                        onChange={(e) =>
                          dispatch(Actions.changeTask(e.target.value))
                        }
                      />
                      <IconButton
                        onClick={(event) => {
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
              onChange={(e) => dispatch(Actions.changeTodo(e.target.value))}
              label="Votre tâche"
              variant="filled"
            />

            <StyledButton
              variant="contained"
              color="primary"
              size="large"
              onClick={(event) => {
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
            value={form.name}
            id="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <TextField
            label="Firstname"
            variant="outlined"
            value={form.firstname}
            id="firstname"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <TextField
            label="Username"
            variant="outlined"
            value={form.username}
            id="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <TextField
            label="Age"
            variant="outlined"
            value={form.age}
            id="age"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            Valider
          </Button>
          {valid && <p>Formulaire envoyé</p>}
          {novalid && <p>Ca fonctionne pas</p>}
          <br />
          <hr className={classes.hr} />
          <Typography variant="h4">Connect with facebook & google</Typography>
          <FacebookLogin
            appId="267103778007056"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
