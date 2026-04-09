import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PackagePlus, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ImageIcon, 
  X, 
  Camera,
  ShieldCheck,
  Zap
} from 'lucide-react';
import './AddInventory.css';

import api from '../utils/api';

const AddInventory = () => {
  const [formData, setFormData] = useState({
    doorName: '',
    amount: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { 
        setStatus({ type: 'error', message: 'Asset weight exceeds 50MB protocol.' });
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preview) {
      setStatus({ type: 'error', message: 'Institutional Registry requires a visual asset.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/doors', {
        ...formData,
        doorImage: preview
      });

      const data = response.data;

      if (data.success) {
        setStatus({ type: 'success', message: 'Masterpiece integrated into institutional registry.' });
        setFormData({ doorName: '', amount: '', description: '' });
        setPreview('');
        setImage(null);
        setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      } else {
        setStatus({ type: 'error', message: data.message || 'Synchronization failure.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Server connection severed. Check terminal.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="registry-suite-v2"
    >
      <div className="v2-split-orchestration">
        
        {/* Left: Visual Asset Staging */}
        <section className="asset-staging-side">
          <div className="archival-upload-frame glass-card">
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="preview-asset-display"
                >
                  <img src={preview} alt="Asset Staging" className="staging-shot" />
                  <div className="staging-overlay" />
                  <button type="button" onClick={clearImage} className="v2-btn-clear">
                    <X size={18} />
                    <span>Clear Asset</span>
                  </button>
                  <div className="v2-seal-tag">
                    <ShieldCheck size={14} />
                    <span>STAGING COMPLETE</span>
                  </div>
                </motion.div>
              ) : (
                <motion.label 
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="v2-upload-trigger"
                >
                  <input type="file" onChange={handleImageChange} accept="image/*" hidden />
                  <div className="v2-upload-content">
                    <div className="v2-camera-icon">
                      <Camera size={32} strokeWidth={1.5} />
                    </div>
                    <h3>Institutional Asset Shot</h3>
                    <p>Select a professional visual capture for the registry.</p>
                    <span className="v2-specs-tag">JPG, PNG OR WEBP • MAX 50MB</span>
                  </div>
                </motion.label>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Right: Technical Instrumentation */}
        <section className="technical-registry-side">
          <div className="registry-scroll-pane">
            <header className="registry-header-v2">
              <h1 className="archival-v2-title">Register Masterpiece</h1>
              <p className="registry-v2-meta">Institutioning new handcrafted artisanal entries.</p>
            </header>

            <form onSubmit={handleSubmit} className="v2-registry-form">
              <div className="registry-node-group">
                <label className="v2-input-label">Artisanal Designation</label>
                <div className="v2-input-wrapper">
                  <input
                    type="text"
                    name="doorName"
                    value={formData.doorName}
                    onChange={handleChange}
                    className="v2-registry-field"
                    placeholder="e.g., Majestic Walnut Arch"
                    required
                  />
                </div>
              </div>

              <div className="registry-node-group">
                <label className="v2-input-label">Assessed Market Value</label>
                <div className="v2-input-wrapper with-prefix">
                  <span className="v2-prefix">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="v2-registry-field"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="registry-node-group textarea-node">
                <label className="v2-input-label">Narrative & Soul</label>
                <div className="v2-input-wrapper">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="v2-registry-field v2-textarea"
                    placeholder="Document the craftsmanship, timber grade, and design ethos..."
                    required
                  />
                </div>
              </div>

              <div className="registry-form-actions">
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="v2-btn-integrate"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>SYNCHRONIZING...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={18} fill="currentColor" />
                      <span>INTEGRATE TO REGISTRY</span>
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`v2-status-banner ${status.type}`}
                  >
                    {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AddInventory;

