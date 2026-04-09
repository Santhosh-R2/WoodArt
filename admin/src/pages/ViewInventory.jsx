import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2, ArrowRight, PackageSearch, Tag, DoorOpen } from 'lucide-react';
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
      setTimeout(() => setIsLoading(false), 800); // Cinematic delay
    }
  };

  const filteredDoors = doors.filter(door =>
    door.doorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="loading-portal">
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Synchronizing Stock Registry...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inventory-executive-wrapper"
    >
      {/* Search & Header Orchestration */}
      <header className="inventory-header">
        <div className="header-titles">
          <h1 className="archival-title">Institutional Collection</h1>
          <p className="status-meta">Luxury Timber Asset Registry • {doors.length} Entries</p>
        </div>
        
        <div className="search-intelligence glass-card">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search Intelligence Node..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Registry Grid */}
      <main className="registry-orchestration">
        {filteredDoors.length > 0 ? (
          <div className="masterpiece-grid">
            {filteredDoors.map((door, index) => (
              <motion.div
                key={door._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="masterpiece-node glass-card"
                onClick={() => navigate(`/inventory/view/${door._id}`)}
              >
                <div className="node-preview">
                  <img src={door.doorImage} alt={door.doorName} loading="lazy" />
                  <div className="node-overlay">
                    <div className="inspect-call">
                       <span>INSPECT SPECIFICATIONS</span>
                       <ArrowRight size={14} />
                    </div>
                  </div>
                </div>

                <div className="node-details">
                  <div className="node-meta">
                    <Tag size={10} />
                    <span>Artisanal Series</span>
                  </div>
                  <h3 className="node-title">{door.doorName}</h3>
                  <div className="node-valuation-block">
                    <div className="valuation-details">
                      <label>Market Value</label>
                      <span className="value-amount">₹{door.amount.toLocaleString()}</span>
                    </div>
                    <div className="status-badge">
                      <div className="status-dot"></div>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-registry-professional glass-card">
            <div className="status-orbit">
              <PackageSearch size={32} className="heartbeat-icon" />
            </div>
            <div className="status-text">
              <h4>Asset Data Absent</h4>
              <p>The institutional lookup failed to identify any masterpieces matching those parameters.</p>
              <button onClick={() => setSearchTerm('')} className="btn-primary" style={{ marginTop: '24px', padding: '12px 24px' }}>Reset Node</button>
            </div>
          </div>
        )}
      </main>

      {/* Pagination Instrumentation */}
      {pagination.pages > 1 && (
        <footer className="pagination-instrumentation glass-card">
          <button 
            disabled={pagination.page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            className="instr-btn"
          >
            PREV NODE
          </button>
          <div className="instr-summary">
            REGISTRY PAGE <span>{pagination.page}</span> OF <span>{pagination.pages}</span>
          </div>
          <button 
            disabled={pagination.page === pagination.pages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            className="instr-btn"
          >
            NEXT NODE
          </button>
        </footer>
      )}
    </motion.div>
  );
};

export default ViewInventory;
