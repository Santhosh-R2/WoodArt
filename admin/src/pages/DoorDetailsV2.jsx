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
  Camera,
  Layers,
  AlertTriangle,
  DoorOpen,
  ChevronLeft,
  Settings,
  MoreVertical
} from 'lucide-react';
import './DoorDetailsV2.css';

import api from '../utils/api';

const DoorDetailsV2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [door, setDoor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
      setTimeout(() => setIsLoading(false), 1000); // Cinematic transition
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
    setIsSaving(true);
    try {
      const response = await api.put(`/doors/${id}`, editData);
      const data = response.data;
      if (data.success) {
        setDoor(data.data);
        setIsEditing(false);
        setStatus({ type: 'success', message: 'Institutional Registry Synchronized.' });
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to synchronize registry.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/doors/${id}`);
      navigate('/inventory/view');
    } catch (error) {
      setStatus({ type: 'error', message: 'Purge operation failed.' });
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading && !door) {
    return (
      <div className="loading-portal">
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Calibrating Asset Perspective...</p>
      </div>
    );
  }

  return (
    <div className="gallery-v2-container">
      {/* 50/50 Split Layout */}
      <div className="split-view">

        {/* Left: Cinematic Asset Anchor */}
        <section className="asset-side-anchor">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hero-image-v2-wrapper"
          >
            <img
              src={isEditing ? editData.doorImage : door.doorImage}
              alt={door.doorName}
              className="v2-prime-shot"
            />
            <div className="v2-lighting-gradient" />

            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="v2-image-trigger"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={24} />
                  <span>Update Visual</span>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="institution-badge-v2">
              <ShieldCheck size={14} />
              <span>REGISTRY ID: {door._id.slice(-6).toUpperCase()}</span>
            </div>
          </motion.div>
        </section>

        {/* Right: Instrumentation Column */}
        <section className="instrument-side-pane">
          {/* Top Command Navigation */}
          <nav className="v2-top-command">
            <button onClick={() => navigate('/inventory/view')} className="v2-back-circle">
              <ChevronLeft size={20} />
            </button>

            <div className="v2-action-group">
              {!isEditing ? (
                <>
                  <button onClick={() => setIsEditing(true)} className="v2-btn-edit">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => setShowDeleteModal(true)} className="v2-btn-purge">
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <div className="v2-edit-controls">
                  <button onClick={() => setIsEditing(false)} className="v2-btn-discard">
                    <X size={16} />
                  </button>
                  <button onClick={handleUpdate} className="v2-btn-commit" disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    <span>{isSaving ? 'COMMITTING...' : 'COMMIT'}</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="v2-metadata-content">
            <header className="v2-header-block">
              <div className="v2-tag-label">Artisanal Masterpiece</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.doorName}
                  onChange={(e) => setEditData({ ...editData, doorName: e.target.value })}
                  className="v2-title-input"
                  placeholder="Designation..."
                />
              ) : (
                <h1 className="v2-archival-title">{door.doorName}</h1>
              )}
            </header>

            <div className="v2-valuation-node glass-card">
              <div className="node-label">Market Valuation</div>
              <div className="node-value-box">
                {isEditing ? (
                  <div className="v2-price-edit">
                    <span className="v2-curr">₹</span>
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                      className="v2-amount-input"
                    />
                  </div>
                ) : (
                  <span className="v2-amount-static">₹{door.amount.toLocaleString()}</span>
                )}
                <div className="v2-status-pill">
                  <div className="v2-dot"></div>
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="v2-narrative-node">
              <div className="v2-tag-label">Technical Insight</div>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="v2-narrative-textarea"
                />
              ) : (
                <p className="v2-narrative-text">{door.description}</p>
              )}
            </div>

            {/* <div className="v2-attribute-matrix">
              <div className="v2-matrix-item glass-card">
                <Layers size={18} className="text-primary" />
                <div className="item-labels">
                  <label>Material Context</label>
                  <span>Premium Structural Timber</span>
                </div>
              </div>
              <div className="v2-matrix-item glass-card">
                <ShieldCheck size={18} className="text-primary" />
                <div className="item-labels">
                  <label>Security Standard</label>
                  <span>Reinforced Institutional Core</span>
                </div>
              </div>
              <div className="v2-matrix-item glass-card">
                <Settings size={18} className="text-primary" />
                <div className="item-labels">
                  <label>Service Status</label>
                  <span>Optimized Registry</span>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="v2-modal-overlay">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="v2-modal glass-card"
            >
              <div className="v2-caution-icon">
                <AlertTriangle size={40} />
              </div>
              <h3>Confirm Registry Purge?</h3>
              <p>You are about to permanently decommission <strong>{door.doorName}</strong>. This is a non-reversible operation.</p>
              <div className="v2-modal-actions">
                <button onClick={() => setShowDeleteModal(false)} className="v2-modal-cancel">
                  ABORT
                </button>
                <button onClick={handleDelete} className="v2-modal-purge">
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "PURGE ASSET"}
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
            className={`v2-toast ${status.type}`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoorDetailsV2;
