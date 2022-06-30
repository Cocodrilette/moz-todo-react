import React, { useState, useRef, useEffect } from "react";
import { nullValidator } from "../utilities/validators";
import usePrevious from "../utilities/usePreviosFunc";

export default function Todo(props) {

    
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);

    // The useRef hook is a hook that lets you access the DOM node of a Ref.
    // It's similar to the useState hook, but it doesn't have a setter.
    // It's useful for keeping track of the DOM node of a Ref.
    // Also, This property can be a reference to anything we want and look that reference up later
    // Particularly useful for keeping track of the DOM node of a Ref
    const inputRef = useRef(null);
    const editButtonRef = useRef(null);
    
    function handleEdit(e) {
        setNewName(e.target.value);
    }

    function handleEditSubmit(e) {
        if (nullValidator(newName)) {
            alert('Please enter a task name');
            setNewName('');
        } else {
            e.preventDefault();
            props.editTask(props.id, newName);
            setNewName('');
            setEditing(false);
        }
    }
    
    const editingTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleEdit}
                    ref={inputRef}
                    />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button
                    type="submit"
                    className="btn btn__primary todo-edit"
                    onClick={handleEditSubmit}
                    >
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                    >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick = {() => {
                        props.deleteTask(props.id);
                    }}
                    
                    >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );
    const wasEditing = usePrevious(isEditing);

    // The useEffect is a hook that lets you run some code after every render.
    // It's useful for running some code after every render.
    // useEffect take a function as an argument and that function will be called after every render.
    useEffect(() => {
        if (!wasEditing && isEditing) {
            inputRef.current.focus();
        } 
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [isEditing, wasEditing]);
    // use Effect takes tow arguments:
    // 1. A function that will be called after every render.
    // 2. An array of dependencies.
    // This array is a list of values useEffect() should depend on. 
    // With these values included, useEffect() will only run when one of those values changes. 
    // We only want to change focus when the value of isEditing changes.
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility#focusing_between_templates
    
    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}