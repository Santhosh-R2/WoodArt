import React from 'react';
import { ShieldCheck, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="artisanal-footer minimalist">
      <div className="footer-container">
        {/* Simplified Artisanal Block */}
        <div className="footer-identity">
          <div className="brand-lockup">
            <ShieldCheck size={32} className="text-primary" />
            <h2>Vishwam Carvings</h2>
          </div>
          
          <div className="contact-matrix">
            <div className="contact-item">
              <MapPin size={18} className="text-primary" />
              <p>Main Office: 12 High-Fidelity Road, London, UK</p>
            </div>
            <div className="contact-item">
              <Phone size={18} className="text-primary" />
              <p>Phone No: +91 9442302275</p>
            </div>
          </div>
        </div>

        {/* Legal Stripe */}
        <div className="footer-bottom">
          <p>© 2026 ARTESANAL PORTAL. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
