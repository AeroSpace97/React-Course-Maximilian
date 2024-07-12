import EventsNavigation from "../components/EventsNavigation.tsx";
import {Outlet} from "react-router-dom";

const EventLayout = () => {
    return (
        <>
            <aside>
                <EventsNavigation/>
            </aside>
            <section>
                <Outlet/>
            </section>
        </>
    )
}

export default EventLayout;