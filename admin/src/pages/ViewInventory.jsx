import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2, ArrowRight, PackageSearch, Tag } from 'lucide-react';
import api from '../utils/api';
import './ViewInventory.css';

const ViewInventory = () => {
  const [doors, setDoors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoors(pagination.page);
  }, [pagination.page]);

  const fetchDoors = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/doors?page=${page}&limit=12`);
      if (data.success) {
        setDoors(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Institutional Registry Sync failure:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDoors = doors.filter(door =>
    door.doorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="loading-portal">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p>Synchronizing Stock Registry...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="view-inventory-container"
    >
      <div className="view-header-premium">
        <div className="header-info">
          <h1 className="playfair-title">Institutional Collection</h1>
          <p className="subtitle-mono">Managing {doors.length} active masterpiece registries in the luxury timber sector.</p>
        </div>

        <div className="search-bar-premium glass-card">
          <Search size={18} className="text-dim" />
          <input
            type="text"
            placeholder="Search artisanal masterpiece..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredDoors.length > 0 ? (
        <div className="doors-grid-premium">
          {filteredDoors.map((door, index) => (
            <motion.div
              key={door._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="masterpiece-card glass-card"
              onClick={() => navigate(`/inventory/view/${door._id}`)}
            >
              <div className="card-image-wrapper">
                <img src={door.doorImage} alt={door.doorName} loading="lazy" />
                <div className="card-overlay-standard">
                   <div className="inspect-badge">
                      SPECIFICATION OVERVIEW <ArrowRight size={14} />
                   </div>
                </div>
              </div>

              <div className="card-content-premium">
                <div className="card-meta">
                   <span className="collection-tag"><Tag size={10} /> ARTISANAL SERIES</span>
                </div>
                <h3 className="masterpiece-name">{door.doorName}</h3>
                <div className="card-footer-luxury">
                   <div className="valuation">
                      <span className="label">Valuation</span>
                      <span className="amount">₹{door.amount.toLocaleString()}</span>
                   </div>
                   <div className="status-indicator">
                      <div className="dot"></div> REGISTRY ACTIVE
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="no-records-cinematic glass-card">
          <PackageSearch size={64} className="text-primary-low" />
          <h2 className="playfair-title" style={{ fontSize: '2rem' }}>No Masterpieces Identified</h2>
          <p>Try refining your institutional search parameters or integrate new entries via the Inventory Node.</p>
          <button onClick={() => setSearchTerm('')} className="btn-ghost" style={{ marginTop: '24px' }}>Clear Search Node</button>
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="pagination-premium glass-card">
          <button 
            disabled={pagination.page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            className="pagination-btn"
          >
            PREVIOUS
          </button>
          <div className="page-indicator">
            Node {pagination.page} of {pagination.pages}
          </div>
          <button 
            disabled={pagination.page === pagination.pages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            className="pagination-btn"
          >
            NEXT
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ViewInventory;
