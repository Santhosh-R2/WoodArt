import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loginHero from '../../assets/login_hero.png';
import './Auth.css';

import api from '../../utils/api';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.put('/users/profile', formData);

      const data = response.data;
      if (data.success) {
        localStorage.setItem('is_profile_complete', 'true');
        navigate('/showcase');
      } else {
        setError(data.message || 'Profile synchronization failed');
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
            <h2>Identity Onboarding</h2>
            <p>Define your artisanal persona for individualized portal synchronization.</p>
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
        <div className="auth-card profile-card glass-card">
          <div className="auth-header">
            <div className="auth-logo">
              <User size={32} />
            </div>
            <h1>Identity Capture</h1>
            <p>Please complete your master profile for portal access.</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="auth-form">
            <div className="input-group">
              <User size={16} className="field-icon" />
              <input
                type="text"
                className="has-icon"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder=" "
                required
              />
              <label>Master Identity Name</label>
            </div>

            <div className="input-group">
              <Phone size={16} className="field-icon" />
              <input
                type="text"
                className="has-icon"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder=" "
                required
              />
              <label>Communication (Phone)</label>
            </div>

            <div className="input-group">
              <MapPin size={16} className="field-icon" />
              <textarea
                className="has-icon"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder=" "
                required
              />
              <label>Operational Address</label>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" disabled={isLoading} className="btn-primary auth-btn">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>Complete Onboarding</span>
                  <CheckCircle2 size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
