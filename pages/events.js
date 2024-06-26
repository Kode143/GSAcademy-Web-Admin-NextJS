import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import EventForm from '@/components/AddForms/EventForm';
import DeleteEvent from '@/components/DeleteModals/DeleteEvent'; // Import the DeleteEvent component
import axios from 'axios';
import Image from 'next/image';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);

  useEffect(() => { 
    axios.get('/api/events').then(response => {
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
      setExpandedStates(new Array(sortedEvents.length).fill(false)); // Initialize expanded states
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleReadMore = (index) => {
    const updatedExpandedStates = [...expandedStates];
    updatedExpandedStates[index] = !updatedExpandedStates[index]; // Toggle expanded state for the clicked event
    setExpandedStates(updatedExpandedStates);
  };

  const countWords = (text) => {
    return text.split(/\s+/).length;
  };

  return (
    <Layout>
      <div className='Flex flex-col'>
        <EventForm />
        <div className='mt-2 overflow-scroll' style={{ height: '525px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
  <div key={index} className="bg-gray-300 shadow-black shadow-md rounded-md p-2 " style={{ height: expandedStates[index] ? 'auto' : 'fit-content' }}>
    <h3 className="text-lg font-semibold mb-2 text-center">{event.title}</h3>
    <div className="image-container ">
      {event.images.map((image, imageIndex) => (
        <Image key={imageIndex} src={image.secure_url} alt={`Event ${index} Image ${imageIndex}`}
        width={600} height={200}
         style={{  marginBottom: '8px' }} />
      ))}
    </div>
    <div className="description-container overflow-hidden w-full mt-3" style={{ maxHeight: expandedStates[index] ? 'none' : '50px' }}> 
      <p className="overflow-y-hidden">{event.description}</p>
    </div>
    {countWords(event.description) > 20 && (
      <button 
        onClick={() => handleReadMore(index)} 
        className="text-white hover:underline focus:outline-none bg-black p-0.5 rounded-md"
      >
        {expandedStates[index] ? 'Hide' : 'Read More...'}
      </button>
    )}
    <div className='mt-2 bg-blue-500 w-9/12 rounded-md p-2'>Date : {formatDate(event.date)}</div>
    <div className="w-20 mt-4">
      <DeleteEvent eventId={event._id} eventTitle={event.title} eventImageUrl={event.images} />
    </div>
  </div>
))}

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Events;
