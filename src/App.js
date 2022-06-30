/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useRef, useEffect } from "react";
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import usePrevious from "./utilities/usePreviosFunc";

// REMENBER TO REFACTOR THE USE PREVIUS FUNCTION
// AND BUILD THE HEADING TEXT SETTER FUNCTIONALITY

const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed,
};

// The javascript Object.key method returns an array of the object's 
// own enumerable property names, iterated in the same order that a normal loop would.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
const FILTER_NAMES = Object.keys(FILTER_MAP);
// This const contain the value ["All", "Active", "Completed"]
// It is used to create the buttons in the FilterButton component

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTask = tasks.filter(task => id !== task.id);
    setTasks(remainingTask);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const [filter, setFilter] = useState('All');

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));



  const filterList = FILTER_NAMES.map(filterName => (
    <FilterButton
      key={filterName}
      name={filterName}
      isPressed={filterName === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    // The id asignation have this format: todo-{id}
    // Because id is the index of the array, we need to add 1 to the index
    // to get the id of the new task.
    // I used the way beacause it is easier to understand.
    // And no need any installation.
    // However, in the MDN tutorial this is acomplished by using the Nano ID library (see on: https://github.com/ai/nanoid)
    // Look at the end of this file to see how it is used in it.
    const newTask = { id: `todo-${tasks.lenght}`, name: name, completed: false };
    // Here we are using the javascript spread syntax to create a new object:
    // Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    setTasks([...tasks, newTask]);
  }

  // This counts the number of tasks that are no completed
  const taskCounter = taskList.length;
  const tasksNoun = taskCounter === 1 ? 'task' : 'tasks';
  const listHeadingText = `${taskCounter} ${tasksNoun} left`;

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">

        {filterList}

      </div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {listHeadingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;

// THIS IS HOW MDN TUTORIAL IS USED:
// The Nano ID library is used to generate a unique id for each task.
// It is used in the addTask function to generate a unique id for each task.

// 1. npm install nanoid
// 2. import { nanoid } from 'nanoid';
// 3. const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
