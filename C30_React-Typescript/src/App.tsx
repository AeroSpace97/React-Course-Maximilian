import './App.css'
import Todos from "./components/Todos.tsx";
import NewTodo from "./components/NewTodo.tsx";
import {TodosContextProvider} from "./store/todos-context.tsx";

function App() {


    return (
        <TodosContextProvider>
            <NewTodo/>
            <Todos/>
        </TodosContextProvider>
    )
}

export default App
