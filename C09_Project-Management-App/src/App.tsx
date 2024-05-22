import './App.css'
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected.tsx";
import React, {useState} from "react";
import NewProject from "./components/NewProject.tsx";
import {Project} from "./model/project.ts";
import SelectedProject from "./components/SelectedProject.tsx";

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | boolean>(false);

    const handleStartAddProject = () => {
        setSelectedProjectId(true);
    }

    const handleSelectProject = (id: string) => {
        setSelectedProjectId(id);
    }

    const handleAddProject = (project: Omit<Project, 'id' | 'tasks'>) => {
        const id = Math.random().toString(36);
        setProjects(prevProjects => prevProjects.concat({...project, id, tasks: []}));
        setSelectedProjectId(false);
    }

    const handleCancelAddProject = () => {
        setSelectedProjectId(false);
    }

    const handleDeleteProject = (id: string) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        setSelectedProjectId(false);
    }

    const handleAddTask = (task: string) => {
        const id = Math.random().toString(36);
        setProjects(prevProjects => {
            return prevProjects.map(project => {
                if (project.id === selectedProjectId) {
                    return {...project, tasks: project.tasks.concat({id, text: task})}
                }
                return project;
            })
        })
    }

    const handleDeleteTask = (taskId: string) => {
        setProjects(prevProjects => {
            return prevProjects.map(project => {
                if (project.id === selectedProjectId) {
                    return {...project, tasks: project.tasks.filter(task => task.id !== taskId)}
                }
                return project;
            })
        })
    }

    let content: React.ReactNode;

    if (selectedProjectId === false) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    } else if (selectedProjectId === true) {
        content = <NewProject onAddProject={handleAddProject} onCancelAddProject={handleCancelAddProject}/>
    } else {
        const selectedProject = projects.find(project => project.id === selectedProjectId)!;
        content =
            <SelectedProject project={selectedProject} onDeleteProject={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}/>
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSideBar projects={projects}
                            selectedProjectId={selectedProjectId}
                            onStartAddProject={handleStartAddProject}
                            onSelectProject={handleSelectProject}/>
            {content}
        </main>
    )
}

export default App
