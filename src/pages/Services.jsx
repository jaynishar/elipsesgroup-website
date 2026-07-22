import React, { useState } from 'react';
import { HardHat, Wrench, FileText, Check } from 'lucide-react';
import logosImg from '../assets/logos.png';
import mepCeilingImg from '../assets/mep_ceiling.jpg';
import modularFurnitureImg from '../assets/modular_furniture.jpg';
import touchWoodMaterialsImg from '../assets/touch_wood_materials.jpg';

export default function Services({ services, setView }) {
  const [activeTab, setActiveTab] = useState(services[0]?.id || 'keiyan-mep');

  const selectedService = services.find(s => s.id === activeTab) || services[0];

  const brandSubCategories = {
    'keiyan-mep': [
      {
        title: 'Mechanical HVAC Grids',
        desc: 'Precision VRV (Variable Refrigerant Volume) and VAV (Variable Air Volume) air flow systems design and execution. Our installations prioritize employee thermal comfort, sound attenuation, and strict health standards.',
        image: mepCeilingImg
      },
      {
        title: 'Electrical Systems & Connectivity',
        desc: 'Design and routing of high-tension power distribution boards, backup diesel generators, unified UPS systems, server room structural wiring, intelligent LED grids, and automatic daylight sensors.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Public Health & Plumbing',
        desc: 'Advanced architectural drainage, water filtration networks, rainwater harvesting systems, and commercial public toilet plumbing installations complying with national hydraulic building codes.',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Fire Suppression Infrastructure',
        desc: 'Complete turnkey life safety systems including photoelectric smoke detection, alarms, wet/dry pipe sprinkler systems, and gas suppression networks for high-risk server rooms.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'
      }
    ],
    'frontier-furniture': [
      {
        title: 'Modular Furniture & Workstations',
        desc: 'Maximize productivity with our adaptable modular furniture systems. Designed to seamlessly transition from focused individual spaces to collaborative hubs, providing clutter-free organization and effortless scalability.',
        image: modularFurnitureImg
      },
      {
        title: 'Linear Desking Systems',
        desc: 'Maximize productivity with our adaptable modular desking systems. Crafted from premium materials, these ergonomic workstations support built-in dual monitors, clean under-desk trays, and integrated electrical wiring.',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Acoustic Screens & Partitions',
        desc: 'Desk acoustic dividers, modular screen systems that absorb sound and optimize personal workstation privacy while maintaining a clean, open office aesthetic.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Meeting Tables',
        desc: 'Foster seamless versatile modular meeting tables. Designed to adapt to any room layout or team size, these durable surfaces provide the ideal setting for brainstorming and decision-making. Experience the perfect blend of integrated technology, smart cable management, and sleek, modern aesthetics.',
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Electronic Storage & Lockers',
        desc: 'Laminated electronic lockers and high-security modular storage configurations built with heavy-duty locks. Includes credential scanners or keypad access.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Storage & Credenzas',
        desc: 'Premium credenzas, mobile pedestals, storage cabinets, and open shelving systems engineered to support high-density archiving and space division.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Biophilic Zoning Planters',
        desc: 'Linear steel grid dividers and planter boxes that allow for natural biophilic zoning. Add vertical greenery to workspace pathways and improve air quality.',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400'
      }
    ],
    'touch-wood': [
      {
        title: 'Workplace DNA Audits',
        desc: 'We begin by understanding the "DNA" of your organization. Through workplace audits and stakeholder interviews, we identify space utilization patterns, collaboration needs, and hybrid work behaviors.',
        image: touchWoodMaterialsImg
      },
      {
        title: 'Zoning & Conceptual Pathways',
        desc: 'Creating cohesive design narratives that balance form and function. We map out department zoning, customer pathway routing, breakout spaces, and lighting moods.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Material Board Specification',
        desc: 'Detailed flatlay specifications including American Oak, textured concrete panels, acoustic panels, and brushed gold trim samples to align with the branding requirements.',
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Technical Roadmaps & ADA Compliance',
        desc: 'Exacting specifications for FF&E (Furniture, Fixtures & Equipment), fire-retardant fabric compliance, local municipal building codes, and universal design access.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400'
      }
    ]
  };

  const handleImageError = (e, fallbackType = 'furniture') => {
    e.target.onerror = null; // Prevent infinite loop fallback
    if (fallbackType === 'mep') {
      e.target.src = mepCeilingImg;
    } else if (fallbackType === 'design') {
      e.target.src = touchWoodMaterialsImg;
    } else {
      e.target.src = modularFurnitureImg;
    }
  };

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
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Page Header */}
      <section style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '40px', marginBottom: '60px' }}>
        <span className="mono-text" style={{ color: 'var(--accent-bronze)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>SERVICES PORTFOLIO</span>
        <h1 style={{ fontSize: 'calc(2.2rem + 3vw)', marginTop: '20px', fontWeight: '900', color: 'var(--text-primary)' }}>
          WHAT WE DO
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '15px', lineHeight: '1.6', marginTop: '20px' }}>
          We provide fully integrated corporate construction, mechanical engineering, and modular furniture systems under one roof.
        </p>
      </section>

      {/* Tabs Menu */}
      <section className="brand-filter-scroll-wrapper" style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--border-light)', padding: '1px', marginBottom: '60px', alignSelf: 'flex-start', maxWidth: '100%' }}>
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
              backgroundColor: activeTab === s.id ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: activeTab === s.id ? 'var(--bg-primary)' : 'var(--text-primary)',
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
                <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedService.brand} // SERVICE ID: {selectedService.id.toUpperCase()}</span>
                <h3 style={{ fontSize: '28px', fontWeight: '900', marginTop: '2px' }}>{selectedService.title}</h3>
              </div>
            </div>

            <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
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
          <div style={{ border: '1px solid var(--border-light)', padding: '40px', backgroundColor: 'var(--bg-secondary)' }}>
            <h4 className="mono-text" style={{ fontSize: '12px', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px', marginBottom: '24px', color: 'var(--accent-bronze)' }}>
              KEY SERVICE FEATURES & DELIVERABLES
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {selectedService.features && selectedService.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '18px', height: '18px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', flexShrink: 0 }}>
                    <Check size={10} />
                  </div>
                  <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)', fontWeight: '500' }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* Subcategories Catalog Showcase */}
      {selectedService && brandSubCategories[selectedService.id] && (
        <section style={{ marginTop: '80px', borderTop: '1px solid var(--border-light)', paddingTop: '60px' }}>
          <span className="mono-text" style={{ color: 'var(--accent-bronze)', display: 'block', marginBottom: '24px', letterSpacing: '0.12em', fontWeight: '700' }}>
            {selectedService.brand} // REGISTRY SUB-CATEGORIES & TECHNICAL DELIVERABLES
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }} className="subcategories-grid">
            {brandSubCategories[selectedService.id].map((sub, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
                  <img 
                    src={sub.image} 
                    alt={sub.title} 
                    onError={(e) => handleImageError(e, selectedService.id === 'keiyan-mep' ? 'mep' : selectedService.id === 'touch-wood' ? 'design' : 'furniture')}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'} 
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} 
                  />
                </div>
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '900', color: 'var(--text-primary)' }}>{sub.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{sub.desc}</p>
                </div>
              </div>
            ))}
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
