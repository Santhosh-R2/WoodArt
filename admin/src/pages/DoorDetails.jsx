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
  AlertTriangle,
  DoorOpen
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
      setTimeout(() => setIsLoading(false), 800); // Cinematic delay
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
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Synchronizing Institutional Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="asset-details-executive"
    >
      {/* Precision Navigation Overlay */}
      <nav className="executive-nav-anchored glass-card">
        <button onClick={() => navigate('/inventory/view')} className="nav-back-btn">
          <ArrowLeft size={16} />
          <span>Institutional Registry</span>
        </button>

        <div className="action-command-group">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="cmd-edit-btn">
                <Edit3 size={16} />
                <span>Modify Specifications</span>
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)} 
                className="cmd-purge-btn"
                title="Purge Entry"
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <div className="edit-orchestration">
              <button onClick={() => setIsEditing(false)} className="btn-ghost-small">
                <X size={16} />
                <span>Discard Changes</span>
              </button>
              <button onClick={handleUpdate} className="btn-save-prime">
                <Save size={16} />
                <span>Commit Registry</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="asset-orchestration-grid">
        {/* Cinematic Frame: Visual Oversight */}
        <section className="asset-visual-frame">
          <div className="museum-display glass-card">
            <motion.div 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-inner"
            >
              <img src={isEditing ? editData.doorImage : door.doorImage} alt={door.doorName} className="primary-asset-shot" />
              <div className="lighting-overlay" />
              
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="visual-update-trigger"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="trigger-content">
                      <Camera size={28} />
                      <span>Update Asset Shot</span>
                    </div>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="institutional-seal">
                <ShieldCheck size={14} />
                <span>CERTIFIED ASSET</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Instrumentation Pane: Metadata Control */}
        <section className="asset-metadata-pane">
          <div className="metadata-scroll-content">
            <header className="metadata-header">
              <div className="context-label">Artisanal Designation</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.doorName}
                  onChange={(e) => setEditData({ ...editData, doorName: e.target.value })}
                  className="executive-field title-field"
                  placeholder="Designation Name..."
                />
              ) : (
                <h2 className="archival-title-medium">{door.doorName}</h2>
              )}
            </header>

            <div className="valuation-suite glass-card">
              <label>Assessed Market Value</label>
              {isEditing ? (
                <div className="input-with-currency">
                  <span>₹</span>
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                    className="executive-field valuation-field"
                    placeholder="0"
                  />
                </div>
              ) : (
                <div className="static-valuation">₹{door.amount.toLocaleString()}</div>
              )}
            </div>

            <div className="technical-soul-block">
              <div className="context-label">Artisanal Narrative & Tech Specs</div>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="executive-field narrative-field"
                  placeholder="Describe the soul of this masterpiece..."
                />
              ) : (
                <p className="narrative-content">{door.description}</p>
              )}
            </div>

            {/* <div className="attribute-matrix-grid">
              <div className="attribute-node glass-card">
                <Layers size={16} />
                <div className="node-info">
                  <label>Material Context</label>
                  <span>Premium Structural Timber</span>
                </div>
              </div>
              <div className="attribute-node glass-card">
                <ShieldCheck size={16} />
                <div className="node-info">
                  <label>Security Phase</label>
                  <span>Reinforced Core (Institutional)</span>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="modal-portal-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-executive glass-card"
            >
              <div className="modal-caution-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>Decommission Asset?</h3>
              <p>This action will permanently purge <strong>{door.doorName}</strong> from the institutional registries. This is a definitive action.</p>
              <div className="modal-command-row">
                <button onClick={() => setShowDeleteModal(false)} className="btn-cancel-instr">
                  ABORT PURGE
                </button>
                <button onClick={handleDelete} className="btn-purge-definitive">
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "CONFIRM PURGE"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistence Notifications */}
      <AnimatePresence>
        {status.message && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`registry-toast ${status.type}`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export default DoorDetails;
