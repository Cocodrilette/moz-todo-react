import React, { useState } from "react";
import { nullValidator } from "../utilities/validators";

export default function Form(props) {

  // useState is a hook that lets you add react state to your component
  // useState returns an array with two elements:
  //  [currentStateValue, setStateFunction]
  // Here we are using the first element of the array to set the value of the input
  // and the second element to set the function to update the value of the input
  // We are doing this by using the javascript array destructuring syntax:
  // a expression that makes it possible to unpack values from arrays, 
  // or properties from objects, into distinct variables. 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (nullValidator(name)) {
      alert('Please enter a task name');
      setName('');
    } else {
      props.addTask(name);
      setName('');
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

