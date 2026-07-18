import React, { useState } from 'react';
import { Filter, MapPin, Calendar, Briefcase, ArrowRight, X, Check } from 'lucide-react';
import logosImg from '../assets/logos.png';

export default function Work({ projects }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  // Quick inquiry for case study
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const filters = ['ALL', 'KEIYAN MEP', 'FRONTIER FURNITURE', 'TOUCH WOOD'];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.brand.toUpperCase() === activeFilter.toUpperCase());

  // Render individual brand logo from logos.png spritesheet
  const renderProjectIcon = (brand, size = '100%') => {
    const brandUpper = brand.toUpperCase();
    let position = '50% 50%'; // default to Touch Wood
    if (brandUpper.includes('KEIYAN') || brandUpper.includes('MEP')) {
      position = '0% 50%';
    } else if (brandUpper.includes('FRONTIER') || brandUpper.includes('FURNITURE')) {
      position = '100% 50%';
    }
    
    return (
      <img 
        src={logosImg} 
        alt={brand}
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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      await fetch(`${apiURL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Work Inquiry - Project: ${selectedProject?.title}`,
          message: form.message,
          type: 'Project Inquiry'
        })
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setInquiryOpen(false);
        setForm({ name: '', email: '', message: '' });
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Page Header */}
      <section style={{ borderBottom: '1px solid #000000', paddingBottom: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="mono-text" style={{ color: '#888888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>REGISTRY OF WORKS</span>
            <h1 style={{ fontSize: 'calc(2.2rem + 3vw)', marginTop: '20px', fontWeight: '900' }}>
              OUR PORTFOLIO
            </h1>
          </div>

          {/* Filters (Stark block buttons) */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: '#000000', padding: '1px' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="interactive"
                style={{
                  padding: '10px 18px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeFilter === filter ? '#ffffff' : '#000000',
                  color: activeFilter === filter ? '#000000' : '#ffffff',
                  transition: 'var(--transition-fast)'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid (Stark geometric layout) */}
      <section>
        {filteredProjects.length === 0 ? (
          <div style={{ padding: '100px 0', textAlign: 'center', border: '1px dashed #000000' }}>
            <p className="mono-text" style={{ fontSize: '13px', fontWeight: '700' }}>NO PROJECTS RECORDED IN THIS CATEGORY.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px' }} className="project-grid">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="interactive"
                style={{ 
                  cursor: 'pointer',
                  border: '1px solid #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Image container */}
                <div style={{ height: '280px', overflow: 'hidden', borderBottom: '1px solid #000000', position: 'relative' }} className="card-img-box">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ffffff', border: '1px solid #000000', padding: '4px 10px' }}>
                    <span className="mono-text" style={{ fontSize: '9px', fontWeight: '700' }}>{project.brand}</span>
                  </div>
                </div>

                {/* Text Description */}
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '22px', height: '22px', overflow: 'hidden' }}>
                        {renderProjectIcon(project.brand)}
                      </div>
                      <span className="mono-text" style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase' }}>
                        {project.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#000000' }}>
                      {project.title}
                    </h3>
                  </div>

                  <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono-text" style={{ fontSize: '11px', color: '#555555' }}>
                      {project.location}
                    </span>
                    <span className="mono-text" style={{ fontSize: '11px', fontWeight: '700' }}>
                      [ READ FILE ]
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Case Study Details Overlay */}
      {selectedProject && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            zIndex: 2000,
            overflowY: 'auto',
            padding: '100px 5vw'
          }}
        >
          {/* Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #000000', paddingBottom: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '28px', height: '28px', overflow: 'hidden' }}>
                {renderProjectIcon(selectedProject.brand)}
              </div>
              <span className="mono-text" style={{ fontWeight: '700' }}>{selectedProject.brand} // {selectedProject.category.toUpperCase()}</span>
            </div>

            <button 
              onClick={() => setSelectedProject(null)}
              className="interactive"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #000000',
                padding: '10px 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              [ CLOSE CASE STUDY ]
            </button>
          </div>

          {/* Grid Layout of details */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '60px' }} className="detail-layout-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ border: '1px solid #000000', overflow: 'hidden' }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  style={{ width: '100%', objectFit: 'cover', display: 'block', maxHeight: '550px' }}
                />
              </div>

              {/* Extra dummy photos (simulated gallery representing detailed drawings) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ border: '1px solid #000000', height: '220px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400" alt="Technical blueprint sketch" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                </div>
                <div style={{ border: '1px solid #000000', height: '220px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400" alt="Completed installation layout details" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <span className="mono-text" style={{ color: '#888888', fontSize: '11px', textTransform: 'uppercase' }}>CASE STUDY // CLIENT FILE</span>
                <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#000000', marginTop: '10px' }}>
                  {selectedProject.title}
                </h1>
              </div>

              <p style={{ fontSize: '15px', color: '#333333', lineHeight: '1.7' }}>
                {selectedProject.description}
              </p>

              {/* Technical Spec sheet */}
              <div style={{ border: '1px solid #000000', padding: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', borderBottom: '1px solid #000000', paddingBottom: '10px', marginBottom: '16px' }}>
                  PROJECT SPECIFICATIONS
                </h4>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: '#888888' }}>CLIENT:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.client}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: '#888888' }}>LOCATION:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.location}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: '#888888' }}>YEAR:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.year}</td>
                    </tr>
                    <tr>
                      <td className="mono-text" style={{ padding: '8px 0', color: '#888888' }}>CONTRACT:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>DESIGN-BUILD INTEGRATION</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lead captures */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="interactive btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Project Specifications Consult
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .detail-layout-grid {
                grid-template-columns: 1fr !important;
                gap: 30px !important;
              }
            }
            .interactive:hover .card-img-box img {
              filter: grayscale(0%) !important;
              transform: scale(1.03);
            }
          `}</style>
        </div>
      )}

      {/* Inquiry form modal */}
      {inquiryOpen && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setInquiryOpen(false)}
              className="interactive"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', border: '2px solid #000', borderRadius: '50%', marginBottom: '20px' }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>REQUEST FILED</h3>
                <p className="mono-text" style={{ fontSize: '12px', color: '#888888' }}>Our logistics and project estimation desks will follow up.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <span className="mono-text" style={{ fontSize: '10px', color: '#888888' }}>PROJECT: {selectedProject?.title.toUpperCase()}</span>
                <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '10px', marginBottom: '24px', borderBottom: '1px solid #000', paddingBottom: '12px' }}>
                  FILE REQUEST
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Message</label>
                  <textarea 
                    rows="3" 
                    required 
                    className="form-input" 
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    placeholder="We require modular configurations or architectural specs..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="interactive btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  Submit Inquiry File
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
