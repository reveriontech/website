import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaSmile, FaRobot } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const miniPromptRef = useRef(null);
  const quickMessageRef = useRef('');

  // Force clear localStorage for testing
  useEffect(() => {
    localStorage.removeItem('chatInteracted');
    console.log("Cleared localStorage");
  }, []);

  // Check local storage on component mount and delay mini prompt appearance
  useEffect(() => {
    console.log("Setting up prompt timer...");
    
    // For testing purposes, let's bypass the localStorage check
    // and always show the prompt after 3 seconds
    const promptTimer = setTimeout(() => {
      console.log("Timer fired - showing prompt");
      setShowPrompt(true);
    }, 3000);
    
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(promptTimer);
    };
  }, []);

  // Handle click outside to close mini prompt
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniPromptRef.current && !miniPromptRef.current.contains(event.target) && 
          !event.target.closest('.chat-toggle-btn')) {
        setShowPrompt(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && !welcomeShown) {
      setIsTyping(true);
      
      // Simulate AI typing example
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            type: 'assistant',
            content: 'Hello! I\'m your ReverionTech Assistant. How can I help you today?'
          }
        ]);
        setWelcomeShown(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, welcomeShown]);

  // Process quick message from mini prompt if available when opening chat
  useEffect(() => {
    if (isOpen && quickMessageRef.current && welcomeShown) {
      const quickMsg = quickMessageRef.current;
      
      // Only process if we have a message and welcome has been shown
      if (quickMsg && messages.length === 1) {
        // Add the user message (after a small delay to let the welcome message be seen)
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'user',
            content: quickMsg
          }]);
          
          // Then simulate assistant typing
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              type: 'assistant',
              content: `Thanks for your message about "${quickMsg}"! Our team is working on integrating a real AI assistant. For now, this is a demo of the chat interface.`
            }]);
          }, 1500);
          
          // Clear the ref
          quickMessageRef.current = '';
        }, 500);
      }
    }
  }, [isOpen, welcomeShown, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
    
    // Hide mini prompt when main chat is opened
    if (!isOpen) {
      setShowPrompt(false);
    }
  };

  const openChatFromPrompt = () => {
    setShowPrompt(false);
    setIsOpen(true);
  };

  const handleQuickMessageSubmit = (e) => {
    e.preventDefault();
    const quickMessage = e.target.elements.quickMessage.value.trim();
    if (!quickMessage) return;
    
    // Store the quick message in ref to be used after chat opens
    quickMessageRef.current = quickMessage;
    
    // Reset form
    e.target.reset();
    
    // Open chat
    setShowPrompt(false);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: message };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `Thanks for your message! Our team is working on integrating a real AI assistant. For now, this is a demo of the chat interface.`
      }]);
    }, 1500);
  };

  // Debug rendering
  console.log("Rendering with showPrompt =", showPrompt, "isOpen =", isOpen);

  return (
    <div className="chat-widget-container">
      {/* Mini Chat Prompt - Fixed visibility check */}
      {showPrompt && !isOpen && (
        <div className="mini-chat-prompt" ref={miniPromptRef}>
          <div className="mini-chat-header">
            <div className="mini-chat-avatar">
              <FaRobot />
            </div>
            <div className="mini-chat-user-info">
              <div className="mini-chat-name">ReverionTech Assistant</div>
              <div className="mini-chat-status">
                <span className="mini-status-dot"></span>
                Online
              </div>
            </div>
            <button onClick={() => setShowPrompt(false)} className="mini-chat-close">
              <FaTimes />
            </button>
          </div>
          
          <div className="mini-chat-content">
            <div className="mini-chat-message assistant">
              Hello! I'm your ReverionTech Assistant. How can I help you today?
            </div>
            
            <form onSubmit={handleQuickMessageSubmit} className="mini-chat-input-form">
              <FaSmile className="mini-chat-emoji" />
              <input 
                type="text" 
                name="quickMessage"
                placeholder="Ask me anything..." 
                className="mini-chat-input"
              />
              <button type="submit" className="mini-chat-send">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-user">
              <div className="user-avatar">
                <FaRobot className="robot-avatar" />
              </div>
              <div className="user-info">
                <div className="user-name">ReverionTech Assistant</div>
                <div className="user-status">
                  <span className="status-indicator"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="chat-actions">
              <button className="action-btn" onClick={toggleChat}>
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-footer">
            <form onSubmit={handleSubmit} className="chat-input-form">
              <button type="button" className="tool-btn">
                <FaSmile />
              </button>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="chat-input"
              />
              <button type="submit" className="send-btn" disabled={!message.trim()}>
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Chat with assistant"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default ChatWidget;