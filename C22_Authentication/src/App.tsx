// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import EventsPage, {loader as eventsLoader} from "./pages/EventsPage.tsx";
import NewEventPage from "./pages/NewEventPage.tsx";
import EventDetailPage, {loader as eventDetailLoader, action as deleteEventAction} from "./pages/EventDetailPage.tsx";
import EditEventPage from "./pages/EditEventPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import EventLayout from "./layouts/EventLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import {action as manipulateEventAction} from "./components/EventForm.tsx";
import NewsletterPage, {action as newsletterAction} from "./pages/NewsletterPage.tsx";
import Authentication, {action as authAction} from "./pages/AuthenticationPage.tsx";
import {action as logoutAction} from './pages/Logout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {
        path: 'events',
        element: <EventLayout/>,
        children: [
          {
            index: true,
            element: <EventsPage/>,
            loader: eventsLoader
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage/>,
                action: deleteEventAction
              },
              {
                path: 'edit',
                element: <EditEventPage/>,
                action: manipulateEventAction
              }
            ]
          },
          {
            path: 'new',
            element: <NewEventPage/>,
            action: manipulateEventAction
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <Authentication/>,
        action: authAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }

]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
