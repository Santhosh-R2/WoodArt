import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loginHero from '../../assets/login_hero.png';
import './Auth.css';

import api from '../../utils/api';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/users/send-otp', { email });

      const data = response.data;
      if (data.success) {
        localStorage.setItem('auth_email', email);
        navigate('/auth/verify');
      } else {
        setError(data.message || 'Identity synchronization failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network synchronization error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-portal">
      {/* Left: Cinematic Masterpiece Field */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="auth-visual-field"
      >
        <img src={loginHero} alt="Artisanal Door Masterpiece" className="hero-shot" />
        <div className="visual-overlay" />
        <div className="visual-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="brand-lockup"
          >
            <ShieldCheck size={32} className="text-primary" />
            <h2>The Portal Identity</h2>
            <p>Access the institutional wood door collection via your secure artisanal key.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right: Security Interaction Field */}
      <motion.div 
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="auth-interaction-field"
      >
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="auth-logo">
              <Mail size={32} />
            </div>
            <h1>Identity Synchronization</h1>
            <p>Secure identity reveal via one-time code.</p>
          </div>

          <form onSubmit={handleSendOTP} className="auth-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label>Master Identity (Email Address)</label>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" disabled={isLoading} className="btn-primary auth-btn">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>Request Login Code</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <footer className="auth-footer">
            <p>By entering, you authorize high-fidelity data synchronization for the artisanal portal.</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailLogin;
