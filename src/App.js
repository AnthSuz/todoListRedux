import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./actions";

function App() {
  const tasks = useSelector(state => state.toDoReducers.tasks);
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function handleChange(index, checked) {
    const newTasks = [...tasks];
    const task = newTasks[index];
    task.done = checked;
    // setTasks(newTasks);
  }

  function handleDelete(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    // setTasks(newTasks);
  }

  return (
    <>
      <h2>TO DO LIST</h2>

      {tasks &&
        tasks.map((item, index) => {
          return (
            <div key={item + index}>
              <input
                type="checkbox"
                id={item.title}
                onChange={e => handleChange(index, e.target.checked)}
                checked={tasks[index].done}
                className={tasks[index].done && "taskChecked"}
              />
              {/* {!item.edit ? ( */}
              <label htmlFor={item.title} key={index}>
                {item.title}
              </label>
              {/* // ) : (
              //   <input type="text" value={item.title || ""} />
              // )} */}
              <label htmlFor={item.title} key={index}>
                {item.title}
              </label>
              <button
                onClick={() => {
                  dispatch(Actions.deleteTodo(item));
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  dispatch(Actions.editTodo(item));
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      <form>
        <input
          type="text"
          value={taskInput}
          onChange={event => {
            setTaskInput(event.target.value);
          }}
        ></input>
        <button
          onClick={event => {
            event.preventDefault();
            dispatch(Actions.addTodo(taskInput));
            setTaskInput("");
          }}
        >
          Ajouté
        </button>
      </form>
    </>
  );
}

export default App;
