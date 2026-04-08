import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Menu, X, ShieldCheck, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem('auth_token');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_profile_complete');
    localStorage.removeItem('auth_email');
    setMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentRoutes = ['/', '/auth/login'];
  const isTransparent = transparentRoutes.includes(location.pathname) && !isScrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`artisanal-nav ${isTransparent ? 'transparent' : 'glass-frosted'}`}
    >
      <div className="nav-container">
        {/* Institutional Branding */}
        <div className="nav-brand" onClick={() => navigate('/')}>
          <ShieldCheck size={28} className="text-primary" />
          <span className="brand-name">Artesanal Portal</span>
        </div>

        {/* Navigation Core */}
        <div className="nav-links">
          <button onClick={() => navigate('/#story')} className="nav-item">Craftsmanship</button>
          <button onClick={() => navigate('/showcase')} className="nav-item">Collection</button>
          <button onClick={() => navigate('/location')} className="nav-item">Location</button>
        </div>

        {/* Global Focal Actions */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="btn-primary login-btn logout"
            >
              <LogOut size={16} />
              <span>Institutional Logout</span>
            </button>
          ) : (
            <button 
              onClick={() => navigate('/auth/login')} 
              className="btn-primary login-btn"
            >
              <Lock size={16} />
              <span>Identity Login</span>
            </button>
          )}
          
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Interaction Portal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu glass-card"
          >
            <button onClick={() => { navigate('/#story'); setMobileMenuOpen(false); }} className="mobile-item">Craftsmanship</button>
            <button onClick={() => { navigate('/showcase'); setMobileMenuOpen(false); }} className="mobile-item">Collection</button>
            <button onClick={() => { navigate('/location'); setMobileMenuOpen(false); }} className="mobile-item">Location</button>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="mobile-item login logout">Institutional Logout</button>
            ) : (
              <button onClick={() => { navigate('/auth/login'); setMobileMenuOpen(false); }} className="mobile-item login">Identity Login</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
