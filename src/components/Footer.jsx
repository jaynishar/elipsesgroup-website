import React from 'react';
import { Settings } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderTop: '1px solid var(--border-color)', 
        padding: '80px 5vw 40px 5vw'
      }}
    >
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '40px', 
          maxWidth: '1400px', 
          margin: '0 auto', 
          marginBottom: '60px' 
        }}
        className="footer-grid"
      >
        
        {/* Core block */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            ELLIPSIS GROUP
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
            A leading integrated workspace design, contracting, and modular furniture manufacturing partner. We synchronize spaces with their architectural shells and natural environments.
          </p>
        </div>

        {/* Links block */}
        <div>
          <h5 className="mono-text" style={{ color: 'var(--text-primary)', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
            REGISTRY DIRECTORY
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Home Page', view: 'home' },
              { label: 'About Us', view: 'about' },
              { label: 'Our Services', view: 'services' },
              { label: 'Featured Portfolio', view: 'work' },
              { label: 'Publications & News', view: 'blogs' },
              { label: 'Contact Registry', view: 'contact' }
            ].map(link => (
              <span
                key={link.view}
                onClick={() => {
                  setView(link.view);
                  window.scrollTo(0, 0);
                }}
                className="interactive"
                style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', transition: 'var(--transition-fast)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                {link.label.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Divisions block */}
        <div>
          <h5 className="mono-text" style={{ color: 'var(--text-primary)', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
            DIVISIONS
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            <span><strong>KEIYAN MEP:</strong> Mechanical, Electrical & Plumbing contracting.</span>
            <span><strong>FRONTIER FURNITURE:</strong> Modular desking, seating, and lockers.</span>
            <span><strong>TOUCH WOOD:</strong> Turnkey interior design & consultancy.</span>
          </div>
        </div>

        {/* Address block */}
        <div>
          <h5 className="mono-text" style={{ color: 'var(--text-primary)', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
            HEAD OFFICE
          </h5>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
            Ellipsis Group Corporate Space,<br />
            DLF Phase 3, Gurugram,<br />
            Haryana, India
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            info@ellipsisgroup.in<br />
            +91 124 456 7890
          </p>
        </div>

      </div>

      {/* Footer copyright */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px', 
          borderTop: '1px solid var(--border-light)', 
          paddingTop: '30px', 
          maxWidth: '1400px', 
          margin: '0 auto' 
        }}
        className="footer-bottom"
      >
        <p className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          &copy; {new Date().getFullYear()} ELLIPSIS GROUP. ALL RIGHTS RESERVED. ARCHITECTURAL PORTFOLIO THEME.
        </p>
        
        <button
          onClick={() => {
            setView('admin');
            window.scrollTo(0, 0);
          }}
          className="interactive btn-secondary"
          style={{
            padding: '6px 12px',
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Settings size={12} />
          ADMIN REGISTRY LOGIN
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </footer>
  );
}
