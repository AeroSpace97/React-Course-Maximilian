import MainNavigation from "../components/MainNavigation.tsx";
import PageContent from "../components/PageContent.tsx";
import {useRouteError} from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError() as Response;

    let title = "An error occurred!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        // @ts-ignore
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Page not found!";
        message = "The page you are looking for does not exist!";
    }

    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage;