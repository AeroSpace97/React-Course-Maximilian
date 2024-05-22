import React, {useState} from "react";

interface NewTaskProps {
    onAddTask: (task: string) => void;
}

const NewTask: React.FC<NewTaskProps> = ({onAddTask}) => {

    const [enteredTask, setEnterTask] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnterTask(event.target.value);
    }

    const handleAddTask = () => {
        if (enteredTask.trim().length === 0) {
            return;
        }

        onAddTask(enteredTask);
        setEnterTask('');
    }

    return (<div className="flex items-center gap-4">
        <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={enteredTask}
               onChange={handleChange}/>
        <button className="text-stone-700 hover:text-stone-950" onClick={handleAddTask}>Add Task</button>
    </div>)
}

export default NewTask;