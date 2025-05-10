import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble = ({ onClick }: ChatBubbleProps) => {
  return (
    <button 
      onClick={onClick}
      className="chat-bubble"
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatBubble;