import { Link, Outlet, useNavigation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';

import Header from '../Header.jsx';

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigation();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal })
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      navigate('/events');
    }
  });

  const deleteHandler = () => {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content =
      <div className='center'>
        <p>is loading ...</p>
      </div>;
  }

  if (data) {
    content = <>
      <header>
        <h1>{data.title}</h1>
        <nav>
          <button onClick={deleteHandler}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        <img src={`http://localhost:3000/${data.image}`} alt="" />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </>;
  }

  console.log(data);

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
