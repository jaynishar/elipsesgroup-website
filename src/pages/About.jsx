import React from 'react';
import { Target, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function About({ setView }) {
  // Meet the Core details from Ellipsis_Group_Website_Structure.docx
  const teamMembers = [
    {
      role: 'FOUNDER & CEO',
      name: 'Yuraaj Singh',
      desc: 'With over 30 years of experience executing projects with global awareness, he has honed a fastidious attention to detail that sets us apart. By combining the skills of master craftsmen with superior materials, we have established ourselves as a premium service provider in the fields of Interior Decoration and collector-grade furniture. Today, we are proud to serve a clientele of discerning expatriates and high-net-worth global citizens who demand nothing less than excellence.'
    },
    {
      role: 'PARTNER & DIRECTOR',
      name: 'Ravindra Suvarna',
      desc: 'Ravi co-founded ELLIPSIS, and is the Director at ELLIPSIS. A recipient of numerous awards and recognitions from within the fraternity, Ravi has been instrumental in growing ELLIPSIS to our current pre-eminent position within the profession. He likes to experiment with various forms of massing and creation of enclosures and their juxtaposition with openness to enhance user comfort, which is another key element of his designs.'
    },
    {
      role: 'HEAD OF STUDIO',
      name: 'Maulikk Shah',
      desc: 'A founding member of Ellipsis Group with over 20 years of experience, Maulik leads the firm’s Design Vertical. He has delivered landmark workspaces for global leaders like Samsung, Deloitte, and British Petroleum, specializing in sustainable, high-performance environments. An expert in ergonomics and workspace strategy, Maulik authored the firm’s pan-India design manual and remains a key voice in shaping the future of commercial design in India.'
    },
    {
      role: 'HEAD OF PROCUREMENT',
      name: 'Shabbir Pancha',
      desc: 'Shabbir serves as the strategic leader of our procurement function, ensuring that every design vision is backed by a resilient and cost-effective supply chain. He manages the end-to-end sourcing and negotiation of materials and services, focusing on high-quality standards and risk mitigation. From vendor relationship management to rigorous quality control, Shabbir’s leadership ensures that projects are delivered at peak value and on schedule.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Intro section */}
      <section style={{ borderBottom: '1px solid #000000', paddingBottom: '60px', marginBottom: '80px' }}>
        <span className="mono-text" style={{ color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>WHO WE ARE</span>
        <h1 style={{ fontSize: 'calc(2.5rem + 3.5vw)', marginTop: '20px', marginBottom: '40px', fontWeight: '900' }}>
          HERITAGE MEETS EVOLUTION
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '65px' }} className="about-grid">
          <div>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#000000', fontWeight: '500', marginBottom: '24px' }}>
              An ellipsis represents what comes next. At An Ellipsis Group, we don't just finish spaces; we create environments that evolve. We have stepped back to analyze the bigger picture of the Architecture and Interior industry to offer a fresh, research-driven perspective.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555555' }}>
              Formerly known as Frontier Furniture, we have evolved into An Ellipsis Group to better represent our vision. We combine 30+ years of proven experience with a modern approach to Design and Design + Build solutions.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555555', marginBottom: '24px' }}>
              We focus on the transformation of spaces—corporate, residential, and hospitality—synchronizing them with their architectural shell and natural environment.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555555', marginBottom: '30px' }}>
              We are in a nascent stage of a new beginning, yet backed by decades of expertise. We are constantly changing, evolving, and transforming the world of design.
            </p>
            <button 
              onClick={() => {
                setView('contact');
                window.scrollTo(0,0);
              }} 
              className="interactive btn-primary"
            >
              Collaborate With Us
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Details */}
      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '40px' }}>OPERATIONAL DISCIPLINE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { label: '01', title: 'INNOVATION', desc: 'Evolution is key. We integrate new systems, workflows, and sustainable materials daily to ensure we lead rather than follow.', icon: <Target size={20} /> },
            { label: '02', title: 'DISCIPLINE', desc: 'We value balance. Our strict scheduling and project management ensures on-time delivery, while our culture ensures our team remains passionate.', icon: <Eye size={20} /> },
            { label: '03', title: 'INTEGRITY', desc: 'Quality is non-negotiable. We build with honesty, transparency, and strong moral principles. No hidden budgets, no extended timelines.', icon: <ShieldCheck size={20} /> }
          ].map((item, idx) => (
            <div key={idx} style={{ border: '1px solid #000000', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono-text" style={{ fontWeight: '700' }}>{item.label}</span>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '10px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Core Section */}
      <section style={{ borderTop: '1px solid #000000', paddingTop: '60px' }}>
        <span className="mono-text" style={{ color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DIRECTORATE FILE</span>
        <h2 style={{ fontSize: '38px', marginTop: '10px', marginBottom: '50px', fontWeight: '900' }}>MEET THE CORE</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {teamMembers.map((member, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 2fr', 
                gap: '40px',
                borderBottom: '1px solid #eaeaea', 
                paddingBottom: '40px' 
              }}
              className="team-row"
            >
              <div>
                <span className="mono-text" style={{ fontSize: '11px', color: '#888888', display: 'block', marginBottom: '8px' }}>{member.role}</span>
                <h4 style={{ fontSize: '20px', fontWeight: '900' }}>{member.name}</h4>
              </div>
              <div>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#444444' }}>
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .team-row {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            padding-bottom: 25px !important;
          }
        }
      `}</style>

    </div>
  );
}
