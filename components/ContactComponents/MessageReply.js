import React, { useState } from 'react';

const MessageReply = ({ messageData }) => {
  const [subject, setSubject] = useState('');
  const [replyText, setReplyText] = useState('');
  const [repliedMessage, setRepliedMessage] = useState('');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleReply = async () => {
    if (!subject || !replyText) {
      alert('Please enter a subject and message to reply.');
      return;
    }

    const data = {
      to: messageData.email,
      subject: capitalizeFirstLetter(subject), // Capitalize subject
      body: capitalizeFirstLetter(replyText), // Capitalize reply text
      firstName: messageData.firstName,
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Email sent successfully!');
   
      } else {
        console.error('Failed to send email:', response.statusText);
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    }
  };

  const handleChange = (e) => {
    setSubject(capitalizeFirstLetter(e.target.value)); // Capitalize subject as user types
  };

  const handleChanged = (e) => {
    setReplyText(capitalizeFirstLetter(e.target.value)); // Capitalize reply text as user types
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-200 p-2 rounded-lg">
      <div>
        <p className="text-xl">
          <span className="font-bold">Name:</span> <span>{messageData.firstName}</span> {messageData.lastName}
        </p>
        <div className="flex flex-col mt-3 gap-2 overflow-scroll" style={{ height: '250px' }}>
          <div className="flex flex-row gap-2">
            <div className="bg-white p-1 rounded-full max-h-9">
              {messageData.firstName.charAt(0).toUpperCase()}{messageData.lastName.charAt(0).toUpperCase()}
            </div>
            <p className="bg-white p-1 me-2">{messageData.message}</p>
          </div>
        
        </div>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Subject"
          className="border rounded-lg py-2 px-3 mx-16"
          value={subject}
          onChange={handleChange}
        />
        <textarea
          placeholder="Type your reply here..."
          className="border rounded-lg py-2 px-3 my-2 mx-10 h-32 resize-none"
          value={replyText}
          onChange={handleChanged}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleReply}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageReply;
