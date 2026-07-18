import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'General Inquiry'
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const types = ['General Inquiry', 'Business Collaborate', 'Careers & Jobs'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      await axios.post(`${apiURL}/api/inquiries`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'General Inquiry' });
    } catch (err) {
      console.error("Submission failed", err);
      setError('Form submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Page Header */}
      <section style={{ borderBottom: '1px solid #000000', paddingBottom: '40px', marginBottom: '60px' }}>
        <span className="mono-text" style={{ color: '#888888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>REGISTRY OFFICE</span>
        <h1 style={{ fontSize: 'calc(2.2rem + 3vw)', marginTop: '20px', fontWeight: '900' }}>
          CONTACT & CONNECT
        </h1>
      </section>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px' }} className="contact-layout-grid">
        
        {/* Contact Info and Stylized Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#000000', fontWeight: '500', marginBottom: '20px' }}>
              Let's deploy high-performing spaces together. Get in touch with our engineering and design teams to schedule a workspace audit or request catalogs.
            </p>
          </div>

          {/* Details list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid #eaeaea', paddingBottom: '15px' }}>
              <span className="mono-text" style={{ color: '#888888', fontWeight: '700' }}>CALL US</span>
              <span style={{ fontSize: '15px', fontWeight: '800' }}>+91 124 456 7890</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid #eaeaea', paddingBottom: '15px' }}>
              <span className="mono-text" style={{ color: '#888888', fontWeight: '700' }}>EMAIL US</span>
              <span style={{ fontSize: '15px', fontWeight: '800' }}>info@ellipsisgroup.in</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid #eaeaea', paddingBottom: '15px' }}>
              <span className="mono-text" style={{ color: '#888888', fontWeight: '700' }}>ADDRESS</span>
              <span style={{ fontSize: '14px', fontWeight: '800', lineHeight: '1.4' }}>DLF Phase 3, Gurugram, Haryana, India</span>
            </div>
          </div>

          {/* Stylized vector map blueprint (architecture studio vibe) */}
          <div style={{ border: '1px solid #000000', height: '240px', backgroundColor: '#fafafa', position: 'relative', overflow: 'hidden' }}>
            {/* Draw a grid matching layout maps */}
            <svg width="100%" height="100%" style={{ opacity: 0.15 }}>
              <line x1="0" y1="50" x2="400" y2="50" stroke="#000" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#000" strokeWidth="1" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#000" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#000" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="300" stroke="#000" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#000" strokeWidth="1" />
              <line x1="300" y1="0" x2="300" y2="300" stroke="#000" strokeWidth="1" />
              
              {/* Abstract roads/rivers representing maps */}
              <path d="M-50,80 L180,80 L280,260 L450,260" fill="none" stroke="#000000" strokeWidth="6" />
              <path d="M120,-20 L120,180 L80,320" fill="none" stroke="#000000" strokeWidth="4" />
              <circle cx="180" cy="80" r="12" fill="none" stroke="#000" strokeWidth="2" />
              <circle cx="180" cy="80" r="4" fill="#000" />
            </svg>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', backgroundColor: '#ffffff', border: '1px solid #000000', padding: '6px 12px' }}>
              <span className="mono-text" style={{ fontSize: '9px', fontWeight: '700' }}>HQ COORDINATES // GURUGRAM OFFICE</span>
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div style={{ border: '1px solid #000000', padding: '40px', backgroundColor: '#ffffff' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', border: '2px solid #000', borderRadius: '50%', marginBottom: '20px' }}>
                <Check size={24} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '950', marginBottom: '12px' }}>SUBMISSION SUCCESSFUL</h2>
              <p style={{ color: '#555555', fontSize: '13px', lineHeight: '1.6', marginBottom: '30px' }}>
                Thank you. Your request was filed successfully in our database. Our project registry manager will contact you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="interactive btn-secondary">
                SEND ANOTHER FILE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Type Select */}
              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '10px' }}>
                  Inquiry Registry
                </label>
                <div style={{ display: 'flex', gap: '2px', backgroundColor: '#000000', padding: '1px' }}>
                  {types.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTypeSelect(t)}
                      className="interactive mono-text"
                      style={{
                        padding: '6px 12px',
                        fontSize: '9px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: formData.type === t ? '#ffffff' : '#000000',
                        color: formData.type === t ? '#000000' : '#ffffff',
                        transition: 'var(--transition-fast)',
                        flexGrow: 1
                      }}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Corporate Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Subject */}
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-input"
                  style={{ resize: 'none' }}
                ></textarea>
              </div>

              {error && <span style={{ color: '#ff0000', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{error}</span>}

              <button type="submit" disabled={loading} className="interactive btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'TRANSMITTING...' : 'TRANSMIT FILE ENTRY'}
              </button>

            </form>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>

    </div>
  );
}
