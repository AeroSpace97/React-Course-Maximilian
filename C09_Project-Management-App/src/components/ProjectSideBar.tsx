import Button from "./Button.tsx";
import React from "react";
import {Project} from "../model/project.ts";
import clsx from "clsx";

interface ProjectSideBarProps {
    onStartAddProject: () => void;
    onSelectProject: (id: string) => void;
    projects: Project [];
    selectedProjectId: string | boolean;
}

const ProjectSideBar: React.FC<ProjectSideBarProps> = ({
                                                           projects,
                                                           selectedProjectId,
                                                           onStartAddProject,
                                                           onSelectProject
                                                       }) => {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your project</h2>
            <Button onClick={onStartAddProject}>+ Add Project</Button>

            <ul className="mt-8">
                {projects.map(project => {
                    const basicClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                    const activeClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800";

                    return <li key={project.id}>
                        <button
                            className={clsx([selectedProjectId === project.id ? activeClasses : basicClasses])}
                            onClick={() => onSelectProject(project.id)}>{project.title}</button>
                    </li>
                })}
            </ul>
        </aside>
    )
}

export default ProjectSideBar;