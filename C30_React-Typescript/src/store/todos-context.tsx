import Todo from "../models/todo.ts";
import React, {useState} from "react";

interface ITodosContextType {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;

}

export const TodosContext = React.createContext<ITodosContextType>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {}
});

export const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [todos, setTodos] = useState<Todo []>([]);

    const handleAddTodo = (todoText: string) => {
        setTodos((prevTodos) => {
            return [new Todo(todoText), ...prevTodos];
        })
    }

    const handleRemoveTodo = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId);
        })
    }

    const contextValue = {
        items: todos,
        addTodo: handleAddTodo,
        removeTodo: handleRemoveTodo
    }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
}