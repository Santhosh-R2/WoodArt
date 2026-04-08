import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  DoorOpen, 
  ChevronRight, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

import api from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: null, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      const result = response.data;
      if (result.success) {
        setData({ stats: result.stats, recentActivity: result.recentActivity });
      }
    } catch (error) {
      console.error("Institutional Intelligence Sync failure:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-portal">
         <Loader2 size={48} className="animate-spin text-primary" />
         <p>Synchronizing Institutional Pulse...</p>
      </div>
    );
  }

  const { stats, recentActivity } = data;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="dashboard-content-wrapper"
    >
      {/* Cinematic Header */}
      <div className="dashboard-header-premium">
        <div>
          <h2 className="playfair-title">Artisanal Registry Command</h2>
          <p className="subtitle-mono">Operational summary of the woodwork institutional ecosystem.</p>
        </div>
        <div className="system-status-pill">
           <span className="pulse-dot"></span>
           Institutional Sync Operational
        </div>
      </div>

      {/* Stats Matrix */}
      <div className="stats-matrix">
        <motion.div whileHover={{ y: -5 }} className="stat-node glass-card">
          <div className="node-icon"><Users size={20} /></div>
          <div className="node-data">
            <label>Artisan Core</label>
            <h3>{stats?.totalArtisans || 0}</h3>
            <span>Registered Identities</span>
          </div>
          <div className="node-trend positive"><ArrowUpRight size={14} /> ACTIVE</div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="stat-node glass-card active">
          <div className="node-icon"><MessageSquare size={20} /></div>
          <div className="node-data">
            <label>Inquiry Queue</label>
            <h3>{stats?.pendingInquiries || 0}</h3>
            <span>Requires Oversight</span>
          </div>
          {stats?.pendingInquiries > 0 && <div className="node-alert">ACTION REQUIRED</div>}
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="stat-node glass-card">
          <div className="node-icon"><DoorOpen size={20} /></div>
          <div className="node-data">
            <label>Inventory Depth</label>
            <h3>{stats?.totalCollections || 0}</h3>
            <span>Masterpiece Entries</span>
          </div>
          <button onClick={() => navigate('/inventory/view')} className="node-link"><ExternalLink size={14} /></button>
        </motion.div>
      </div>

      <div className="dashboard-main-grid">
        {/* Activity Feed */}
        <div className="activity-feed-section">
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={18} className="text-primary" />
              <h3>Institutional Feed</h3>
            </div>
            <button onClick={() => navigate('/inquiries')} className="view-all-link">View Registry <ChevronRight size={14} /></button>
          </div>

          <div className="activity-list">
            {recentActivity.length === 0 ? (
              <div className="empty-feed">No recent artisanal activity logged.</div>
            ) : recentActivity.map((activity, idx) => (
              <motion.div 
                key={activity._id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="activity-item glass-card"
                onClick={() => navigate(`/inquiries/${activity._id}`)}
              >
                <div className="activity-indicator" style={{ backgroundColor: activity.status === 'pending' ? '#facc15' : '#4ade80' }}></div>
                <div className="activity-main">
                   <div className="activity-title">{activity.user?.name || 'Anonymous'} requested <span className="text-primary">{activity.door?.doorName || 'Legacy Entry'}</span></div>
                   <div className="activity-meta"><Clock size={12} /> {new Date(activity.createdAt).toLocaleString()}</div>
                </div>
                <ChevronRight size={16} className="activity-arrow" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="shortcuts-section">
           <div className="section-header">
              <h3>Institutional Node Access</h3>
           </div>
           <div className="shortcut-grid">
              <button onClick={() => navigate('/inventory/add')} className="shortcut-button glass-card">
                <div className="shortcut-icon"><DoorOpen /></div>
                <span>Catalog New Masterpiece</span>
              </button>
              <button onClick={() => navigate('/users/manage')} className="shortcut-button glass-card">
                <div className="shortcut-icon"><Users /></div>
                <span>Manage Artisan Base</span>
              </button>
              <button onClick={() => navigate('/inquiries')} className="shortcut-button glass-card">
                <div className="shortcut-icon"><MessageSquare /></div>
                <span>Registry Review</span>
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
