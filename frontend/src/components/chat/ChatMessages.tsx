import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: { text: string; isUser: boolean; timestamp: Date }[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-messages dark:bg-[#1e1e2f] bg-white dark:text-white text-black overflow-y-auto flex-1 p-4">
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index} 
          text={msg.text} 
          isUser={msg.isUser} 
          timestamp={msg.timestamp} 
        />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;