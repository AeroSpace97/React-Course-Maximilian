export interface Project {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    text: string;
}