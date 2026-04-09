import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loginHero from '../../assets/login_hero.png';
import './Auth.css';

import api from '../../utils/api';

const OTPVerify = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('auth_email');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/users/verify-otp', { email, otp });

      const data = response.data;
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_profile_complete', data.user.isProfileComplete);

        if (!data.user.isProfileComplete) {
          navigate('/auth/complete-profile');
        } else {
          navigate('/showcase');
        }
      } else {
        setError(data.message || 'Security matrix verification failed');
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
            <h2>Verification Matrix</h2>
            <p>Confirm your artisanal identity via the secure synchronization key.</p>
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
              <Lock size={32} />
            </div>
            <h1>Security Identity</h1>
            <p>Verify your artisanal identity via the sent 6-digit code.</p>
          </div>

        <form onSubmit={handleVerifyOTP} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder=" "
              maxLength={6}
              required
            />
            <label>6-Digit Entry Code</label>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="auth-error"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={isLoading} className="btn-primary auth-btn">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>Synchronize Access</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

          <footer className="auth-footer">
            <p>Please wait 2 minutes for re-transmission if code is not received.</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerify;
