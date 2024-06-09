import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const MessageCard = ({ contact, selectedMessageId, handleSelectMessage }) => {
  const router = useRouter();

  const handleClick = async () => {
    handleSelectMessage(contact._id);
    await axios.put(`/api/contact/${contact._id}`, { read: true }); // Update read status to true
    router.push(`/message/${contact._id}`);
  };

  const cardClass = `bg-white rounded-lg shadow p-4 cursor-pointer ${
    selectedMessageId === contact._id ? '' : !contact.read ? 'bg-green-100 font-bold' : ''
  }`;

  return (
    <div className={cardClass} onClick={handleClick}>
      <p className="">{contact.firstName} {contact.lastName}</p>
      <p>{contact.message.slice(0,27)}...</p>
    </div>
  );
};

export default MessageCard;
