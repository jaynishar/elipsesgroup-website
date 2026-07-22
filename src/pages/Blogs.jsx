import React, { useState } from 'react';
import { Calendar, User, Search, BookOpen, X } from 'lucide-react';
import mepCeilingImg from '../assets/mep_ceiling.jpg';
import modularFurnitureImg from '../assets/modular_furniture.jpg';
import touchWoodMaterialsImg from '../assets/touch_wood_materials.jpg';

export default function Blogs({ blogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBlog, setActiveBlog] = useState(null);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '80px 5vw 120px 5vw' }}>
      
      {/* Header & Search */}
      <section style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="mono-text" style={{ color: 'var(--accent-bronze)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>INSIGHTS VERTICAL</span>
            <h1 style={{ fontSize: 'calc(2.2rem + 3vw)', marginTop: '20px', fontWeight: '900' }}>
              PUBLICATIONS & NEWS
            </h1>
          </div>

          {/* Search Input (Stark layout) */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-primary)' }} />
            <input
              type="text"
              placeholder="Search registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0',
                padding: '12px 16px 12px 42px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </section>

      {/* Blogs list */}
      <section>
        {filteredBlogs.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
            <p className="mono-text" style={{ fontSize: '13px', fontWeight: '700' }}>NO PUBLICATIONS MATCH YOUR REGISTRY QUERY.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {filteredBlogs.map(blog => (
              <article 
                key={blog.id} 
                className="interactive"
                style={{ 
                  border: '1px solid var(--border-light)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  backgroundColor: 'var(--bg-secondary)' 
                }}
              >
                <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
                  <img src={blog.image} alt={blog.title} onError={(e) => handleImageError(e, 'design')} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                </div>

                <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span className="mono-text" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {blog.category}
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                      {blog.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                      {blog.excerpt}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderTop: '1px dashed var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span className="mono-text">{blog.date}</span>
                      <span className="mono-text">By: {blog.author.toUpperCase()}</span>
                    </div>

                    <button 
                      onClick={() => setActiveBlog(blog)}
                      className="btn-secondary" 
                      style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '11px' }}
                    >
                      [ READ FULL ENTRY ]
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Blog Details Modal */}
      {activeBlog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 31, 33, 0.98)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => setActiveBlog(null)} 
              className="interactive"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '8px 16px',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '11px',
                cursor: 'pointer',
                zIndex: 101
              }}
            >
              [ CLOSE ENTRY ]
            </button>

            <div style={{ width: '100%', height: '350px', overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
              <img src={activeBlog.image} alt={activeBlog.title} onError={(e) => handleImageError(e, 'design')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '40px' }}>
              <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                {activeBlog.category}
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: '950', marginTop: '10px', marginBottom: '20px', lineHeight: '1.1' }}>
                {activeBlog.title}
              </h2>
              
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                <span className="mono-text">Published: {activeBlog.date}</span>
                <span className="mono-text">By: {activeBlog.author.toUpperCase()}</span>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {activeBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
