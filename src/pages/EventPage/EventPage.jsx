import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Event';

const EventPage = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [eventData] = useState({
    title: '',
    presenter: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    image: '',
    shortDescription: '',
    longDescription: '',
  });

  useEffect(() => {
    console.log('useEffect ran');
    const pathArray = window.location.pathname.split('/');
    const eventId = parseInt(pathArray[2]);

    // Get the events index
    axios
      .get('/data/events/events-list.json')

      .then((res) => {
        const events = res.data[eventId - 1];

        // Get the event data from the ID specified in the path
        axios
          .get(`/data/events/${events.dataLocation}/event.json`)

          .then((res) => {
            // TODO: Find a better way to do this
            const data = res.data;

            eventData.id = data.id;
            eventData.dataLocation = data.dataLocation;
            eventData.title = data.title;
            eventData.presenter = data.presenter;
            eventData.presenterImage = data.presenterImage;
            eventData.date = data.date;
            eventData.startTime = data.startTime;
            eventData.endTime = data.endTime;
            eventData.location = data.location;
            eventData.banner = data.banner;
            eventData.shortDescription = data.shortDescription;
            eventData.longDescription = data.longDescription;

            // setTimeout(() => setLoading(false), 500);
            setLoading(false);
          })

          .catch((err) => {
            console.error(err);
          });
      })

      .catch((err) => {
        console.error(err);
      });
  }, [eventData]);

  return (
    <div className="EventPage">
      <Event eventData={eventData} isLoading={isLoading} />
    </div>
  );
};

export default EventPage;
