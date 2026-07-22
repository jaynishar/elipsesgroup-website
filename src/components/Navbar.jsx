import React, { useState } from 'react';
import { Menu, X, Settings, ArrowRight } from 'lucide-react';

export default function Navbar({ currentView, setView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home Page', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Our Services', view: 'services' },
    { label: 'Featured Work', view: 'work' },
    { label: 'Insights & Blogs', view: 'blogs' },
    { label: 'Contact Us', view: 'contact' }
  ];

  return (
    <>
      {/* Global Navigation Header Bar (Stark Minimalist) */}
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 5vw',
          zIndex: 1000
        }}
      >
        {/* Geometric Line-Art Logo (big.dk style) */}
        <div 
          onClick={() => {
            setView('home');
            setMenuOpen(false);
          }}
          className="interactive"
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: 'var(--accent-color)'
          }}
        >
          {/* Custom SVG Drawing "ELLIPSIS" in block geometric lines */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 240 50" 
            style={{ 
              width: '140px', 
              height: '28px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <path 
              d="M 20,10 L 0,10 L 0,40 L 20,40 M 0,25 L 18,25 M 30,10 L 30,40 L 50,40 M 60,10 L 60,40 L 80,40 M 100,10 L 100,40 M 120,40 L 120,10 L 140,10 L 140,25 L 120,25 M 170,12 L 150,12 L 150,23 L 170,23 L 170,38 L 150,38 M 190,10 L 190,40 M 230,12 L 210,12 L 210,23 L 230,23 L 230,38 L 210,38" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              fill="none" 
            />
          </svg>
          
          <span 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '10px', 
              fontWeight: '700',
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              borderLeft: '1px solid var(--border-color)', 
              paddingLeft: '10px',
              display: 'inline-block',
              marginTop: '4px'
            }}
          >
            Group
          </span>
        </div>

        {/* Desktop Quick Nav & Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Simple Navigation links on desktop */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {navItems.map(item => (
              <span
                key={item.view}
                onClick={() => setView(item.view)}
                className="interactive"
                style={{
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: currentView === item.view ? 'var(--accent-color)' : 'var(--text-muted)',
                  borderBottom: currentView === item.view ? '2px solid var(--accent-color)' : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== item.view) e.target.style.color = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  if (currentView !== item.view) e.target.style.color = 'var(--text-muted)';
                }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Portal button */}
          <button
            onClick={() => setView('admin')}
            className="interactive btn-secondary portal-crm-btn"
            style={{
              padding: '6px 14px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Settings size={12} />
            PORTAL CRM
          </button>

          {/* Global Sidebar Drawer Toggle */}
          <div 
            onClick={() => setMenuOpen(!menuOpen)}
            className="interactive"
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: '1px solid var(--border-color)'
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </div>
      </header>

      {/* Global Sidebar Drawer Menu (Slide-out from Left, exactly like big.dk navigation drawer) */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: 'min(320px, 85vw)',
          backgroundColor: 'var(--bg-primary)',
          borderRight: '1px solid var(--border-color)',
          padding: '120px 40px 40px 40px',
          zIndex: 999,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Navigation</span>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {navItems.map(item => (
              <span
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setMenuOpen(false);
                }}
                className="interactive"
                style={{
                  cursor: 'pointer',
                  fontSize: '24px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: currentView === item.view ? 'var(--accent-color)' : 'var(--text-muted)',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                onMouseLeave={(e) => {
                  if (currentView !== item.view) e.target.style.color = 'var(--text-muted)';
                }}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </div>

        {/* Drawer footer details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            onClick={() => {
              setView('admin');
              setMenuOpen(false);
            }}
            className="interactive btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            CRM PORTAL
            <ArrowRight size={14} />
          </button>
          
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Ellipsis Group.<br />
            DLF Gurugram, India.
          </p>
        </div>
      </div>

      {/* Screen blocker overlay when drawer is open */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(3px)',
            zIndex: 998
          }}
        />
      )}

      {/* Spacing element to prevent navbar from covering content */}
      <div style={{ height: '80px' }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
