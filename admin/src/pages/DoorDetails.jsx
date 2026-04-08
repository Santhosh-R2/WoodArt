import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Save,
  X,
  Loader2,
  ShieldCheck,
  Package,
  DollarSign,
  FileText,
  Camera,
  Layers,
  Maximize2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import './DoorDetails.css';

import api from '../utils/api';

const DoorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [door, setDoor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  const fileInputRef = React.useRef(null);

  useEffect(() => {
    fetchDoorDetails();
  }, [id]);

  const fetchDoorDetails = async () => {
    try {
      const response = await api.get(`/doors/${id}`);
      const data = response.data;
      if (data.success) {
        setDoor(data.data);
        setEditData(data.data);
      } else {
        navigate('/inventory/view');
      }
    } catch (error) {
      console.error('Error fetching door details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, doorImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(`/doors/${id}`, editData);
      const data = response.data;
      if (data.success) {
        setDoor(data.data);
        setIsEditing(false);
        setStatus({ type: 'success', message: 'Registry updated with precision.' });
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to synchronize metadata.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/doors/${id}`);
      const data = response.data;
      if (data.success) {
        navigate('/inventory/view');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to purge artisanal entry.' });
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading && !door) {
    return (
      <div className="loading-portal">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p>Synchronizing Institutional Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="details-container"
    >
      {/* Precision Navigation */}
      <nav className="details-nav">
        <button onClick={() => navigate('/inventory/view')} className="btn-back">
          <ArrowLeft size={18} />
          <span>Inventory Catalogue</span>
        </button>

        <div className="admin-actions">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="btn-edit">
                <Edit3 size={18} />
                <span>Modify Entry</span>
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)} 
                className="btn-delete"
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <div className="edit-controls">
              <button onClick={() => setIsEditing(false)} className="btn-ghost">
                <X size={18} />
                <span>Discard</span>
              </button>
              <button onClick={handleUpdate} className="btn-save">
                <Save size={18} />
                <span>Commit Changes</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="details-grid">
        {/* Cinematic Asset Visualization */}
        <section className="image-frame">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ height: '100%', position: 'relative' }}
          >
            <img src={isEditing ? editData.doorImage : door.doorImage} alt={door.doorName} className="hero-image" />
            <div className="frame-overlay" />
            
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="upload-overlay"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-content">
                    <Camera size={32} />
                    <span>Upload New Masterpiece Shot</span>
                  </div>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="badge-overlay">
              <ShieldCheck size={14} />
              <span>Institutional Certificate</span>
            </div>
          </motion.div>
        </section>

        {/* Technical Registry Pane */}
        <section className="specs-pane">
          <div className="spec-content">
            <header className="spec-header">
              <div className="title-block">
                {isEditing ? (
                  <div className="edit-container">
                    <label className="edit-label">Artisanal Designation</label>
                    <input
                      type="text"
                      value={editData.doorName}
                      onChange={(e) => setEditData({ ...editData, doorName: e.target.value })}
                      className="edit-input title-input"
                      placeholder="Masterpiece Designation..."
                    />
                  </div>
                ) : (
                  <h3>{door.doorName}</h3>
                )}
              </div>
            </header>

            <div className="price-matrix">
              <div className="price-label">Assessed Market Value</div>
              {isEditing ? (
                <div className="price-input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                    className="edit-input valuation-input"
                    placeholder="0"
                  />
                </div>
              ) : (
                <div className="static-value price">₹{door.amount.toLocaleString()}</div>
              )}
            </div>

            <div className="technical-insight">
              {isEditing ? (
                <div className="edit-container" style={{ marginTop: '24px' }}>
                  <label className="edit-label">Technical Insight & Soul</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="edit-input textarea"
                    placeholder="Describe the craftsmanship..."
                  />
                </div>
              ) : (
                <>
                  <h3>Technical Insight & Soul</h3>
                  <p className="description-text">{door.description}</p>
                </>
              )}
            </div>

            {/* <div className="specification-grid">
              <div className="spec-item glass-card">
                <Layers size={16} />
                <div className="item-details">
                  <label>Material Context</label>
                  <span>Institutional Grade Timber</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <ShieldCheck size={16} />
                <div className="item-details">
                  <label>Security Standard</label>
                  <span>Certified Reinforced Core</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <Maximize2 size={16} />
                <div className="item-details">
                  <label>Service Registry</label>
                  <span>Artisanal Maintenance Plan</span>
                </div>
              </div>
              <div className="spec-item glass-card">
                <Clock size={16} />
                <div className="item-details">
                  <label>Creation Cycle</label>
                  <span>Bespoke on Inquiry</span>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
            >
              <div className="modal-icon">
                <AlertTriangle size={32} />
              </div>
              <h2>Purge Artisanal Entry?</h2>
              <p>This action will permanently remove <strong>{door.doorName}</strong> from the institutional registry. This cannot be undone.</p>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="btn-ghost">
                  Keep Entry
                </button>
                <button onClick={handleDelete} className="btn-delete" style={{ background: '#ff4444', color: '#fff' }}>
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Definitive Purge"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Status Toast */}
      <AnimatePresence>
        {status.message && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`toast ${status.type}`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DoorDetails;
