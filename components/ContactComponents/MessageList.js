// MessageList.js
import { useRouter } from 'next/router';
import { MessageInbox } from '../Icons';

const MessageList = ({ allMessages, selectedMessageId }) => {
  const router = useRouter();
  const unreadCount = allMessages.filter((msg) => !msg.read).length;
  return (
   
      <div className=" p-2 rounded-lg">
        <div className='bg-slate-300 p-3 flex gap-10'>
        <p className="font-bold text-xl ">All Messages</p>
        <div className="relative">
          <MessageInbox className='w-6 h-6' />
          {unreadCount > 0 && (
            <span className="absolute  right-0 left-5 bottom-6 bg-green-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        </div>
       
        <div className="message-list bg-slate-200 overflow-scroll " style={{ height: '475px' }}>
          <ul>
            {allMessages.map((msg) => (
              <li
                key={msg._id}
                className={` ${selectedMessageId === msg._id ? 'bg-white' : ''}`} // Apply bg-white class if selected
                onClick={() => router.push(`/message/${msg._id}`)} // Redirect to message detail page
              >
                <div className={`p-2 cursor-pointer ${!msg.read ? 'font-bold' : ''}`}> {/* Apply font-bold class for unread messages */}
                  <p><span className="">{msg.firstName} {msg.lastName}</span></p>
                  <p>{msg.message.slice(0, 20)}...</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    
  );
};

export default MessageList;
