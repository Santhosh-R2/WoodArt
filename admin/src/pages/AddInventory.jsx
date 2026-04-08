import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackagePlus, Loader2, CheckCircle2, AlertCircle, ImageIcon, X } from 'lucide-react';
import './AddInventory.css';

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
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        setStatus({ type: 'error', message: 'Image size exceeds 50MB limit.' });
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
      setStatus({ type: 'error', message: 'Please upload a door image.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/doors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          doorImage: preview
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Door added successfully to inventory.' });
        setFormData({ doorName: '', amount: '', description: '' });
        setPreview('');
        setImage(null);
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to add door.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Server connection failed. Is the backend running?' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="add-inventory-container"
    >
      <div className="inventory-header">
        <h1>Register New Stock</h1>
        <p>Expertly document your latest high-end craftsmanship entries.</p>
      </div>

      <form onSubmit={handleSubmit} className="inventory-form">
        {/* Messaging Area - High Priority Top Placement */}
        <AnimatePresence>
          {status.message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`status-message top ${status.type}`}
            >
              {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="form-sections-grid">
          {/* Left: Metadata Form */}
          <div className="metadata-pane glass-card">
            <h3 className="section-title">Essential Metadata</h3>
            
            <div className="input-group">
              <input
                type="text"
                name="doorName"
                value={formData.doorName}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Inventory Item Name (e.g., Majestic Walnut)</label>
            </div>

            <div className="input-group">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Market Value (Amount)</label>
            </div>

            <div className="input-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Craftsmanship Highlights & Specification</label>
            </div>
          </div>

          {/* Right: Asset Upload */}
          <div className="assets-pane glass-card">
            <h3 className="section-title">Visual Documentation</h3>
            
            <div className={`upload-zone ${preview ? 'has-preview' : ''}`}>
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Upload Preview" />
                  <button type="button" onClick={clearImage} className="clear-image">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <input type="file" onChange={handleImageChange} accept="image/*" hidden />
                  <div className="upload-icon">
                    <ImageIcon size={48} />
                  </div>
                  <span>Select Artisanal Shot</span>
                  <p>JPG, PNG or WEBP (Max 50MB)</p>
                </label>
              )}
            </div>
          </div>
        </div>


        {/* Global Action Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="btn-primary submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Synchronizing...</span>
              </>
            ) : (
              <>
                <PackagePlus size={24} />
                <span>Register to Inventory</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddInventory;
