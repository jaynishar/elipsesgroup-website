import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import AdminCRM from './pages/AdminCRM';

// Fallback seed data
import dbSeed from '../database.json';

export default function App() {
  const [view, setView] = useState('home');
  const [projects, setProjects] = useState(dbSeed.projects || []);
  const [blogs, setBlogs] = useState(dbSeed.blogs || []);
  const [services, setServices] = useState(dbSeed.services || []);
  const [inquiries, setInquiries] = useState(dbSeed.inquiries || []);

  // Custom Cursor states
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  const fetchData = async () => {
    try {
      const [resProj, resBlogs, resServ, resInq] = await Promise.all([
        axios.get(`${apiURL}/api/projects`),
        axios.get(`${apiURL}/api/blogs`),
        axios.get(`${apiURL}/api/services`),
        axios.get(`${apiURL}/api/inquiries`)
      ]);
      setProjects(resProj.data);
      setBlogs(resBlogs.data);
      setServices(resServ.data);
      setInquiries(resInq.data);
    } catch (err) {
      console.warn("Backend API offline. Using fallback database.json seeds.", err.message);
    }
  };

  useEffect(() => {
    fetchData();

    // Mouse listeners for Custom Cursor
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .bento-card, .interactive');
      setCursorHover(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (view) {
      case 'home':
        return <Home projects={projects} blogs={blogs} services={services} setView={handleViewChange} />;
      case 'about':
        return <About setView={handleViewChange} />;
      case 'services':
        return <Services services={services} setView={handleViewChange} />;
      case 'work':
        return <Work projects={projects} />;
      case 'blogs':
        return <Blogs blogs={blogs} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return (
          <AdminCRM 
            projects={projects} 
            blogs={blogs} 
            services={services} 
            inquiries={inquiries} 
            refreshData={fetchData} 
          />
        );
      default:
        return <Home projects={projects} blogs={blogs} services={services} setView={handleViewChange} />;
    }
  };

  return (
    <div className={cursorHover ? 'cursor-hover' : ''} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Custom Cursor */}
      <div className="cursor-dot" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      <div className="cursor-ring" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      
      {/* Visual Enhancers */}
      <div className="noise-overlay" />
      <div className="grid-lines">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      <Navbar currentView={view} setView={handleViewChange} />
      
      <main style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        {renderActivePage()}
      </main>

      <Footer setView={handleViewChange} />
    </div>
  );
}
