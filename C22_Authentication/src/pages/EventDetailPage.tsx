import EventItem from "../components/EventItem.tsx";
import {Await, defer, json, LoaderFunction, LoaderFunctionArgs, redirect, useRouteLoaderData} from "react-router-dom";
import type {Event} from "../model/Event.ts";
import EventsList from "../components/EventsList.tsx";
import {Suspense} from "react";
import {getAuthToken} from "../util/auth.ts";

const EventDetailPage = () => {
  const {event, events} = useRouteLoaderData('event-detail') as { event: Event, events: Event[] };
  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      {message: "Could not fetch events"},
      {status: 500}
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvent(id: string) {
  const response = await fetch('http://localhost:8080/events/' + id)


  if (!response.ok) {
    throw json(
      {message: "Could not fetch detail for selected event."},
      {status: 500}
    );
  }

  const resData = await response.json();
  return resData.event;
}


export const loader: LoaderFunction<any> = async ({params}: LoaderFunctionArgs) => {
  const id = params.id!;

  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  })

}

export async function action({request, params}: { request: any, params: any }) {
  const id = params.id;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
    headers: {
      'Authorization': "Bearer " + token
    }
  });

  if (!response.ok) {
    throw json({message: 'Could not delete event.'}, {status: 500});
  }

  return redirect('/events');
}