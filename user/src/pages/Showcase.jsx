import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Package, ArrowRight, Lock, Unlock, Search, Tag, PackageSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

// Institutional Assets (Used for High-Fidelity Previews)
import blackOak from '../assets/black_oak.png';

import './Showcase.css';

const Showcase = () => {
  const [doors, setDoors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const navigate = useNavigate();

  // Identity Presence Check
  const token = localStorage.getItem('auth_token');
  const isAuthenticated = !!token;

  // Institutional Dummy Matrix (Guest Discovery Preview)
  const dummyDoors = [
    { _id: 'd1', doorName: 'Artisanal Entity A-101', doorImage: blackOak, amount: '---', category: 'Premium', isDummy: true },
    { _id: 'd2', doorName: 'Historical Portal H-502', doorImage: blackOak, amount: '---', category: 'Vintage', isDummy: true },
    { _id: 'd3', doorName: 'Minimalist Monolith M-303', doorImage: blackOak, amount: '---', category: 'Modern', isDummy: true },
    { _id: 'd4', doorName: 'Institutional Entry I-909', doorImage: blackOak, amount: '---', category: 'Bespoke', isDummy: true },
    { _id: 'd5', doorName: 'Civic Masterpiece C-707', doorImage: blackOak, amount: '---', category: 'Structural', isDummy: true },
    { _id: 'd6', doorName: 'Palatial Entrance P-111', doorImage: blackOak, amount: '---', category: 'Historical', isDummy: true }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchDoors(pagination.page);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, pagination.page]);

  const fetchDoors = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/doors?page=${page}&limit=12`);
      if (data.success) {
        setDoors(data.data);
        setPagination(data.pagination);
      } else {
        setDoors([]);
      }
    } catch (error) {
      console.error('Showcase synchronization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Data Matrix Selection (Real vs Dummy)
  const displayData = isAuthenticated ? doors : dummyDoors;

  // Local Filtering for Search
  const filteredData = displayData.filter(door =>
    door.doorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  if (isLoading) {
    return (
      <div className="showcase-loading">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p>Synchronizing Discovery Matrix...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`showcase-container ${!isAuthenticated ? 'guest-mode' : 'museum-mode'}`}
    >
      {/* Cinematic Discovery Header */}
      <header className="showcase-header">
        <div className="header-content-premium">
           <div className="header-info">
              <motion.div {...fadeInUp}>
                 <span className="section-label-mono">
                   {isAuthenticated ? 'Authenticated Museum Access' : 'Institutional Discovery Preview'}
                 </span>
                 <h1 className="playfair-title">
                   {isAuthenticated ? 'The Museum of Artisanal Entrances' : 'Discover the Future of Entry'}
                 </h1>
                 <p className="subtitle-premium">
                   {isAuthenticated
                     ? 'Welcome to the full artisanal repository. Explore high-fidelity visuals and technical specifications.'
                     : 'Identity authentication required for full visual and pricing exploration.'}
                 </p>
              </motion.div>
           </div>

           <div className="header-actions">
              {!isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/auth/login')}
                  className="auth-focal-btn glass-card"
                >
                  <Unlock size={18} />
                  <span>Verify Identity to Unlock</span>
                </motion.button>
              ) : (
                <div className="search-bar-premium glass-card">
                   <Search size={18} className="text-dim" />
                   <input
                     type="text"
                     placeholder="Search the museum..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
              )}
           </div>
        </div>
      </header>

      {/* Discovery Grid Layer */}
      <section className="museum-grid-container">
        {filteredData.length > 0 ? (
          <div className="discovery-grid">
            {filteredData.map((entry, index) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`masterpiece-card glass-card ${!isAuthenticated ? 'locked-exhibit' : ''}`}
                onClick={() => isAuthenticated ? navigate(`/spotlight/${entry._id}`) : navigate('/auth/login')}
              >
                {!isAuthenticated && <div className="lock-overlay"><Lock size={24} /></div>}

                <div className="card-image-wrapper">
                  <img
                    src={entry.doorImage}
                    alt={entry.doorName}
                    loading="lazy"
                    className={!isAuthenticated ? 'guest-blur' : ''}
                  />
                  <div className="card-overlay-standard">
                     <div className="inspect-badge">
                        {isAuthenticated ? 'EXPLORE CRAFTSMANSHIP' : 'AUTHORIZE IDENTITY'} <ArrowRight size={14} />
                     </div>
                  </div>
                </div>

                <div className="card-content-premium">
                  <div className="card-meta">
                     <span className="collection-tag"><Tag size={10} /> {entry.category || 'ARTISANAL SERIES'}</span>
                  </div>
                  <h3 className="masterpiece-name">{entry.doorName}</h3>
                  <div className="card-footer-luxury">
                     <div className="valuation">
                        <span className="label">Investment</span>
                        <span className="amount">
                           {isAuthenticated ? `₹${entry.amount.toLocaleString()}` : 'Locked'}
                        </span>
                     </div>
                     {!isAuthenticated ? (
                        <div className="status-indicator">
                           <Lock size={12} /> RESTRICTED
                        </div>
                     ) : (
                        <div className="status-indicator">
                           <div className="dot"></div> SYNCED
                        </div>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-records-cinematic glass-card">
            <PackageSearch size={64} className="text-primary-low" />
            <h2 className="playfair-title" style={{ fontSize: '2rem' }}>No Masterpieces Identified</h2>
            <p>Try refining your search parameters in our institutional discovery matrix.</p>
            <button onClick={() => setSearchTerm('')} className="btn-ghost" style={{ marginTop: '24px' }}>Reset Filters</button>
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
      </section>
    </motion.div>
  );
};

export default Showcase;
