import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Calendar, Briefcase, Eye, Shield, HardHat, Info, Check } from 'lucide-react';
import logosImg from '../assets/logos.png';
import mepCeilingImg from '../assets/mep_ceiling.jpg';
import modularFurnitureImg from '../assets/modular_furniture.jpg';
import touchWoodMaterialsImg from '../assets/touch_wood_materials.jpg';

export default function Home({ projects, blogs, services, setView }) {
  const [activeBrand, setActiveBrand] = useState('ALL'); // ALL | KEIYAN MEP | FRONTIER FURNITURE | TOUCH WOOD
  const [activeSub, setActiveSub] = useState('ALL'); // ALL | MODULAR FURNITURE | DESKING | LOCKERS | SCREEN & PARTITION | STORAGE | MEETING TABLES | GRILLS & PLANTER BOX
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Lead quick modal contact form
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', message: '', brand: 'General' });

  // References for scroll animations
  const projectListRef = useRef(null);

  const brandSubCategories = {
    'KEIYAN MEP': [
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
    'FRONTIER FURNITURE': [
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
    'TOUCH WOOD': [
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

  // Simulated Google Analytics Page View Tracking
  const trackAnalytics = (pageName, eventData = {}) => {
    console.log(`[Google Analytics Tracker] PAGEVIEW: /${pageName.toLowerCase().replace(/\s+/g, '-')}`, eventData);
    // Hook up window dataLayer if exists
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        pagePath: `/${pageName.toLowerCase().replace(/\s+/g, '-')}`,
        pageTitle: pageName,
        ...eventData
      });
    }
  };

  useEffect(() => {
    trackAnalytics('Home', { filter: activeBrand, subFilter: activeSub });
  }, [activeBrand, activeSub]);

  // Brand data mapping from Ellipsis_Group_Website_Structure.docx
  const brandDetails = {
    'KEIYAN MEP': {
      title: 'KEIYAN MEP',
      subtitle: 'MECHANICAL ELECTRICAL PLUMBING',
      intro: 'In the world of commercial real estate, the skeletal structure and aesthetic finishes often get the most attention. However, the true heartbeat of any high-performing office, retail center, or hospitality space lies within its MEP (Mechanical, Electrical, and Plumbing) systems. MEP engineering is the invisible science that transforms a hollow shell into a living, breathing environment. It dictates how comfortable a space feels, how safely it operates, and how much it costs to run.',
      points: [
        { label: 'MISSION', title: 'Mechanical: Climate & Air Quality', desc: 'Commercial HVAC (Heating, Ventilation, and Air Conditioning) systems are far more complex than residential units. They must manage high occupancy loads, varying zone requirements, and strict indoor air quality (IAQ) standards. Precision Control: Using VRF (Variable Refrigerant Flow) and VAV (Variable Air Volume) systems to ensure one conference room isn’t freezing while the next is overheating. Health & Wellness: Advanced filtration and ventilation to reduce CO2 levels and airborne pathogens.' },
        { label: 'VISION', title: 'Electrical: Digital Nervous System', desc: 'A modern commercial space is a high-demand environment. Electrical engineering ensures that the "digital nervous system" of the building is robust and redundant. Lighting Design: Integrating smart LED systems and daylight harvesting to reduce energy consumption while improving mood and focus. Data & Connectivity: Designing the infrastructure for high-speed data, server rooms, and seamless Wi-Fi coverage.' },
        { label: 'VALUES', title: 'Plumbing & Fire Protection', desc: 'High-performance public health engineering including advanced fluid dynamics, water treatment, greywater recycling, and automatic sprinkler systems integrated with intelligent fire alarms for emergency security.' }
      ]
    },
    'FRONTIER FURNITURE': {
      title: 'FRONTIER FURNITURE',
      subtitle: 'BUILD & MODULAR FURNITURE SOLUTIONS',
      intro: 'In a commercial environment, furniture is more than just a place to sit or work—it is a strategic asset. Furniture Contracting is the end-to-end process of specifying, sourcing, and installing furniture solutions that align with a brand’s identity, a building’s architecture, and the well-being of its occupants. From high-density workstations to bespoke executive suites, professional furniture contracting ensures that your interior assets are durable, ergonomic, and delivered on schedule.',
      points: [
        { label: 'MISSION', title: 'Specification & Durability', desc: 'Every commercial space has unique demands. We select pieces based on Durability: Commercial-grade fabrics and materials rated for high-traffic "contract" use. Ergonomics: Task chairs and height-adjustable desks designed to support long-term physical health. Acoustics: Utilizing soft seating and "phone booths" to manage noise levels in open-plan layouts.' },
        { label: 'VISION', title: 'Sourcing & Supply Chain', desc: 'Navigating lead times and supply chains is the backbone of contracting. Volume Sourcing: Leveraging industry relationships to secure competitive pricing for large-scale installations. Custom Solutions: Coordinating with manufacturers for bespoke millwork or branded furniture pieces that can’t be found in a catalog.' },
        { label: 'VALUE', title: 'The Final Mile & On-Site Assembly', desc: 'Managing staging and phasing: coordinating deliveries to match the construction schedule. On-site assembly: expert installation of complex modular systems, ensuring all power and data integrated into the furniture is fully functional.' }
      ]
    },
    'TOUCH WOOD': {
      title: 'TOUCH WOOD',
      subtitle: 'DESIGN CONSULTANCY STUDIO',
      intro: 'Bespoke corporate interior planning, space optimization, and structural consultancy. We map out workflows, employee behavior, and branding requirements to design workspaces that foster creativity, collaboration, and high productivity.',
      points: [
        { label: 'MISSION', title: 'Workplace DNA Audits', desc: 'We begin by understanding the "DNA" of your organization. Through workplace audits and stakeholder interviews, we identify Space Utilization: How much space do you actually need based on hybrid work models or customer flow? Cultural Alignment: Designing environments that reflect your brand’s mission and values.' },
        { label: 'VISION', title: 'Design Narrative & Flow', desc: 'This is where vision takes shape. We create cohesive design narratives that balance form and function. Zoning & Flow: Strategically placing departments or retail sections to optimize movement and collaboration. Visual Identity: Selecting palettes, materials, and lighting that evoke the desired psychological response from occupants.' },
        { label: 'VALUES', title: 'Technical Roadmap & Specs', desc: 'A great design is only as good as its execution. Our consultancy provides the technical roadmap required for construction. Detailed Specifications: Exacting standards for finishes, fixtures, and equipment (FF&E). Compliance & Accessibility: Ensuring every design adheres to local building codes, fire safety, and ADA standards.' }
      ]
    }
  };

  const frontierSubs = [
    'ALL',
    'MODULAR FURNITURE',
    'DESKING',
    'LOCKERS',
    'SCREEN & PARTITION',
    'STORAGE',
    'MEETING TABLES',
    'GRILLS & PLANTER BOX'
  ];

  // Filter logic
  const filteredProjects = projects.filter(p => {
    const matchesBrand = activeBrand === 'ALL' || p.brand.toUpperCase() === activeBrand.toUpperCase();
    if (!matchesBrand) return false;
    
    if (activeBrand === 'FRONTIER FURNITURE' && activeSub !== 'ALL') {
      // Simple tag match in description/category
      const subKeyword = activeSub.replace('&', 'and').toLowerCase();
      const projectCat = p.category.toLowerCase();
      const projectDesc = p.description.toLowerCase();
      const projectTitle = p.title.toLowerCase();
      
      // Map to short keywords
      if (subKeyword.includes('desking')) return projectDesc.includes('desk') || projectTitle.includes('desk') || projectCat.includes('desk');
      if (subKeyword.includes('locker')) return projectDesc.includes('locker') || projectTitle.includes('locker') || projectCat.includes('locker');
      if (subKeyword.includes('screen')) return projectDesc.includes('screen') || projectDesc.includes('partition') || projectTitle.includes('screen') || projectTitle.includes('partition');
      if (subKeyword.includes('storage')) return projectDesc.includes('cabinet') || projectDesc.includes('storage') || projectTitle.includes('storage');
      if (subKeyword.includes('meeting')) return projectDesc.includes('meeting') || projectTitle.includes('meeting') || projectDesc.includes('table') || projectTitle.includes('table');
      if (subKeyword.includes('grills')) return projectDesc.includes('planter') || projectDesc.includes('grill') || projectTitle.includes('planter') || projectTitle.includes('grill');
      if (subKeyword.includes('modular')) return projectCat.includes('modular') || projectDesc.includes('modular') || projectTitle.includes('modular');
    }
    return true;
  });

  // Track cursor hover state
  const handleProjectHover = (e, enter) => {
    const img = e.currentTarget.querySelector('img');
    if (img) {
      img.style.transform = enter ? 'scale(1.04)' : 'scale(1)';
    }
  };

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

  // Handle Quick inquiry submit
  const handleQuickLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      await fetch(`${apiURL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          subject: `Quick Inquiry - ${leadForm.brand}`,
          message: leadForm.message,
          type: 'Lead Generation'
        })
      });
      setLeadSuccess(true);
      setTimeout(() => {
        setLeadSuccess(false);
        setQuickContactOpen(false);
        setLeadForm({ name: '', email: '', message: '', brand: 'General' });
      }, 2500);
    } catch (err) {
      console.error("Failed sending inquiry", err);
    }
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

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      
      {/* 1. HERO SHOWCASE (typographic and bold, BIG.dk style) */}
      <section style={{ padding: '80px 5vw 40px 5vw', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <div className="reveal-container">
              <h1 className="expensive-reveal" style={{ fontSize: 'calc(2.5rem + 2.5vw)', letterSpacing: '-0.04em', color: 'var(--text-primary)', margin: 0, fontWeight: '900' }}>
                ELLIPSIS GROUP
              </h1>
            </div>
            <p className="mono-text" style={{ color: 'var(--text-muted)', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Workspace Architecture // Advanced MEP Engineering // Modular Furniture Fabrication
            </p>
          </div>

          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We transform corporate shells into living, productive environments by integrating design planning, infrastructure engineering, and local manufacturing under a single contract.
            </p>
            <button 
              onClick={() => setQuickContactOpen(true)}
              className="interactive btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              Get Project Estimation
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Large visual entry graphic placeholder that auto-zooms */}
        <div 
          style={{ 
            width: '100%', 
            aspectRatio: '21/9', 
            overflow: 'hidden', 
            border: '1px solid var(--border-light)',
            position: 'relative'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
            alt="Corporate head office entry" 
            className="ken-burns"
            onError={(e) => handleImageError(e, 'design')}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 10s ease-out'
            }}
            ref={(img) => {
              if (img) setTimeout(() => img.style.transform = 'scale(1.08)', 100);
            }}
          />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', padding: '10px 20px' }}>
            <span className="mono-text" style={{ fontSize: '11px', fontWeight: '700' }}>00 // CONTINUOUS WORKSPACE INTEGRATION</span>
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORIES FILTER BAR (big.dk layout style) */}
      <div 
        style={{
          position: 'sticky',
          top: '80px',
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
          borderTop: '1px solid var(--border-light)',
          zIndex: 90,
          padding: '10px 5vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          {/* Main Brand filters */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--border-light)', padding: '1px' }}>
            {['ALL', 'KEIYAN MEP', 'FRONTIER FURNITURE', 'TOUCH WOOD'].map(brand => (
              <button
                key={brand}
                onClick={() => {
                  setActiveBrand(brand);
                  setActiveSub('ALL');
                }}
                className="interactive"
                style={{
                  padding: '8px 18px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeBrand === brand ? 'var(--text-primary)' : 'var(--bg-secondary)',
                  color: activeBrand === brand ? 'var(--bg-primary)' : 'var(--text-primary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {brand}
              </button>
            ))}
          </div>

          <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            FILTERING: <strong>{filteredProjects.length}</strong> PROJECTS SHOWN
          </span>
        </div>

        {/* Frontier Furniture Subcategories drawer (reveals when Frontier Furniture is active) */}
        {activeBrand === 'FRONTIER FURNITURE' && (
          <div 
            className="animate-fade-in"
            style={{ 
              display: 'flex', 
              gap: '8px', 
              overflowX: 'auto', 
              padding: '6px 0',
              borderTop: '1px dashed #e0e0e0',
              marginTop: '5px'
            }}
          >
            {frontierSubs.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className="interactive mono-text"
                style={{
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderRadius: '0',
                  border: '1px solid var(--border-light)',
                  backgroundColor: activeSub === sub ? 'var(--text-primary)' : 'var(--bg-secondary)',
                  color: activeSub === sub ? 'var(--bg-primary)' : 'var(--text-primary)',
                  whiteSpace: 'nowrap'
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. BRAND DETAILS PANEL (renders the docx copy when a brand is active) */}
      {activeBrand !== 'ALL' && brandDetails[activeBrand] && (
        <section 
          className="animate-fade-in-up"
          style={{ 
            padding: '60px 5vw 20px 5vw',
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }} className="brand-layout-grid">
            <div>
              <span className="mono-text" style={{ color: 'var(--accent-bronze)', display: 'block', marginBottom: '10px', fontWeight: '700' }}>DIVISION OVERVIEW</span>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)' }}>
                {brandDetails[activeBrand].title}
              </h2>
              <p className="mono-text" style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '11px', textTransform: 'uppercase' }}>
                {brandDetails[activeBrand].subtitle}
              </p>
              
              <button
                onClick={() => {
                  setLeadForm({ ...leadForm, brand: activeBrand });
                  setQuickContactOpen(true);
                }}
                className="interactive btn-primary"
                style={{ marginTop: '30px' }}
              >
                Consult on {activeBrand}
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)', fontWeight: '500' }}>
                {brandDetails[activeBrand].intro}
              </p>
              
              {/* Mission/Vision/Values Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {brandDetails[activeBrand].points.map((pt, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                    <span className="mono-text" style={{ fontSize: '10px', color: 'var(--accent-bronze)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                      {pt.label}
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '10px' }}>
                      {pt.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subcategories Catalog Showcase (Stark minimalist grid) */}
          {brandSubCategories[activeBrand] && (
            <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-light)', paddingTop: '40px' }}>
              <span className="mono-text" style={{ color: 'var(--accent-bronze)', display: 'block', marginBottom: '24px', letterSpacing: '0.12em', fontWeight: '700' }}>PRODUCT REGISTRY & TECHNICAL SPECIFICATIONS</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                {brandSubCategories[activeBrand].map((sub, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
                      <img 
                        src={sub.image} 
                        alt={sub.title} 
                        onError={(e) => handleImageError(e, activeBrand === 'KEIYAN MEP' ? 'mep' : activeBrand === 'TOUCH WOOD' ? 'design' : 'furniture')}
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
            </div>
          )}
          
          <style>{`
            @media (max-width: 900px) {
              .brand-layout-grid {
                grid-template-columns: 1fr !important;
                gap: 20px !important;
              }
            }
          `}</style>
        </section>
      )}

      {/* 4. MAIN PROJECTS VIEW (stark big.dk-style scroll listing) */}
      <section ref={projectListRef} style={{ padding: '60px 5vw 120px 5vw' }}>
        
        {filteredProjects.length === 0 ? (
          <div style={{ padding: '100px 0', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
            <p className="mono-text" style={{ fontSize: '13px', fontWeight: '700' }}>NO PROJECTS RECORDED IN THIS CATEGORY.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {filteredProjects.map((proj, idx) => (
              <div 
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj);
                  trackAnalytics('Project Detail', { projectId: proj.id, projectTitle: proj.title });
                }}
                onMouseEnter={(e) => handleProjectHover(e, true)}
                onMouseLeave={(e) => handleProjectHover(e, false)}
                className="interactive animate-fade-in-up"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '40px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '50px'
                }}
              >
                {/* Project Image Frame */}
                <div 
                  style={{
                    width: '60%',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    position: 'relative'
                  }}
                  className="project-image-box"
                >
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    onError={(e) => handleImageError(e, proj.brand.toUpperCase() === 'KEIYAN MEP' ? 'mep' : proj.brand.toUpperCase() === 'TOUCH WOOD' ? 'design' : 'furniture')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                  <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', padding: '4px 10px' }}>
                    <span className="mono-text" style={{ fontSize: '10px', fontWeight: '700' }}>{proj.brand}</span>
                  </div>
                </div>

                {/* Project Info Block */}
                <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }} className="project-info-box">
                  {/* Brand specific visual Icon */}
                  <div style={{ width: '36px', height: '36px', overflow: 'hidden' }}>
                    {renderProjectIcon(proj.brand)}
                  </div>

                  <div>
                    <span className="mono-text" style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {proj.category}
                    </span>
                    <h3 style={{ fontSize: '32px', fontWeight: '900', marginTop: '6px', color: 'var(--text-primary)' }}>
                      {proj.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {proj.description.substring(0, 160) + '...'}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                      <MapPin size={12} />
                      <span className="mono-text">{proj.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                      <Calendar size={12} />
                      <span className="mono-text">Year: {proj.year}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. GORGEOUS PROJECT DETAIL OVERLAY DIALOG (Awwwards design style) */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '40px' }}>
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
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
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
              <div style={{ border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  onError={(e) => handleImageError(e, selectedProject.brand.toUpperCase() === 'KEIYAN MEP' ? 'mep' : selectedProject.brand.toUpperCase() === 'TOUCH WOOD' ? 'design' : 'furniture')}
                  style={{ width: '100%', objectFit: 'cover', display: 'block', aspectRatio: '16/10' }}
                />
              </div>

              {/* Extra dummy photos (simulated gallery representing detailed drawings) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ border: '1px solid var(--border-light)', aspectRatio: '1.5', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400" alt="Technical blueprint sketch" onError={(e) => handleImageError(e, 'mep')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ border: '1px solid var(--border-light)', aspectRatio: '1.5', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=400" alt="Completed installation layout details" onError={(e) => handleImageError(e, 'furniture')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>CASE STUDY // CLIENT FILE</span>
                <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--text-primary)', marginTop: '10px' }}>
                  {selectedProject.title}
                </h1>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {selectedProject.description}
              </p>

              {/* Technical Spec sheet */}
              <div style={{ border: '1px solid var(--border-light)', padding: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px', marginBottom: '16px' }}>
                  PROJECT SPECIFICATIONS
                </h4>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: 'var(--text-muted)' }}>CLIENT:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.client}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: 'var(--text-muted)' }}>LOCATION:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.location}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td className="mono-text" style={{ padding: '8px 0', color: 'var(--text-muted)' }}>YEAR:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>{selectedProject.year}</td>
                    </tr>
                    <tr>
                      <td className="mono-text" style={{ padding: '8px 0', color: 'var(--text-muted)' }}>CONTRACT:</td>
                      <td className="mono-text" style={{ padding: '8px 0', textAlign: 'right', fontWeight: '700' }}>DESIGN-BUILD INTEGRATION</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lead captures */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <p className="mono-text" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>* Interested in deploying a similar architectural space configuration for your corporate organization?</p>
                <button
                  onClick={() => {
                    setLeadForm({ ...leadForm, brand: selectedProject.brand, message: `Inquiring about configuration styled similarly to project: ${selectedProject.title}` });
                    setQuickContactOpen(true);
                  }}
                  className="interactive btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Configuration Consult
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
            .project-image-box:hover img {
              transform: scale(1.04);
            }
            @media (max-width: 768px) {
              .project-image-box {
                width: 100% !important;
                height: 280px !important;
              }
              .project-info-box {
                width: 100% !important;
              }
              .animate-fade-in-up {
                flex-direction: column !important;
                gap: 20px !important;
              }
            }
          `}</style>
        </div>
      )}

      {/* 6. QUICK LEAD CONTACT POPUP OVERLAY */}
      {quickContactOpen && (
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
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              position: 'relative'
            }}
          >
            {/* Close */}
            <button 
              onClick={() => setQuickContactOpen(false)}
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

            {leadSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', border: '2px solid var(--border-color)', borderRadius: '50%', marginBottom: '20px' }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>INQUIRY SENT SUCCESSFULLY</h3>
                <p className="mono-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Our structural lead engineers will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickLeadSubmit}>
                <span className="mono-text" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>DIRECT FILE REQUEST</span>
                <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  PROJECT REGISTRY
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    value={leadForm.name} 
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Email</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    value={leadForm.email} 
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Scope of Inquiry</label>
                  <textarea 
                    rows="3" 
                    required 
                    className="form-input" 
                    placeholder="Describe size of space, locations, requirements..."
                    value={leadForm.message} 
                    onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })} 
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
