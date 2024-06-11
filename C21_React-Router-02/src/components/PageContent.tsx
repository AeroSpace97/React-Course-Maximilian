import classes from './PageContent.module.css';
import React from "react";

interface PageContentProps {
    title: string;
    children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({title, children}) => {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default PageContent;