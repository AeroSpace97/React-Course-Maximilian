import React, {useContext} from "react";
import TodoItem from "./TodoItem.tsx";
import classes from "./Todos.module.css";
import {TodosContext} from "../store/todos-context.tsx";



const Todos: React.FC = () => {
    const todoCtx = useContext(TodosContext);
    return (
        <ul className={classes.todos}>
            {todoCtx.items.map(item => (
                <TodoItem key={item.id} {...item}/>
            ))}
        </ul>
    )
}

export default Todos;