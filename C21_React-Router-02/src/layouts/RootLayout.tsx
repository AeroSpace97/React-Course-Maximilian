import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";
const RootLayout = () => {

    return (<>
        <header>
            <MainNavigation />
        </header>
        <main>
            <Outlet />
        </main>
    </>)
}

export default RootLayout;