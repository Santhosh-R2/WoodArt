import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, DoorOpen, ArrowRight } from 'lucide-react';
import './Login.css';
import showcaseImg from '../assets/login-showcase.png';

import api from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded Credentials
  const ADMIN_EMAIL = "admin@wooddoor.com";
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/users/admin-login', { email, password });
      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.token); // Store token for future requests
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid institutional credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Institutional Auth Sync failed. Please check server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Branding Pane (Left) */}
      <section className="login-branding-showcase">
        <img src={showcaseImg} alt="Luxury Wood Door" className="showcase-img" />
        <div className="showcase-overlay" />
        
        <div className="showcase-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="showcase-logo"
          >
            <DoorOpen size={32} style={{ color: 'white' }}/>
            <h2 style={{ color: 'white' }}>Timber Admin</h2>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="showcase-headline"
          >
            Crafting the <span >Threshold</span> of Luxury.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="showcase-subtext"
          >
            Access the administrative nexus of Timber Excellence. Manage inventory, bespoke orders, and master craftsmanship details.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="showcase-footer"
          style={{ position: 'relative', zIndex: 2, color: 'var(--text-dim)', fontSize: '0.875rem' }}
        >
          &copy; 2026 TimberWood Industries. All rights reserved.
        </motion.div>
      </section>

      {/* Form Pane (Right) */}
      <section className="login-form-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="login-card"
        >
          <div className="login-header-text">
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.75rem' }}
            >
              Secure Portal
            </motion.p>
            <h1>Welcome Back</h1>
            <p>Please enter your administrative credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field with Floating Label */}
            <div className="form-field">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input-base"
                placeholder=" "
                required
              />
              <label htmlFor="email" className="field-label">Admin Email</label>
            </div>

            {/* Password Field with Floating Label */}
            <div className="form-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input-base"
                placeholder=" "
                required
              />
              <label htmlFor="password" className="field-label">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-addon-right"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ color: '#ff4d4d', fontSize: '0.875rem', fontWeight: 500 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ marginTop: '10px' }}
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <footer className="login-meta-footer">
         
            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.5 }}>
              By signing in, you agree to our Internal Security Protocols and Data Privacy Guidelines.
            </p>
          </footer>
        </motion.div>
      </section>
    </div>
  );
}

export default Login;