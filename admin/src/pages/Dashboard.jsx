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
  Loader2,Info
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
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Synchronizing Artisanal Command...</p>
      </div>
    );
  }

  const { stats, recentActivity } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="dashboard-executive-wrapper"
    >
      {/* Prime Header: Operational Identity */}
      <header className="executive-header">
        <div className="identity-block">
          <h1 className="archival-title">Executive Command</h1>
          <p className="status-meta">Institutional Woodwork Oversight Registry</p>
        </div>
        <div className="realtime-sync">
          <div className="sync-pulse"></div>
          <span>Active Synchronization</span>
        </div>
      </header>

      {/* Hero Metrics: Focus on Action */}
      <section className="command-hero-grid">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="hero-node glass-card highlight"
          onClick={() => navigate('/inquiries')}
        >
          <div className="hero-data">
            <div className="hero-label">
              <MessageSquare size={14} className="text-primary" />
              <span>Priority Oversight</span>
            </div>
            <h2>{stats?.pendingInquiries || 0}</h2>
            <p className="hero-description">Pending Institutional Inquiries awaiting orchestration.</p>
          </div>
          <div className="hero-visual">
            <div className="visual-circle"></div>
            <MessageSquare size={64} className="visual-icon" />
          </div>
        </motion.div>

        <div className="support-nodes">
          <motion.div whileHover={{ x: 8 }} className="support-node glass-card">
            <div className="support-icon"><Users size={20} /></div>
            <div className="support-content">
              <label>Artisan Core</label>
              <div className="support-value">
                <h3>{stats?.totalArtisans || 0}</h3>
                <span>Identities</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ x: 8 }} 
            className="support-node glass-card clickable"
            onClick={() => navigate('/inventory/view')}
          >
            <div className="support-icon"><DoorOpen size={20} /></div>
            <div className="support-content">
              <label>Inventory Depth</label>
              <div className="support-value">
                <h3>{stats?.totalCollections || 0}</h3>
                <span>Masterpieces</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Orchestration Grid */}
      <main className="orchestration-grid">
        {/* Left: Pulse of the Registry */}
        <div className="orchestration-column">
          <div className="column-header">
            <Activity size={16} className="text-primary" />
            <div className="header-info">
              <h3>Institutional Pulse</h3>
              <div className="line-lock"></div>
            </div>
          </div>

          <div className="entry-stack">
            {recentActivity.length === 0 ? (
              <div className="empty-registry-professional glass-card">
                <div className="status-orbit">
                  <Activity size={32} className="heartbeat-icon" />
                </div>
                <div className="status-text">
                  <h4>Registry Optimized</h4>
                  <p>All artisanal synchronizations are current. No pending institutional activity logged.</p>
                </div>
              </div>
            ) : recentActivity.slice(0, 4).map((activity, idx) => (
              <motion.div 
                key={activity._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="registry-entry glass-card"
                onClick={() => navigate(`/inquiries/${activity._id}`)}
              >
                <div className="entry-main">
                  <div className="entry-identity">
                    <span className="user-name">{activity.user?.name || 'Artisan Identity'}</span>
                    <span className="user-action">Inquiry</span>
                  </div>
                  <div className="entry-interest">
                    Interested in <span className="door-highlight">{activity.door?.doorName || 'Legacy Asset'}</span>
                  </div>
                </div>
                <div className="entry-meta">
                  <span>{new Date(activity.createdAt).toLocaleDateString()}</span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Command Shortcuts */}
        <div className="orchestration-column">
          <div className="column-header">
            <ShieldCheck size={16} className="text-primary" />
            <div className="header-info">
              <h3>Registry Operations</h3>
              <div className="line-lock"></div>
            </div>
          </div>

          <div className="command-stack">
            <button onClick={() => navigate('/inventory/add')} className="command-card glass-card">
              <div className="command-icon-box"><DoorOpen size={20} /></div>
              <div className="command-labels">
                <span>Catalogue Asset</span>
                <p>Register masterpiece specifications</p>
              </div>
              <ArrowUpRight size={16} className="command-arrow" />
            </button>
            
            <button onClick={() => navigate('/users/manage')} className="command-card glass-card">
              <div className="command-icon-box"><Users size={20} /></div>
              <div className="command-labels">
                <span>Manage Artisans</span>
                <p>Institutional identity oversight</p>
              </div>
              <ArrowUpRight size={16} className="command-arrow" />
            </button>
            
            <button onClick={() => navigate('/inquiries')} className="command-card glass-card">
              <div className="command-icon-box"><MessageSquare size={20} /></div>
              <div className="command-labels">
                <span>Sync Inquiries</span>
                <p>Pending orchestration review</p>
              </div>
              <ArrowUpRight size={16} className="command-arrow" />
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};


export default Dashboard;
