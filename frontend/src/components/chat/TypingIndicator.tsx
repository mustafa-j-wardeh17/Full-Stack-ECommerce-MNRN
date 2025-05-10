const TypingIndicator = () => {
    return (
      <div className="message bot-message">
        <div className="bot-avatar">
          <img 
            src="/lovable-uploads/71a1e40d-1fde-4bbe-96c9-ae4d20713455.png" 
            alt="AI Assistant" 
            className="avatar-image-small"
          />
        </div>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  };
  
  export default TypingIndicator;