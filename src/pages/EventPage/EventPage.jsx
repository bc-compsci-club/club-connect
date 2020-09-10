import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Event';

const EventPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [eventData] = useState({
    id: '',
    name: '',
    title: '',
    presenter: '',
    presenterImage: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    banner: '',
    shortDescription: '',
    longDescription: '',
    meetingLink: null,
  });

  useEffect(() => {
    console.log('useEffect ran');
    const pathArray = window.location.pathname.split('/');
    const eventId = parseInt(pathArray[2]);

    try {
      // Get the events index
      axios
        .get('/data/events/events-list.json')

        .then((res) => {
          const events = res.data[eventId - 1];

          // Add event name to URL if it doesn't match the event name
          if (pathArray[3] !== (events.name || events.name + '/')) {
            // Check if "addtocalendar" is after the event name in the URL
            if (typeof pathArray[4] === 'undefined') {
              window.location.href = `${window.location.protocol}//${window.location.hostname}/events/${eventId}/${events.name}`;
            } else {
              window.location.href = `${window.location.protocol}//${window.location.hostname}/events/${eventId}/${events.name}/addtocalendar`;
            }
          }

          // Get the event data from the ID specified in the path
          axios
            .get(`/data/events/${eventId}-${events.name}/event.json`)

            .then((res) => {
              // TODO: Find a better way to do this
              const data = res.data;

              eventData.id = data.id;
              eventData.name = data.name;
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
              eventData.meetingLink = data.meetingLink;

              setLoading(false);
            })

            .catch((err) => {
              console.error(err);
            });
        })

        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error('Could not get event data!');
      console.err(err);
    }
  }, [eventData]);

  return (
    <div className="EventPage">
      <Event eventData={eventData} isLoading={isLoading} />
    </div>
  );
};

export default EventPage;
