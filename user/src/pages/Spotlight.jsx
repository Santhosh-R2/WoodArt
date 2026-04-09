import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight,
  Package, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Maximize2,
  ChevronRight,
  Info,
  Loader2
} from 'lucide-react';
import './Spotlight.css';

import api from '../utils/api';

const Spotlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [door, setDoor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDoorDetails();
  }, [id]);

  const fetchDoorDetails = async () => {
    try {
      const response = await api.get(`/doors/${id}`);
      const data = response.data;
      if (data.success) {
        setDoor(data.data);
      }
    } catch (error) {
      console.error('Spotlight synchronization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="spotlight-loading">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p>Synchronizing Artisanal Specifications...</p>
      </div>
    );
  }

  if (!door) return <div className="error-portal">Entry not found.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      className="spotlight-container"
    >
      {/* Precision Navigation */}
      <nav className="spotlight-nav">
        <button onClick={() => navigate('/showcase')} className="btn-back">
          <ArrowLeft size={18} />
          <span>Return to Collection</span>
        </button>
        <div className="breadcrumbs">
          <span>Artisanal Portal</span>
          <ChevronRight size={14} />
          <span className="active">Spotlight: {door.doorName}</span>
        </div>
      </nav>

      <main className="spotlight-grid">
        {/* Left: Cinematic Masterpiece Image */}
        <section className="visual-field">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="masterpiece-frame glass-card"
          >
            <img src={door.doorImage} alt={door.doorName} className="hero-shot" />
            <div className="lighting-overlay" />
            <div className="meta-overlay">
              <span className="serial-number">ID-ASSET-{door._id.slice(-6).toUpperCase()}</span>
              <div className="status-badge">
                <ShieldCheck size={14} />
                <span>Certified Craftsmanship</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right: Technical Specifications */}
        <section className="spec-field glass-card">
          <div className="spec-content">
            <header className="spec-header">
              <div className="title-block">
                <motion.div whileHover={{ scale: 1.1 }} className="icon-badge">
                </motion.div>
                <h1>{door.doorName}</h1>
              </div>
              <p className="subtitle">High-fidelity wood door specification for luxury interiors.</p>
            </header>

            <div className="price-matrix">
              <div className="price-label">Market Value Entry</div>
              <div className="price-value">₹{door.amount.toLocaleString()}</div>
            </div>

            <div className="technical-insight">
              <h3>Technical Insight</h3>
              <div className="insight-scrollable">
                <p>{door.description}</p>
              </div>
            </div>

            {/* <div className="specification-grid">
              <div className="spec-item glass-card">
                <Layers size={16} />
                <div className="item-details">
                  <label>Material Context</label>
                  <span>Institutional Grade Timber</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <ShieldCheck size={16} />
                <div className="item-details">
                  <label>Security Standard</label>
                  <span>Certified Reinforced Core</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <maximize2 size={16} />
                <div className="item-details">
                  <label>Service Registry</label>
                  <span>Artisanal Maintenance Plan</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <Clock size={16} />
                <div className="item-details">
                  <label>Creation Cycle</label>
                  <span>Bespoke on Inquiry</span>
                </div>
              </div>
            </div> */}
          </div>

          <footer className="spec-footer">
            <button 
              onClick={() => navigate('/inquiry', { state: { door } })}
              className="btn-primary inquiry-btn"
            >
              <span>Send Inquiry</span>
              <ArrowRight size={18} />
            </button>
          </footer>
        </section>
      </main>
    </motion.div>
  );
};

export default Spotlight;
