import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaSmile, FaRobot } from 'react-icons/fa';
import axios from 'axios';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const miniPromptRef = useRef(null);
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async () => {
    if (!userInput.trim()) return
    
    // Add user message
    const userMessage = { role: 'user', content: userInput }
    setMessages([...messages, userMessage]);
    setUserInput('')
    setLoading(true)
    
    try {
      const response = await axios.post(
          'http://localhost:3500/chat',
          { prompt: userInput },
          { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data?.message) {
          setMessages((prev) => [...prev, { role: 'ai', content: response.data.message[0].text }])
        }
    } catch (error) {
        console.error('Error fetching AI response:', error)
    } finally {
        setLoading(false)
    }
  };

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return content.split(urlRegex).map((part, index) =>
      part.match(urlRegex) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {part}
        </a>
      ) : (
        part
      )
    )
  }

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

              {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.role}`}>
                        <div className="message-content">{renderMessageContent(msg.content)}</div>
                      </div>
                    ))
                ) : (
                    <span>Hello! I'm your ReverionTech Assistant. How can I help you today?</span>
                )}

              {loading && (
                <div className="chat-message assistant">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mini-chat-input-form">
              <FaSmile className="mini-chat-emoji" />
              <input 
                type="text" 
                name="quickMessage"
                placeholder="Ask me anything..." 
                className="mini-chat-input"
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
              />
              <button onClick={handleSubmit} className="mini-chat-send">
                <FaPaperPlane />
              </button>
            </div>
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
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-content">{renderMessageContent(msg.content)}</div>
              </div>
            ))}
            
            {loading && (
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
            <div className="chat-input-form">
              <button type="button" className="tool-btn">
                <FaSmile />
              </button>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                className="chat-input"
              />
              <button onClick={handleSubmit} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
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