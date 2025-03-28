import React, { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaLock, FaUser, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

// Login and Signup Modal Component
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setName('');
        setRememberMe(false);
      }, 300); // Wait for the close animation
    }
  }, [isOpen]);
  
  // Set initial mode when modal opens
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log(mode === 'login' ? 'Login attempt' : 'Signup attempt', { email, password, name });
    
    // Close modal after form submission (you might want to handle this differently based on auth success/failure)
    onClose();
  };
  
  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="auth-modal-overlay">
      <div className={`auth-modal ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="auth-form-container">
          <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label>
                  <FaUser className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </label>
              </div>
            )}
            
            <div className="form-group">
              <label>
                <FaEnvelope className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </label>
            </div>
            
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </label>
            </div>
            
            {mode === 'login' && (
              <div className="form-options">
                <label className="remember-me">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password" className="forgot-password">Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="submit-button">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div className="social-login">
            <p>Or sign in using</p>
            <div className="social-buttons">
              <button className="social-button facebook">
                <FaFacebookF />
              </button>
              <button className="social-button twitter">
                <FaTwitter />
              </button>
              <button className="social-button google">
                <FaGoogle />
              </button>
            </div>
          </div>
          
          <div className="switch-mode">
            {mode === 'login' ? (
              <p>Don't have an account? <button onClick={switchMode}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={switchMode}>Login</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;