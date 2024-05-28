import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";

const RootLayout = ()=>{
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;