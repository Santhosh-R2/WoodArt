import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldCheck,
  Trash2,
  DoorOpen,
  ChevronLeft,
  ExternalLink,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

import api from '../utils/api';
import './InquiryDetails.css';

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
      setTimeout(() => setLoading(false), 1000); // Cinematic transition
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
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Retrieving Institutional Dossier...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="loading-portal">
        <AlertCircle size={48} className="text-primary mb-4" />
        <h2 className="archival-title" style={{ fontSize: '2rem' }}>Entry Not Identified</h2>
        <button onClick={() => navigate('/inquiries')} className="btn-dive-executive mt-6">
          RETURN TO REGISTRY
        </button>
      </div>
    );
  }

  const { user, door, message, status, createdAt } = inquiry;

  return (
    <div className="inquiry-dossier-container">
      <div className="dossier-split-view">
        
        {/* Left: Cinematic Asset Anchor */}
        <section className="dossier-asset-anchor">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="inquiry-hero-wrapper"
          >
            {door?.doorImage ? (
              <img src={door.doorImage} alt={door.doorName} className="inquiry-prime-shot" />
            ) : (
              <div className="inquiry-missing-asset">
                 <DoorOpen size={64} className="opacity-10" />
                 <span>Visual Asset Depleted</span>
              </div>
            )}
            <div className="inquiry-lighting-overlay" />
            
            <div className="dossier-id-badge">
              <ShieldCheck size={14} />
              <span>DOSSIER ID: {id.slice(-6).toUpperCase()}</span>
            </div>
          </motion.div>
        </section>

        {/* Right: Instrumentation Side */}
        <section className="dossier-instrument-pane">
          <nav className="dossier-top-nav">
            <button onClick={() => navigate('/inquiries')} className="dossier-back-btn">
              <ChevronLeft size={20} />
            </button>
            
            <div className="dossier-action-nexus">
               <button 
                onClick={() => window.open(`https://wa.me/${user?.phone?.replace(/\D/g,'')}`, '_blank')}
                className="btn-whatsapp-direct"
               >
                 <MessageCircle size={18} />
                 <span>WHATSAPP</span>
               </button>
            </div>
          </nav>

          <div className="dossier-content-scroller">
            <header className="dossier-header-block">
              <div className="dossier-tag">Acquisition Request</div>
              <h1 className="dossier-main-title">{door?.doorName || 'Legacy Collection'}</h1>
            </header>

            {/* Patron Identification */}
            <div className="dossier-node">
              <div className="node-title-row">
                 <User size={16} className="text-primary" />
                 <h3>Patron Identity</h3>
              </div>
              
              <div className="patron-identity-card">
                <div className="identity-row-main">
                   <div className="identity-glyph">
                      {user?.name?.charAt(0) || 'A'}
                   </div>
                   <div className="patron-core-info">
                      <h4>{user?.name || 'Anonymous Artisan'}</h4>
                      <p>Registry Authenticated</p>
                   </div>
                </div>

                <div className="patron-contact-grid">
                   <div className="contact-node">
                      <label>Email Signature</label>
                      <span>{user?.email || 'Archive Only'}</span>
                   </div>
                   <div className="contact-node">
                      <label>Voice Line</label>
                      <span>{user?.phone || 'Not Logged'}</span>
                   </div>
                </div>

                <div className="contact-node">
                   <label>Registry Address</label>
                   <span style={{ lineHeight: 1.5 }}>{user?.address || 'Institutional address not logged.'}</span>
                </div>
              </div>
            </div>

            {/* Message Buffer */}
            <div className="dossier-node">
              <div className="node-title-row">
                 <MessageSquare size={16} className="text-primary" />
                 <h3>Message Buffer</h3>
              </div>
              
              <div className="message-buffer-vault">
                {message}
              </div>

              <div className="dossier-footer-meta">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} />
                    <span>LOGGED: {new Date(createdAt).toLocaleString()}</span>
                 </div>
                 
                 <div className="v2-status-pill">
                    <div className={`v2-dot ${status === 'pending' ? 'active' : ''}`} />
                    <span>{status === 'pending' ? 'PENDING REVIEW' : 'ENGAGED'}</span>
                 </div>
              </div>
            </div>

            {/* Administrative Console */}
            <div className="dossier-console">
               <div className="console-btn-row">
                  <button 
                    onClick={() => updateStatus(status === 'pending' ? 'contacted' : 'pending')}
                    disabled={updating}
                    className="btn-status-toggle"
                  >
                    {updating ? <Loader2 size={18} className="animate-spin" /> : status === 'pending' ? 'MARK ENGAGED' : 'MARK PENDING'}
                  </button>
                  <button 
                    onClick={() => window.location.href = `tel:${user?.phone}`}
                    className="btn-call-direct"
                  >
                    <PhoneCall size={16} />
                    <span>DIRECT CALL</span>
                  </button>
               </div>
               
               <button 
                 onClick={handleDelete}
                 disabled={updating}
                 className="btn-purge-registry"
               >
                 {updating ? <Loader2 size={14} className="animate-spin" /> : <><Trash2 size={14} /> PURGE REGISTRY</>}
               </button>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default InquiryDetails;
