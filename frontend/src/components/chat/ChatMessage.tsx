import { useState } from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ text, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'} dark:bg-[#1e1e2f] bg-white dark:text-white text-black`}>
      {!isUser && (
        <div className="bot-avatar">
          <img 
            src="/lovable-uploads/71a1e40d-1fde-4bbe-96c9-ae4d20713455.png" 
            alt="AI Assistant" 
            className="avatar-image-small"
          />
        </div>
      )}
      <div className="message-content ">
        <div className={`message-text text-wrap  `}>{text}</div>
        <div className="message-time">
          {`${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;