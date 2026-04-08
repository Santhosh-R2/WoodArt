import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import './Location.css';

const Location = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="location-portal"
    >
      {/* Cinematic Geographical Hero */}
      <header className="location-header">
        <div className="location-bg-glow" />
        <motion.div {...fadeInUp} className="header-content">
          <span className="section-label">Institutional Anchor</span>
          <h1>Our Geographical Workshop</h1>
          <p>Experience artisanal woodworking in person at our London sanctuary. Every masterpiece is finished under our local structural oversight.</p>
        </motion.div>
      </header>

      <section className="location-matrix-container">
        <div className="location-grid">
          {/* Left: Institutional Contact Matrix */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="contact-info-field glass-card"
          >
            <div className="info-section">
              <div className="info-header">
                <MapPin size={24} className="text-primary" />
                <h3>The Artisanal Sanctuary</h3>
              </div>
              <p className="address-text">
                SH 45,<br />
                Tamil Nadu,<br />
                India
              </p>
              <button className="btn-secondary direction-btn">
                <span>Navigate via GPS</span>
                <ExternalLink size={16} />
              </button>
            </div>

            <div className="info-section">
              <div className="info-header">
                <Phone size={24} className="text-primary" />
                <h3>Communications Focal</h3>
              </div>
              <p className="phone-text">+91 9442302275</p>
              <p className="email-text">sync@artesanalportal.luxury</p>
            </div>

            <div className="info-section">
              <div className="info-header">
                <Clock size={24} className="text-primary" />
                <h3>Operating Hours</h3>
              </div>
              <div className="hours-grid">
                <div className="hour-row"><span>Mon - Fri</span><span className="dot" /><span>09:00 - 18:00</span></div>
                <div className="hour-row"><span>Sat</span><span className="dot" /><span>10:00 - 14:00</span></div>
                <div className="hour-row disabled"><span>Sun</span><span className="dot" /><span>Closed for Curing</span></div>
              </div>
            </div>

            <div className="institutional-badge">
              <ShieldCheck size={20} />
              <span>Verified Geographical Anchor</span>
            </div>
          </motion.div>

          {/* Right: High-Fidelity Map Matrix */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="map-field glass-card"
          >
            <div className="map-frame">
              <iframe 
                src="https://maps.google.com/maps?q=8.3426036,77.3714564&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Institutional Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Footer Anchor */}
    
    </motion.div>
  );
};

export default Location;
