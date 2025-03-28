import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Import pages
import Home from './pages/Home';

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Team from './components/sections/Team';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/" element={<Services />} />
        <Route path="/" element={<Team />} />
        <Route path="/" element={<Pricing />} />
        <Route path="/" element={<Contact />} />
      </Routes>
      <Footer />
      <a href="#" className="back-to-top" id="back-to-top">
        <i className="mdi mdi-chevron-up"></i>
      </a>
    </>
  );
}

export default App;