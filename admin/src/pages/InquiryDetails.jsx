import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageSquare, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldCheck,
  Trash2
} from 'lucide-react';

import api from '../utils/api';

const InquiryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchInquiryDetails();
  }, [id]);

  const fetchInquiryDetails = async () => {
    try {
      const response = await api.get(`/inquiries/${id}`);
      const data = response.data;
      if (data.success) {
        setInquiry(data.inquiry);
      }
    } catch (error) {
      console.error("Institutional Detail Sync failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await api.put(`/inquiries/${id}/status`, { status: newStatus });
      const data = response.data;
      if (data.success) {
        setInquiry({ ...inquiry, status: newStatus });
      }
    } catch (error) {
      console.error("Status synchronization failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("CAUTION: Permanent removal of the institutional registry entry. Proceed?")) return;
    
    setUpdating(true);
    try {
      const response = await api.delete(`/inquiries/${id}`);
      const data = response.data;
      if (data.success) {
        navigate('/inquiries');
      }
    } catch (error) {
      console.error("Institutional Deletion failure:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-portal">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p>Synchronizing Institutional Registry...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="page-container text-center">
        <h2>Institutional Entry Not Found</h2>
        <button onClick={() => navigate('/inquiries')} className="btn-primary mt-4">Return to Registry</button>
      </div>
    );
  }

  const { user, door, message, status, createdAt } = inquiry;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="page-container"
    >
      {/* Dossier Header */}
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => navigate('/inquiries')} className="btn-ghost" style={{ padding: '8px' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em', marginBottom: '4px' }}>Inquiry Dossier</h2>
          <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Administrative deep-dive into artisanal request #{id.slice(-6).toUpperCase()}</p>
        </div>
      </div>

      <div className="dossier-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Column: Visual & Technical Asset */}
        <div className="dossier-visual">
          <div className="glass-card" style={{ padding: '32px', position: 'relative' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '32px', background: 'var(--bg-darker)', border: '1px solid var(--border-light)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              {door?.doorImage ? (
                <img src={door.doorImage} alt={door.doorName} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '600px', objectFit: 'cover' }} />
              ) : (
                <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                  Visual Asset Missing
                </div>
              )}
            </div>
            
            <div className="asset-details">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{door?.doorName || 'Legacy Collection'}</h3>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {door?.amount ? `₹${door.amount.toLocaleString()}` : 'Valuation Pending'}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {door?.description || 'Institutional specification for this collection is currently unavailable.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Patron & Communication Identity */}
        <div className="dossier-meta" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Patron Identification */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
              <User size={20} className="text-primary" />
              <h3 style={{ fontWeight: 600 }}>Patron Identity</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</div>
                  <div style={{ fontWeight: 600 }}>{user?.name || 'Anonymous Artisan'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <Mail size={12} /> Email
                  </div>
                  <div style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{user?.email || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <Phone size={12} /> Phone
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>{user?.phone || 'N/A'}</div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <MapPin size={12} /> Registry Address
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{user?.address || 'Institutional address not logged.'}</div>
              </div>
            </div>
          </div>

          {/* Communication Token */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
              <MessageSquare size={20} className="text-primary" />
              <h3 style={{ fontWeight: 600 }}>Message Buffer</h3>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              "{message}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} />
                {new Date(createdAt).toLocaleString()}
              </div>
              <div>
                {status === 'pending' ? (
                  <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <AlertCircle size={14} /> PENDING
                  </span>
                ) : (
                  <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <CheckCircle2 size={14} /> ENGAGED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Institutional Controls */}
          <div className="glass-card" style={{ padding: '24px', background: 'var(--primary-low)', border: '1px solid var(--border-primary)' }}>
             <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Administrative Controls</h3>
             <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <button 
                  onClick={() => updateStatus(status === 'pending' ? 'contacted' : 'pending')}
                  disabled={updating}
                  className="btn-primary" 
                  style={{ flex: 1, fontSize: '0.85rem' }}
                >
                  {updating ? <Loader2 size={18} className="animate-spin" /> : status === 'pending' ? 'Mark Contacted' : 'Mark Pending'}
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/${user?.phone?.replace(/\D/g,'')}`, '_blank')}
                  className="btn-ghost" 
                  style={{ flex: 1, fontSize: '0.85rem', background: 'rgba(37, 211, 102, 0.1)', borderColor: 'rgba(37, 211, 102, 0.3)', color: '#25D366' }}
                >
                  WhatsApp
                </button>
             </div>
             <button 
                onClick={handleDelete}
                disabled={updating}
                className="btn-ghost" 
                style={{ width: '100%', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', height: '40px' }}
              >
                {updating ? <Loader2 size={14} className="animate-spin" /> : <><Trash2 size={14} /> Purge Registry</>}
              </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InquiryDetails;
