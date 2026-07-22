import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { X, MessageSquare, Phone, Mail, Check, Gift, ArrowRight } from 'lucide-react';

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

  // GTM, Exit Intent, FAB & Cookie Consent states
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentSubmitted, setExitIntentSubmitted] = useState(false);
  const [exitIntentForm, setExitIntentForm] = useState({ name: '', email: '', phone: '' });
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(false);
  const [fabVisible, setFabVisible] = useState(false);
  const reportedDepths = useRef(new Set());

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

  // 1. GTM Pageview tracking on view change
  useEffect(() => {
    const pageName = view.charAt(0).toUpperCase() + view.slice(1);
    console.log(`[Google Analytics Tracker] PAGEVIEW: /${view}`, { pageTitle: pageName });
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        pagePath: `/${view}`,
        pageTitle: pageName
      });
    }
  }, [view]);

  // 2. Main lifecycle listener (Scroll, MouseMove, MouseLeave, Cookie Consent)
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

    // Scroll listeners (Progress, FAB show, GTM scroll depth)
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Update Scroll Progress bar
      if (height > 0) {
        const pct = (winScroll / height) * 100;
        setScrollPercent(pct);

        // GTM Scroll Depth trigger (25%, 50%, 75%, 90%)
        [25, 50, 75, 90].forEach(depth => {
          if (pct >= depth && !reportedDepths.current.has(depth)) {
            reportedDepths.current.add(depth);
            console.log(`[GTM Scroll Depth Tracker] Threshold reached: ${depth}%`);
            if (window.dataLayer) {
              window.dataLayer.push({ event: 'scroll_depth', depth_threshold: depth });
            }
          }
        });
      }

      // Show/Hide Floating Contact FAB
      if (winScroll > 300) {
        setFabVisible(true);
      } else {
        setFabVisible(false);
        setFabExpanded(false);
      }
    };

    // Mouseleave Exit Intent detector (desktop only)
    const handleMouseLeave = (e) => {
      if (e.clientY < 20) {
        const hasShown = sessionStorage.getItem('ce-exit-intent-shown');
        if (!hasShown) {
          setShowExitIntent(true);
          sessionStorage.setItem('ce-exit-intent-shown', 'true');
          if (window.dataLayer) {
            window.dataLayer.push({ event: 'exit_intent_popup_view' });
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const isDesktop = window.matchMedia('(hover: hover)').matches;
    if (isDesktop) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Check cookie consent
    const consent = localStorage.getItem('ce-cookie-consent');
    let cookieTimer;
    if (!consent) {
      cookieTimer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1500);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (isDesktop) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (cookieTimer) clearTimeout(cookieTimer);
    };
  }, []);

  const handleExitIntentSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      await axios.post(`${apiURL}/api/inquiries`, {
        name: exitIntentForm.name,
        email: exitIntentForm.email,
        subject: 'Exit-Intent Free Consultation Sourcing Request',
        message: `Phone: ${exitIntentForm.phone}. User requested a free office-space consultation.`,
        type: 'General Inquiry'
      });
      
      // GTM & Google Analytics Conversion Tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'generate_lead',
          form_type: 'Exit Intent Popup Form',
          lead_source: 'website_exit_intent',
          value: 5000,
          currency: 'INR'
        });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          currency: 'INR',
          value: 5000,
          form_type: 'Exit Intent Popup Form',
          lead_source: 'website_exit_intent'
        });
      }

      setExitIntentSubmitted(true);
      setTimeout(() => {
        setShowExitIntent(false);
        setExitIntentSubmitted(false);
        setExitIntentForm({ name: '', email: '', phone: '' });
      }, 2500);
    } catch (err) {
      console.error("Exit-intent submission failed", err);
    }
  };

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
      {/* Scroll Progress Bar */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          height: '4px', 
          width: `${scrollPercent}%`, 
          background: 'linear-gradient(90deg, var(--accent-bronze), #ffffff)', 
          zIndex: 99999, 
          transition: 'width 0.05s ease-out' 
        }} 
      />

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

      {/* ============================================================================
         GLOBAL WIDGETS: WHATSAPP/EMAIL/PHONE EXPANDABLE FAB (replicated from past site)
         ============================================================================ */}
      {fabVisible && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '30px', 
            right: '30px', 
            zIndex: 9999, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '15px' 
          }}
        >
          {/* Expanded Menu Options */}
          {fabExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              {/* WhatsApp Option */}
              <a 
                href="https://wa.me/919833089993?text=Hi%20Ellipsis%20Group%2C%20I%20am%20interested%20in%20a%20workspace%20consultation.%20Please%20get%20in%20touch." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.dataLayer) window.dataLayer.push({ event: 'whatsapp_click', location: 'floating_fab' });
                  setFabExpanded(false);
                }}
                title="Chat on WhatsApp"
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  backgroundColor: '#25D366', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MessageSquare size={20} />
              </a>

              {/* Call Option */}
              <a 
                href="tel:+919833089993"
                onClick={() => {
                  if (window.dataLayer) window.dataLayer.push({ event: 'phone_click', location: 'floating_fab' });
                  setFabExpanded(false);
                }}
                title="Call Us Directly"
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--accent-bronze)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Phone size={18} />
              </a>

              {/* Email Option */}
              <a 
                href="mailto:info@ellipsisgroup.in"
                onClick={() => {
                  if (window.dataLayer) window.dataLayer.push({ event: 'email_click', location: 'floating_fab' });
                  setFabExpanded(false);
                }}
                title="Email Us"
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  backgroundColor: '#ffffff', 
                  color: '#333333', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Mail size={18} />
              </a>
            </div>
          )}

          {/* Main Toggle FAB button */}
          <button 
            onClick={() => setFabExpanded(!fabExpanded)}
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--text-primary)', 
              color: 'var(--bg-primary)', 
              border: '2px solid var(--border-color)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {fabExpanded ? <X size={24} /> : <MessageSquare size={24} />}
          </button>
        </div>
      )}

      {/* ============================================================================
         COOKIE CONSENT DISCLOSURE BANNER
         ============================================================================ */}
      {showCookieBanner && (
        <div 
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '2px solid var(--border-color)',
            padding: '24px 5vw',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 -8px 30px rgba(0,0,0,0.3)'
          }}
          className="cookie-banner-layout"
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              We use cookies to measure GTM scroll depth metrics and analyze interest profiles to enhance your design experience. By clicking "Accept All", you agree to our structural tracking registry.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                localStorage.setItem('ce-cookie-consent', 'declined');
                setShowCookieBanner(false);
              }}
              className="interactive"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              DECLINE
            </button>
            <button 
              onClick={() => {
                localStorage.setItem('ce-cookie-consent', 'accepted');
                setShowCookieBanner(false);
              }}
              className="interactive btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)'
              }}
            >
              ACCEPT ALL
            </button>
          </div>
        </div>
      )}

      {/* ============================================================================
         EXIT-INTENT PREVENTIVE PROPOSAL OVERLAY MODAL
         ============================================================================ */}
      {showExitIntent && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              padding: '40px',
              maxWidth: '480px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            {/* Close */}
            <button 
              onClick={() => setShowExitIntent(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <X size={20} />
            </button>

            {exitIntentSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', border: '2px solid var(--border-color)', borderRadius: '50%', marginBottom: '20px', color: 'var(--accent-bronze)' }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '10px' }}>CONSULTATION REQUESTED</h3>
                <p className="mono-text" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>We have logged your record. Our design consultants will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleExitIntentSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Gift size={20} style={{ color: 'var(--accent-bronze)' }} />
                  <span className="mono-text" style={{ fontSize: '10px', color: 'var(--accent-bronze)', fontWeight: '700' }}>EXCLUSIVE OFFER</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '12px', lineHeight: '1.1' }}>
                  FREE WORKSPACE ZONING AUDIT
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Leave your contact details before you leave. We will compile a custom layout zoning and MEP feasibility draft for your team free of cost.
                </p>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    value={exitIntentForm.name} 
                    onChange={(e) => setExitIntentForm({ ...exitIntentForm, name: e.target.value })} 
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Corporate Email</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    value={exitIntentForm.email} 
                    onChange={(e) => setExitIntentForm({ ...exitIntentForm, email: e.target.value })} 
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="form-input" 
                    placeholder="+91 XXXXX XXXXX"
                    value={exitIntentForm.phone} 
                    onChange={(e) => setExitIntentForm({ ...exitIntentForm, phone: e.target.value })} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="interactive btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Claim Free Consultation
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
