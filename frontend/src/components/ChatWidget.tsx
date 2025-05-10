'use client';
import { useState, useEffect } from 'react';
import ChatBubble from './chat/ChatBubble';
import ChatInput from './chat/ChatInput';
import { useChatSession } from '@/hooks/useChatSession';
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, addWelcomeMessage, sendMessage } = useChatSession();

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen) {
      addWelcomeMessage();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div className="chat-widget-container">
      {/* Minimized chat bubble */}
      {!isOpen && <ChatBubble onClick={toggleChat} />}
      
      {/* Expanded chat window */}
      {isOpen && (
        <div className="chat-window">
          <ChatHeader onClose={toggleChat} />
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;