import {Form, json, redirect, useActionData, useNavigate, useNavigation} from 'react-router-dom';
import type {Event} from "../model/Event.ts";

import classes from './EventForm.module.css';
import React from "react";
import {getAuthToken} from "../util/auth.ts";

interface EventFormProps {
  method?: "get" | "post" | "put" | "patch" | "delete" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  event?: Event;
}

const EventForm: React.FC<EventFormProps> = ({event, method}) => {
  const data: any = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }


  return (
    <Form method={method} className={classes.form}>
      {/*@ts-ignore*/}
      {data && data.errors && <ul>{Object.values(data.errors).map((err: string) => <li id={err}>{err}</li>)}</ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5} required
                  defaultValue={event ? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({request, params}: { request: any, params: any }) => {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  let url = 'http://localhost:8080/events';
  if (method === 'PATCH') {
    const eventId = params.id;
    url += '/' + eventId;
  }

  const token = getAuthToken();
  const response: any = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorzation': 'Bearer ' + token
      },
      body: JSON.stringify(eventData)
    }
  );

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Could not save event.'}, {status: 500});
  }

  return redirect('/events');
}