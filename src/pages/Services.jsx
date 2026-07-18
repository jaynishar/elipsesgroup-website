import React, { useState } from 'react';
import { HardHat, Wrench, FileText, Check } from 'lucide-react';
import logosImg from '../assets/logos.png';

export default function Services({ services, setView }) {
  const [activeTab, setActiveTab] = useState(services[0]?.id || 'keiyan-mep');

  const selectedService = services.find(s => s.id === activeTab) || services[0];

  const getServiceIcon = (id, size = '100%') => {
    let position = '50% 50%'; // default to Touch Wood
    if (id.includes('mep') || id.includes('keiyan')) {
      position = '0% 50%';
    } else if (id.includes('furniture') || id.includes('frontier')) {
      position = '100% 50%';
    }
    
    return (
      <img 
        src={logosImg} 
        alt={id}
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'cover', 
          objectPosition: position,
          display: 'block',
          borderRadius: '50%'
        }} 
      />
    );
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Page Header */}
      <section style={{ borderBottom: '1px solid #000000', paddingBottom: '40px', marginBottom: '60px' }}>
        <span className="mono-text" style={{ color: '#888888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>SERVICES PORTFOLIO</span>
        <h1 style={{ fontSize: 'calc(2.2rem + 3vw)', marginTop: '20px', fontWeight: '900', color: '#000000' }}>
          WHAT WE DO
        </h1>
        <p style={{ color: '#555555', maxWidth: '600px', fontSize: '15px', lineHeight: '1.6', marginTop: '20px' }}>
          We provide fully integrated corporate construction, mechanical engineering, and modular furniture systems under one roof.
        </p>
      </section>

      {/* Tabs Menu */}
      <section style={{ display: 'flex', gap: '2px', backgroundColor: '#000000', padding: '1px', marginBottom: '60px', alignSelf: 'flex-start', maxWidth: 'fit-content' }}>
        {services.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className="interactive"
            style={{
              padding: '12px 24px',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === s.id ? '#ffffff' : '#000000',
              color: activeTab === s.id ? '#000000' : '#ffffff',
              transition: 'var(--transition-fast)'
            }}
          >
            {s.brand}
          </button>
        ))}
      </section>

      {/* Detailed Service Content */}
      {selectedService && (
        <section className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }} className="services-grid">
          
          {/* Main Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '44px', height: '44px', overflow: 'hidden' }}>
                {getServiceIcon(selectedService.id)}
              </div>
              <div>
                <span className="mono-text" style={{ fontSize: '11px', color: '#888888' }}>{selectedService.brand} // SERVICE ID: {selectedService.id.toUpperCase()}</span>
                <h3 style={{ fontSize: '28px', fontWeight: '900', marginTop: '2px' }}>{selectedService.title}</h3>
              </div>
            </div>

            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#333333' }}>
              {selectedService.description}
            </p>

            <button 
              onClick={() => {
                setView('contact');
                window.scrollTo(0,0);
              }} 
              className="interactive btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              Request Service Proposal
            </button>
          </div>

          {/* Features Checklist */}
          <div style={{ border: '1px solid #000000', padding: '40px', backgroundColor: '#fafafa' }}>
            <h4 className="mono-text" style={{ fontSize: '12px', fontWeight: '700', borderBottom: '1px solid #000000', paddingBottom: '10px', marginBottom: '24px' }}>
              KEY SERVICE FEATURES & DELIVERABLES
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {selectedService.features && selectedService.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '18px', height: '18px', border: '1px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <Check size={10} />
                  </div>
                  <span style={{ fontSize: '14px', lineHeight: '1.5', color: '#111111', fontWeight: '500' }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>

    </div>
  );
}
