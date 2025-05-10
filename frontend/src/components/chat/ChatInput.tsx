import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input dark:bg-[#1e1e2f] bg-white dark:text-white text-black flex items-center p-2 border-t border-gray-300">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        aria-label="Type a message"
      />
      <button 
        type="submit"
        className="send-button"
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;