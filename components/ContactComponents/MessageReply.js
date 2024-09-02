import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';

const MessageReply = ({ messageData }) => {
  const [subject, setSubject] = useState('');
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for BarLoader
  const router = useRouter();

  useEffect(() => {
    // Initialize messages with the received message followed by replies
    setMessages([{ body: messageData.message, received: true }, ...(messageData.replies || [])]);
  }, [messageData]);

  

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
      subject: capitalizeFirstLetter(subject),
      body: capitalizeFirstLetter(replyText),
      firstName: messageData.firstName,
      lastName: messageData.lastName,
      contactId: messageData._id, // Add contactId
    };

    setLoading(true); // Start loading

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
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            subject: data.subject,
            body: data.body,
            createdAt: new Date(),
            received: false,
          },
        ]);
        setSubject('');
        setReplyText('');
        router.reload();
      } else {
        console.error('Failed to send email:', response.statusText);
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleChange = (e) => {
    setSubject(capitalizeFirstLetter(e.target.value));
  };

  const handleChanged = (e) => {
    setReplyText(capitalizeFirstLetter(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-200 p-2 rounded-lg">
      <div>
        <p className="text-xl">
          <span className="font-bold">Name:</span> <span>{messageData.firstName}</span> {messageData.lastName}
        </p>
        <div className="flex flex-col mt-3 gap-2 overflow-scroll" style={{ height: '250px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.received ? 'flex-row justify-start' : 'flex-row justify-end'} gap-2`}
            >
              {msg.received ? (
                <>
                  <div className="p-1 rounded-full max-h-9 bg-blue-800 text-white flex items-center justify-center">
                    <span>
                      {messageData.firstName.charAt(0).toUpperCase()}
                      {messageData.lastName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="bg-white rounded-md p-1">{msg.body}</p>
                </>
              ) : (
                <>
                  <p className="bg-white rounded-md p-1">{msg.body}</p>
                  <Image src="/uploads/circle.png" width={32} height={32} alt="Logo" className="h-8 w-8" />
                </>
              )}
            </div>
          ))}
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
        <div className="flex justify-center mt-2">
          {!loading ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleReply}
            >
              Send
            </button>
          ) : (
            <BarLoader color="#3b82f6" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageReply;
