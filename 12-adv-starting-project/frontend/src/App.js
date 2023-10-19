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
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import NewEventPage from './components/NewEventPage';
import EditEventPage from './components/EditEventPage';
import RootLayout from './components/RootLayout';
import EventRootLayout from './components/EventRootLayout';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventRootLayout />, children: [
          { index: true, element: <EventsPage /> },
          { path: ':id', element: <EventDetailPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':id/edit', element: <EditEventPage /> }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
