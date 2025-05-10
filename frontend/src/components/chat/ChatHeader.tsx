
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="chat-header">
      <div className="chat-avatar">
        <img 
          src="/lovable-uploads/71a1e40d-1fde-4bbe-96c9-ae4d20713455.png" 
          alt="AI Assistant" 
          className="avatar-image"
        />
      </div>
      <div className="header-text">How Can I help</div>
      <button 
        onClick={onClose}
        className="close-button"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;