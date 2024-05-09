import React, {useContext, useRef} from "react";
import classes from './NewTodo.module.css';
import {TodosContext} from "../store/todos-context.tsx";


const NewTodo: React.FC = () => {

    const todoCtx = useContext(TodosContext)
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            // exit the function if the entered text is empty
            return;
        }

        todoCtx.addTodo(enteredText);
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <label htmlFor="text">Todo text</label>
            <input type="text" id="text" ref={todoTextInputRef}/>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo;