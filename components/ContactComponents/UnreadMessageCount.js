
import React from 'react';
import { MessageInbox } from '../Icons';


const UnreadMessageIcon = ({ unreadCount, className }) => {
  return (
    <div className={`relative ${className}`}>
      <MessageInbox className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute right-0 left-6 bottom-7 bg-green-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default UnreadMessageIcon;
