import React, {useContext} from "react";
import classes from './TodoItem.module.css';
import {TodosContext} from "../store/todos-context.tsx";

interface TodoItemProps {
    id: string;
    text: string;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
    const todoCtx = useContext(TodosContext);
    return (
        <li className={classes.item} onClick={() => todoCtx.removeTodo(props.id)}>
            {props.text}
        </li>
    )
}

export default TodoItem;