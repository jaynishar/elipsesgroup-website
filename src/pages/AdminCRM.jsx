import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit3, MessageSquare, BookOpen, 
  Briefcase, Wrench, Save, CheckCircle, RefreshCw, X 
} from 'lucide-react';
import axios from 'axios';

export default function AdminCRM({ 
  projects, blogs, services, inquiries,
  refreshData
}) {
  const [activeTab, setActiveTab] = useState('blogs'); // blogs | projects | services | inquiries
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Blog Form
  const [blogForm, setBlogForm] = useState({
    title: '', category: 'Trends', excerpt: '', content: '', image: '', author: 'Ellipsis Team'
  });
  
  // Project Form
  const [projectForm, setProjectForm] = useState({
    title: '', brand: 'KEIYAN', category: 'General', description: '', image: '', client: '', location: '', year: '2026'
  });

  // Service Form
  const [serviceForm, setServiceForm] = useState({
    id: '', brand: '', title: '', subtitle: '', description: '', featuresText: ''
  });

  const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  // Trigger notice
  const triggerNotice = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // ==========================================
  // BLOG CRUD
  // ==========================================
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${apiURL}/api/blogs/${editingId}`, blogForm);
        triggerNotice("Blog post updated successfully!");
      } else {
        await axios.post(`${apiURL}/api/blogs`, blogForm);
        triggerNotice("New blog post created!");
      }
      setBlogForm({ title: '', category: 'Trends', excerpt: '', content: '', image: '', author: 'Ellipsis Team' });
      setIsEditing(false);
      setEditingId(null);
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to save blog post.", true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogForm({
      title: blog.title, category: blog.category, excerpt: blog.excerpt, content: blog.content, image: blog.image, author: blog.author
    });
    setIsEditing(true);
    setEditingId(blog.id);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await axios.delete(`${apiURL}/api/blogs/${id}`);
      triggerNotice("Blog post deleted!");
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to delete blog post.", true);
    }
  };

  // ==========================================
  // PROJECT CRUD
  // ==========================================
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${apiURL}/api/projects/${editingId}`, projectForm);
        triggerNotice("Project updated successfully!");
      } else {
        await axios.post(`${apiURL}/api/projects`, projectForm);
        triggerNotice("New project added to portfolio!");
      }
      setProjectForm({ title: '', brand: 'KEIYAN', category: 'General', description: '', image: '', client: '', location: '', year: '2026' });
      setIsEditing(false);
      setEditingId(null);
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to save project.", true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (proj) => {
    setProjectForm({
      title: proj.title, brand: proj.brand, category: proj.category, description: proj.description, image: proj.image, client: proj.client, location: proj.location, year: proj.year
    });
    setIsEditing(true);
    setEditingId(proj.id);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${apiURL}/api/projects/${id}`);
      triggerNotice("Project deleted!");
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to delete project.", true);
    }
  };

  // ==========================================
  // SERVICE EDIT
  // ==========================================
  const handleEditService = (service) => {
    setServiceForm({
      id: service.id,
      brand: service.brand,
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      featuresText: service.features ? service.features.join('\n') : ''
    });
    setIsEditing(true);
    setEditingId(service.id);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: serviceForm.title,
        subtitle: serviceForm.subtitle,
        description: serviceForm.description,
        features: serviceForm.featuresText.split('\n').filter(f => f.trim() !== '')
      };
      await axios.put(`${apiURL}/api/services/${serviceForm.id}`, payload);
      triggerNotice("Service division text updated!");
      setIsEditing(false);
      setEditingId(null);
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to update service.", true);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INQUIRY ACTIONS
  // ==========================================
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry from records?")) return;
    try {
      await axios.delete(`${apiURL}/api/inquiries/${id}`);
      triggerNotice("Inquiry removed.");
      refreshData();
    } catch (err) {
      console.error(err);
      triggerNotice("Failed to remove inquiry.", true);
    }
  };

  return (
    <div className="animate-fade-in section-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--accent-gold)', letterSpacing: '0.15em' }}>
            CRM ADMINISTRATION
          </span>
          <h1 style={{ fontSize: '36px', marginTop: '10px' }}>
            Content & <span className="text-gold">Site Manager</span>
          </h1>
        </div>
        <button 
          onClick={refreshData} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color-light)', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '12px' }}
        >
          <RefreshCw size={14} />
          RELOAD DATABASES
        </button>
      </div>

      {/* Stats Counter Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'Total Blogs', count: blogs.length, icon: <BookOpen size={20} className="text-gold" /> },
          { label: 'Total Work', count: projects.length, icon: <Briefcase size={20} className="text-gold" /> },
          { label: 'Sub-Divisions', count: services.length, icon: <Wrench size={20} className="text-gold" /> },
          { label: 'Client Inquiries', count: inquiries.length, icon: <MessageSquare size={20} className="text-gold" /> }
        ].map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--accent-gold-light)', padding: '12px', borderRadius: '4px' }}>{stat.icon}</div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{stat.label}</span>
              <h4 style={{ fontSize: '24px', fontWeight: '800', marginTop: '4px' }}>{stat.count}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Notices */}
      {successMsg && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#10B981', padding: '12px 20px', borderRadius: '4px', marginBottom: '24px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={16} />
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', padding: '12px 20px', borderRadius: '4px', marginBottom: '24px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={16} />
          {errorMsg}
        </div>
      )}

      {/* Control Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '16px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {[
          { id: 'blogs', label: 'Blogs & Articles', icon: <BookOpen size={14} /> },
          { id: 'projects', label: 'Portfolio Work', icon: <Briefcase size={14} /> },
          { id: 'services', label: 'Company Services', icon: <Wrench size={14} /> },
          { id: 'inquiries', label: `Client Inquiries (${inquiries.filter(i => i.status === 'New').length})`, icon: <MessageSquare size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsEditing(false);
              setEditingId(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              border: activeTab === tab.id ? '1px solid var(--accent-gold)' : '1px solid transparent',
              backgroundColor: activeTab === tab.id ? 'var(--accent-gold-light)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent-gold-hover)' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* =======================================================================
          TAB 1: BLOGS MANAGER
          ======================================================================= */}
      {activeTab === 'blogs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* List of Blogs */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              Existing Articles
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blogs.map(blog => (
                <div key={blog.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: '700' }}>{blog.category}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{blog.title}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Date: {blog.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEditBlog(blog)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteBlog(blog.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              {isEditing ? 'Modify Article' : 'Create New Article'}
            </h3>
            
            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>BLOG TITLE</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CATEGORY</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  >
                    <option value="Trends">Trends</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="News">News</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>AUTHOR</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>IMAGE URL</label>
                <input
                  type="text"
                  placeholder="https://unsplash.com/..."
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>EXCERPT (SHORT DESCRIPTION)</label>
                <input
                  type="text"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  required
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>ARTICLE CONTENT</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  required
                  rows={6}
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" disabled={loading} className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <Save size={16} />
                  {isEditing ? 'UPDATE POST' : 'PUBLISH POST'}
                </button>
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setBlogForm({ title: '', category: 'Trends', excerpt: '', content: '', image: '', author: 'Ellipsis Team' });
                    }} 
                    className="btn-secondary"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>
      )}

      {/* =======================================================================
          TAB 2: PROJECTS PORTFOLIO MANAGER
          ======================================================================= */}
      {activeTab === 'projects' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* List of Projects */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              Portfolio List
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: '700' }}>{proj.brand}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{proj.title}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Category: {proj.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEditProject(proj)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(proj.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              {isEditing ? 'Modify Portfolio Project' : 'Add New Portfolio Project'}
            </h3>
            
            <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>PROJECT TITLE</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>BRAND DIVISION</label>
                  <select
                    value={projectForm.brand}
                    onChange={(e) => setProjectForm({ ...projectForm, brand: e.target.value })}
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  >
                    <option value="KEIYAN">KEIYAN MEP</option>
                    <option value="FRONTIER FURNITURE">FRONTIER FURNITURE</option>
                    <option value="TOUCH WOOD">TOUCH WOOD STUDIO</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CATEGORY</label>
                  <input
                    type="text"
                    placeholder="e.g. Turnkey Interior"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CLIENT NAME</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>PROJECT YEAR</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>LOCATION</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, India"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>IMAGE URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>PROJECT DESCRIPTION</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  rows={4}
                  style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" disabled={loading} className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <Save size={16} />
                  {isEditing ? 'UPDATE PROJECT' : 'ADD PROJECT'}
                </button>
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setProjectForm({ title: '', brand: 'KEIYAN', category: 'General', description: '', image: '', client: '', location: '', year: '2026' });
                    }} 
                    className="btn-secondary"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>
      )}

      {/* =======================================================================
          TAB 3: SERVICES TEXTS MANAGER
          ======================================================================= */}
      {activeTab === 'services' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* List of Divisions */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              Service Divisions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {services.map(s => (
                <div key={s.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color-light)' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: '700' }}>{s.brand}</span>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{s.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => handleEditService(s)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-gold)' }}
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
              {isEditing && editingId ? `Edit Division: ${serviceForm.brand}` : 'Select a division to edit details'}
            </h3>
            
            {isEditing && editingId ? (
              <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>DIVISION TITLE</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>SUBTITLE</label>
                  <input
                    type="text"
                    value={serviceForm.subtitle}
                    onChange={(e) => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>DESCRIPTION</label>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    required
                    rows={4}
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }}
                  ></textarea>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>COMPETENCIES (ONE ITEM PER LINE)</label>
                  <textarea
                    value={serviceForm.featuresText}
                    onChange={(e) => setServiceForm({ ...serviceForm, featuresText: e.target.value })}
                    required
                    rows={5}
                    placeholder="Example Feature 1&#10;Example Feature 2"
                    style={{ width: '100%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color-light)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', fontSize: '13px', resize: 'none' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Save size={16} />
                    SAVE CHANGES
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                    }} 
                    className="btn-secondary"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>
                Please click the edit icon on the left panel to update a specific division's website copy.
              </p>
            )}
          </div>

        </div>
      )}

      {/* =======================================================================
          TAB 4: CLIENT INQUIRIES
          ======================================================================= */}
      {activeTab === 'inquiries' && (
        <div className="glass" style={{ padding: '30px', borderRadius: '6px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '10px' }}>
            Submitted Client Inquiries
          </h3>
          
          {inquiries.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
              No inquiries found in the logs.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {inquiries.map(inq => (
                <div key={inq.id} style={{ border: '1px solid var(--border-color-light)', padding: '24px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '10px', backgroundColor: 'var(--accent-gold-light)', border: '1px solid var(--border-color)', color: 'var(--accent-gold)', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {inq.type}
                      </span>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>
                        {inq.subject}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        From: <strong>{inq.name}</strong> ({inq.email})
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {new Date(inq.date).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color-light)', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
