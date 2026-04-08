import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, ShieldCheck, ArrowLeft, Loader2, Package } from 'lucide-react';
import api from '../utils/api';
import './Inquiry.css';

const Inquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [door, setDoor] = useState(location.state?.door || null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error('Identity sync error:', err);
      }
    };
    if (localStorage.getItem('auth_token')) fetchProfile();
  }, []);

  const handleWhatsApp = () => {
    if (!door || !user) return;

    const adminNumber = "917025912190";
    const waMessage = `*Artisanal Inquiry - Studio Portrait*%0A%0A` +
      `*Masterpiece:* ${door.doorName}%0A` +
      `*Market Value:* ₹${door.amount}%0A%0A` +
      `*Patron Identity:*%0A` +
      `Name: ${user.name}%0A` +
      `Phone: ${user.phone}%0A%0A` +
      `*Technical Request:*%0A${message}`;

    window.open(`https://wa.me/${adminNumber}?text=${waMessage}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!door) return;

    setIsLoading(true);
    setError('');

    try {
      const { data } = await api.post('/inquiries', {
        doorId: door._id,
        message: `Studio Inquiry: ${message}`
      });

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || 'Synchronization failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!door) {
    return (
      <div className="inquiry-portal error-portal">
        <Package size={48} className="text-dim" />
        <h3>Context Lost</h3>
        <p>Please select a specific door from the showcase to start an inquiry.</p>
        <button onClick={() => navigate('/showcase')} className="btn-primary mt-4">Return to Collection</button>
      </div>
    );
  }

  return (
    <div className="inquiry-portal-studio">
      <main className="studio-layout">
        {/* Left: Studio Portrait Visual */}
        <section className="studio-visual">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={door.doorImage} 
            alt={door.doorName} 
            className="studio-hero" 
          />
          {/* <div className="studio-badge">Portfolio Element #{door._id.slice(-4).toUpperCase()}</div> */}
          <div className="studio-visual-overlay" />
        </section>

        {/* Right: Structural Form Panel */}
        <section className="studio-form-panel">
          <header className="studio-header">
            <button onClick={() => navigate(-1)} className="studio-back">
              <ArrowLeft size={16} />
              <span>Catalogue</span>
            </button>
            <div className="studio-title-wrap">
              <span className="studio-context">Direct Studio Link</span>
              <h1>Artesanal Inquiry</h1>
              <p>Initialize a direct line for the <span className="highlight-text">{door.doorName}</span>.</p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit} 
                className="studio-form"
              >
                <div className="studio-input-group">
                  <textarea
                    placeholder="Describe your vision or technical requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <div className="input-focus-line" />
                </div>

                {error && <div className="studio-error">{error}</div>}

                <button type="submit" disabled={isLoading || !message} className="studio-submit">
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Submit to Studio</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="studio-success"
              >
                <div className="success-icon-wrap">
                  <ShieldCheck size={48} className="success-icon" />
                  <div className="success-pulse" />
                </div>
                <div className="success-text">
                  <h2>Registry Secured</h2>
                  <p>Your inquiry has been logged in our artisanal database. Connect with our concierge to finalize your vision.</p>
                </div>
                
                <div className="studio-actions">
                  <button onClick={handleWhatsApp} className="studio-wa-btn">
                    <MessageSquare size={20} />
                    <span>Connect via WhatsApp</span>
                  </button>
                  <button onClick={() => navigate('/showcase')} className="studio-secondary">
                    Return to Collection
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Inquiry;
