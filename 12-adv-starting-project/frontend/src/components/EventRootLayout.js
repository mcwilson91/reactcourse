import { Outlet } from 'react-router-dom';
import EventsNavigation from './EventsNavigation';

const EventRootLayout = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    )

};

export default EventRootLayout;