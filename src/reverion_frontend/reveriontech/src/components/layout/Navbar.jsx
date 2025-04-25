import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import AuthModal from '../sections/AuthModal';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/Navbar.css'; 

import {FaPhone} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [hoveredItem, setHoveredItem] = useState(null);
  const navbarCollapseRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  
  // Check if we're in mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Initialize dropdown functionality with enhanced animations
  useEffect(() => {
    if (!isMobile) {
      // Remove the old jQuery hover handlers
      $('.dropdown').off('mouseenter mouseleave');
      
      // Add new event listeners for smoother animations
      $('.dropdown').each(function() {
        const dropdown = $(this);
        const menu = dropdown.find('.dropdown-menu');
        const items = menu.find('.dropdown-item');
        
        // Add staggered animation to dropdown items
        items.each(function(index) {
          $(this).css({
            'transition-delay': `${0.05 * (index + 1)}s`,
            'transform': 'translateX(-10px)',
            'opacity': '0'
          });
        });
        
        dropdown.on('mouseenter', function() {
          menu.stop(true, true).css('display', 'block');
          
          // Trigger reflow
          menu[0].offsetHeight;
          
          // Animate the container
          menu.css({
            'opacity': '1',
            'transform': 'translateY(0) scale(1)',
            'visibility': 'visible'
          });
          
          // Animate the items with staggered timing
          items.each(function(index) {
            const $this = $(this);
            setTimeout(() => {
              $this.css({
                'transform': 'translateX(0)',
                'opacity': '1'
              });
            }, 50 * index);
          });
        });
        
        dropdown.on('mouseleave', function() {
          // Reset item animations first
          items.css({
            'transform': 'translateX(-10px)',
            'opacity': '0',
            'transition-delay': '0s'
          });
          
          // Then fade out the container
          menu.css({
            'opacity': '0',
            'transform': 'translateY(12px) scale(0.95)',
            'visibility': 'hidden'
          });
          
          // Finally hide after transition is complete
          setTimeout(() => {
            if (!dropdown.is(':hover')) {
              menu.css('display', 'none');
            }
          }, 350);
        });
      });
    } else {
      // For mobile, use different animation with slide effect
      $('.dropdown-toggle').off('click').on('click', function(e) {
        e.preventDefault();
        const menu = $(this).next('.dropdown-menu');
        const items = menu.find('.dropdown-item');
        
        if (menu.hasClass('show')) {
          items.css({
            'transform': 'translateX(-10px)',
            'opacity': '0'
          });
          
          setTimeout(() => {
            menu.removeClass('show');
          }, 300);
        } else {
          menu.addClass('show');
          
          items.each(function(index) {
            const $this = $(this);
            setTimeout(() => {
              $this.css({
                'transform': 'translateX(0)',
                'opacity': '1'
              });
            }, 100 * (index + 1));
          });
        }
      });
    }
  }, [isMobile]);
  
  // Handle navbar sticky on scroll and track active section
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      
      // Only update active section if we're on the home page
      if (!isScrollingRef.current && location.pathname === '/') {
        updateActiveSection();
      }
    };
    
    const updateActiveSection = () => {
      const sections = ['home', 'about', 'offer', 'team', 'price', 'contact', 'partners', 'faq', 'portfolio'];
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const offset = 150;
        return rect.top <= offset && rect.bottom >= offset;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, location.pathname]);
  
  // Initialize Bootstrap collapse
  useEffect(() => {
    $(document).on('click', function(e) {
      if (
        !$(e.target).closest('.navbar-collapse').length &&
        !$(e.target).closest('.navbar-toggler').length &&
        $(navbarCollapseRef.current).hasClass('show')
      ) {
        $(navbarCollapseRef.current).collapse('hide');
        setMenuOpen(false);
      }
    });
    
    return () => {
      $(document).off('click');
    };
  }, []);
  
  // Force update of all nav links whenever isSticky or activeSection changes
  useEffect(() => {
    const updateNavLinks = () => {
      if (isScrollingRef.current) return;
      
      const navLinks = document.querySelectorAll('.custom-nav-link');
      if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (!href) return;
          
          // Skip processing if it's a React Router link (starts with /)
          if (href.startsWith('/')) {
            // For router links, highlight based on current location
            const isCurrentPath = location.pathname === href;
            if (isCurrentPath) {
              link.setAttribute('style', `color: #FCD581 !important; border-bottom: 2px solid #FCD581; padding-bottom: 2px;`);
            } else {
              const textColor = isSticky ? '#535353' : '#ffffff';
              if (isMobile) {
                link.setAttribute('style', 'color: #ffffff !important; border-bottom: none; padding-bottom: 0;');
              } else {
                link.setAttribute('style', `color: ${textColor} !important; border-bottom: none; padding-bottom: 0;`);
              }
            }
            return;
          }
          
          // For anchor links
          const sectionId = href.substring(1);
          if (!sectionId) return;
          
          // Check if this is a dropdown toggle
          const isDropdownToggle = link.classList.contains('dropdown-toggle');
          
          // For About Us dropdown, check if any of its sections are active
          const isAboutDropdownActive = isDropdownToggle && link.id === 'aboutDropdown' && 
            (isActive('about') || isActive('partners') || isActive('team') || isActive('faq'));
            
          // For Solutions dropdown, check if any of its sections are active
          const isSolutionsDropdownActive = isDropdownToggle && link.id === 'solutionsDropdown' && 
            (isActive('price') || isActive('portfolio'));
          
          const isCurrentActive = sectionId === activeSection || isAboutDropdownActive || isSolutionsDropdownActive;
          const isHovered = hoveredItem === sectionId || 
                           (hoveredItem === 'about-dropdown' && isDropdownToggle && link.id === 'aboutDropdown') ||
                           (hoveredItem === 'solutions-dropdown' && isDropdownToggle && link.id === 'solutionsDropdown');
          
          if (sectionId === 'project') {
            return;
          }
          
          // Set styles based on active state or hover state
          if (isCurrentActive || isHovered) {
            link.setAttribute('style', `color: #FCD581 !important; border-bottom: 2px solid #FCD581; padding-bottom: 2px;`);
          } else {
            // Text color should be based on background for better contrast
            const textColor = isSticky ? '#535353' : '#ffffff';
            
            if (isMobile) {
              link.setAttribute('style', 'color: #ffffff !important; border-bottom: none; padding-bottom: 0;');
            } else {
              link.setAttribute('style', `color: ${textColor} !important; border-bottom: none; padding-bottom: 0;`);
            }
          }
        });
      }
      
      // Also update dropdown items styling
      const dropdownItems = document.querySelectorAll('.dropdown-item');
      if (dropdownItems && dropdownItems.length > 0) {
        dropdownItems.forEach(item => {
          const href = item.getAttribute('href');
          if (!href) return;
          
          // Handle router links in dropdowns
          if (href.startsWith('/')) {
            const isCurrentPath = location.pathname === href;
            if (isCurrentPath) {
              item.style.color = '#FCD581 !important';
              item.classList.add('active');
            } else {
              item.style.color = '#ffffff';
              item.classList.remove('active');
            }
            return;
          }
          
          // Handle anchor links in dropdowns
          const sectionId = href.substring(1);
          if (!sectionId) return;
          
          const isCurrentActive = sectionId === activeSection;
          const isItemHovered = hoveredItem === sectionId;
          
          if (isCurrentActive || isItemHovered) {
            item.style.color = '#FCD581 !important';
            if (isCurrentActive) {
              item.classList.add('active');
            }
          } else {
            // Always use white color for dropdown items
            item.style.color = '#ffffff';
            item.classList.remove('active');
          }
        });
      }
    };
    
    updateNavLinks();
    const intervalId = setInterval(updateNavLinks, 250);
    
    return () => clearInterval(intervalId);
  }, [isSticky, activeSection, isMobile, hoveredItem, location]);
  
  // Function to create subtle movement effect when item is focused
  const handleDropdownItemFocus = (itemId) => {
    const item = $(`.dropdown-item[href="#${itemId}"]`);
    if (item.length) {
      item.css({
        'transform': 'translateX(5px)'
      });
      
      setTimeout(() => {
        item.css({
          'transform': 'translateX(0)'
        });
      }, 300);
    }
  };
  
  // Smooth scroll to sections
  const scrollToSection = (elementId, e) => {
    e.preventDefault();
    isScrollingRef.current = true;
    
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setActiveSection(elementId);
        isScrollingRef.current = false;
      }, 600);
      
      if ($(navbarCollapseRef.current).hasClass('show')) {
        $(navbarCollapseRef.current).collapse('hide');
        setMenuOpen(false);
      }
    }
  };
  
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    
    if ($(navbarCollapseRef.current).hasClass('show')) {
      $(navbarCollapseRef.current).collapse('hide');
      setMenuOpen(false);
    }
  };
  
  const isActive = (section) => activeSection === section;
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const getBackgroundColor = () => {
    return isMobile ? '#353535' : (isSticky ? '#ffffff' : '#212325');
  };
  
  // Add className to help with CSS targeting
  const getNavbarClassName = () => {
    return `navbar navbar-expand-lg fixed-top navbar-custom ${isSticky ? 'sticky' : ''}`;
  };
  
  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    
    if ($(navbarCollapseRef.current).hasClass('show')) {
      $(navbarCollapseRef.current).collapse('hide');
      setMenuOpen(false);
    }
  };
  
  const openSignupModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
    
    if ($(navbarCollapseRef.current).hasClass('show')) {
      $(navbarCollapseRef.current).collapse('hide');
      setMenuOpen(false);
    }
  };
  
  const closeAuthModal = () => setIsAuthModalOpen(false);
  
  const handleLogout = () => {
    logout();
    
    if ($(navbarCollapseRef.current).hasClass('show')) {
      $(navbarCollapseRef.current).collapse('hide');
      setMenuOpen(false);
    }
  };
  
  // Handle mouse events for hover effects with enhanced animations
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
    
    // Add subtle ripple effect on hover for dropdown items
    if (item === 'about' || item === 'partners' || item === 'team' || item === 'faq' || 
        item === 'price' || item === 'portfolio' || item === 'contact') {
      handleDropdownItemFocus(item);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const initiateCall = async () => {
    try {
      setIsCallLoading(true);
      setCallStatus(null);
      
      const response = await fetch("/api/initiate-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: "+639912090940" 
        })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server responded with status: ${response.status}`);
      }
      
      setCallStatus({
        type: 'success',
        message: 'Call is being connected.'
      });
    } catch (error) {
      console.error("Error initiating call:", error);
      setCallStatus({
        type: 'danger',
        message: error.message || 'Failed to connect call. Please try again later.'
      });
    } finally {
      setIsCallLoading(false);
    }
  };
  
  return (
    <>
      <nav 
        style={{ 
          backgroundColor: getBackgroundColor(),
          transition: 'background-color 0.3s ease',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000,
          padding: '10px 0',
          boxShadow: isSticky && !isMobile ? '0 2px 10px rgba(0, 0, 0, 0.23)' : 'none'
        }} 
        className={getNavbarClassName()}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img 
              src={isSticky ? "/images/ReverionTechLogo-dark.png" : "/images/ReverionTechLogo-white.png"} 
              className="navbar-image" 
              alt="Logo" 
              style={{ width: "150px", height: "auto" }}
            />
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarCollapse" 
            aria-controls="navbarCollapse" 
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse" ref={navbarCollapseRef}>
            <ul className="navbar-nav mb-0 mb-lg-0 align-items-center">
              <li 
                className={`nav-item ${location.pathname === '/' && isActive('home') ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  className="nav-link custom-nav-link" 
                  to="/"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      scrollToSection('home', e);
                    }
                  }}
                >
                  Home
                </Link>
              </li>
              
              {/* About Us Dropdown */}
              <li 
                className={`nav-item dropdown ${isActive('about') || isActive('partners') || isActive('team') || isActive('faq') ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('about-dropdown')}
                onMouseLeave={handleMouseLeave}
              >
                {/* The main link goes directly to About page */}
                <Link 
                  className="nav-link dropdown-toggle custom-nav-link" 
                  to="/about"
                  id="aboutDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  onClick={(e) => handleLinkClick(e, '/about')}
                >
                  About Us
                </Link>
                <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
                    <Link 
                      className={`dropdown-item ${location.pathname === '/about' ? 'active' : ''}`}
                      to="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li onMouseEnter={() => handleMouseEnter('partners')} onMouseLeave={handleMouseLeave}>
                    <Link 
                      className={`dropdown-item ${location.pathname === '/partners' ? 'active' : ''}`}
                      to="/partners"
                    >
                      Partners
                    </Link>
                  </li>
                  <li onMouseEnter={() => handleMouseEnter('faq')} onMouseLeave={handleMouseLeave}>
                    <Link 
                      className={`dropdown-item ${location.pathname === '/faq' ? 'active' : ''}`}
                      to="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* Solutions Dropdown */}
              <li 
                className={`nav-item dropdown ${isActive('price') || isActive('portfolio') ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter('solutions-dropdown')}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  className="nav-link dropdown-toggle custom-nav-link" 
                  href="#"
                  id="solutionsDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Solutions
                </a>
                <ul className="dropdown-menu" aria-labelledby="solutionsDropdown">
                  <li onMouseEnter={() => handleMouseEnter('price')} onMouseLeave={handleMouseLeave}>
                    <Link 
                      className={`dropdown-item ${location.pathname === '/pricing' ? 'active' : ''}`}
                      to="/pricing"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li onMouseEnter={() => handleMouseEnter('portfolio')} onMouseLeave={handleMouseLeave}>
                    <Link 
                      className={`dropdown-item ${location.pathname === '/portfolio' ? 'active' : ''}`}
                      to="/portfolio"
                    >
                      Portfolio
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li 
                className={`nav-item ${location.pathname === '/contact' ? 'active' : (location.pathname === '/' && isActive('contact') ? 'active' : '')}`}
                onMouseEnter={() => handleMouseEnter('contact')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Use Link for direct navigation to Contact page */}
                <Link 
                  className="nav-link custom-nav-link" 
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className={`${isSticky ? 'sticky' : ''} d-flex align-items-center ms-auto`}>
             <div className={`${isSticky ? 'sticky' : ''} d-flex align-items-center ms-auto`}>
                <button 
                  className={`btn rounded-pill call-us-btn`}
                  style={{
                    backgroundColor: isSticky ? '#faa307' : 'transparent',
                    borderColor: isSticky ? '#faa307' : '#ffffff',
                    color: isSticky ? '#ffffff' : '#ffffff'
                  }}
                  onClick={initiateCall}
                  disabled={isCallLoading}
                >
                  <FaPhone className="me-2" />
                  {isCallLoading ? 'Connecting...' : 'Call Us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

       {/* Call status alert */}
       {callStatus && (
        <div 
          className={`alert alert-${callStatus.type} alert-dismissible fade show call-status-alert`} 
          role="alert"
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1050,
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {callStatus.message}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setCallStatus(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      {!user && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={closeAuthModal} 
          initialMode={authMode} 
        />
      )}
    </>
  );
};

export default Navbar;
