import EventForm from "../components/EventForm.tsx";
import {useRouteLoaderData} from "react-router-dom";
import type {Event} from "../model/Event.ts";

const EditEventPage = ()=>{

    const data = useRouteLoaderData('event-detail') as { event: Event }

    return <EventForm event={data.event} method="PATCH"/>;
}

export default EditEventPage;