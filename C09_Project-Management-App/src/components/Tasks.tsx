import NewTask from "./NewTask.tsx";
import React from "react";
import {Task} from "../model/project.ts";

interface TasksProps {
    onAddTask: (task: string) => void;
    onDeleteTask: (taskId: string) => void;
    tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({tasks, onAddTask, onDeleteTask}) => {
    let content: React.ReactNode;
    if (tasks.length === 0) {
        content = <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>
    } else {
        content = <ol className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map(task =>
                <li key={task.id} className="flex justify-between my-4">
                    <span>{task.text}</span>
                    <button className="text-stone-700 hover:text-red-500" onClick={() => onDeleteTask(task.id)}>Clear
                    </button>
                </li>)}
        </ol>
    }
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAddTask={onAddTask}/>
            {content}
        </section>
    )
}

export default Tasks;