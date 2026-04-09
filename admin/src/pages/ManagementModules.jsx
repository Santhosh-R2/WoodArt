import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PackagePlus, 
  Info, 
  Users, 
  Search, 
  Mail, 
  Phone, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  CalendarDays,
  MessageSquare,
  Tag,
  CreditCard,
  ClipboardList,
  ExternalLink,
  DoorOpen,
  ChevronRight,
  RefreshCw,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './ManagementModules.css';

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchUsers(pagination.page);
  }, [pagination.page]);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/all?page=${page}&limit=12`);
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Institutional Sync Failed:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <div className="loading-portal">
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Synchronizing Institutional Identities...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="identity-hub-wrapper"
    >
      <header className="identity-hub-header">
        <div className="identity-header-main">
          <h1 className="archival-title">Identity Hub</h1>
          <p className="status-meta">Institutional User Registry • {pagination.total} Clearance Profiles</p>
        </div>

        <div className="hub-command-center">
          <div className="hub-search glass-card">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search identity signature..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => fetchUsers(pagination.page)} className="hub-refresh-btn glass-card">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>
      
      <main className="registry-table-orchestration glass-card">
        <div className="table-header-locks">
          <div className="lock-label">Identity Portfolio</div>
          <div className="lock-label">Communication Channel</div>
          <div className="lock-label">Clearance State</div>
          <div className="lock-label">Integration Date</div>
        </div>

        <div className="identity-stack">
          {filteredUsers.length === 0 ? (
            <div className="empty-registry-placeholder">
              <Users size={48} className="opacity-20" />
              <p>No artisanal identities matching those signatures identify in this sector.</p>
            </div>
          ) : filteredUsers.map(user => (
            <motion.div 
              key={user._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="identity-node"
            >
              <div className="node-identity">
                <div className="identity-avatar">
                  {(user.name || user.email || '?').charAt(0).toUpperCase()}
                </div>
                <div className="identity-info">
                  <span className="identity-name">{user.name || 'Artisan Identity'}</span>
                  <span className="identity-id">UID-{user._id.slice(-6).toUpperCase()}</span>
                </div>
              </div>

              <div className="node-contact">
                <div className="contact-item">
                  <Mail size={14} className="text-primary" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="node-clearance">
                {user.isProfileComplete ? (
                  <div className="clearance-badge high">
                    <CheckCircle2 size={12} />
                    <span>FULL CLEARANCE</span>
                  </div>
                ) : (
                  <div className="clearance-badge low">
                    <XCircle size={12} />
                    <span>FRAGMENTED</span>
                  </div>
                )}
              </div>

              <div className="node-integration">
                <span>{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
              </div>

            </motion.div>
          ))}
        </div>
      </main>

      {/* Pagination Module */}
      {pagination.pages > 1 && (
        <footer className="hub-pagination-instrumentation">
          <button 
            disabled={pagination.page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            className="instr-btn"
          >
            PREV SECTOR
          </button>
          <div className="instr-summary">
            IDENTITY PAGE <span>{pagination.page}</span> OF <span>{pagination.pages}</span>
          </div>
          <button 
            disabled={pagination.page === pagination.pages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            className="instr-btn"
          >
            NEXT SECTOR
          </button>
        </footer>
      )}
    </motion.div>
  );
};

export const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries(pagination.page);
  }, [pagination.page]);

  const fetchInquiries = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/inquiries/all?page=${page}&limit=12`);
      if (data.success) {
        setInquiries(data.inquiries);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Institutional Inquiry sync failed:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.door?.doorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && inquiries.length === 0) {
    return (
      <div className="loading-portal">
        <div className="loader-icon-wrapper">
          <Loader2 size={120} className="animate-spin text-primary opacity-20" strokeWidth={1} />
          <DoorOpen size={48} className="door-loader-icon" strokeWidth={1.5} />
        </div>
        <p>Retrieving Communication Buffers...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="inquiry-hub-wrapper"
    >
      <header className="identity-hub-header">
        <div className="identity-header-main">
          <h1 className="archival-title">Inquiry Hub</h1>
          <p className="status-meta">Artisanal Acquisition Stream • {pagination.total} Logged Requests</p>
        </div>

        <div className="hub-command-center">
          <div className="hub-search glass-card">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Filter by artisan or collection..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => fetchInquiries(pagination.page)} className="hub-refresh-btn glass-card">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>
      
      <main className="registry-table-orchestration glass-card">
        <div className="inquiry-header-locks">
          <div className="lock-label">Artisan Identity</div>
          <div className="lock-label">Target Asset</div>
          <div className="lock-label">Registry Date</div>
          <div className="lock-label">Operational State</div>
          <div className="lock-label">Actions</div>
        </div>

        <div className="identity-stack">
          {filteredInquiries.length === 0 ? (
            <div className="empty-registry-placeholder">
              <ClipboardList size={48} className="opacity-20" />
              <p>No active inquiries identified within the current sector.</p>
            </div>
          ) : filteredInquiries.map(inq => (
            <motion.div 
              key={inq._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inquiry-node"
            >
              <div className="node-identity">
                <div className="identity-avatar inquiry">
                   {(inq.user?.name || '?').charAt(0).toUpperCase()}
                </div>
                <div className="identity-info">
                  <span className="identity-name">{inq.user?.name || 'Anonymous Artisan'}</span>
                  <span className="identity-id">{inq.user?.email || 'Protocol Gated'}</span>
                </div>
              </div>

              <div className="node-asset">
                <div className="asset-link">
                  <Tag size={12} className="text-primary" />
                  <span>{inq.door?.doorName || 'Legacy Reference'}</span>
                </div>
              </div>

              <div className="node-date">
                <div className="date-item">
                  <CalendarDays size={14} />
                  <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="node-state">
                <div className="state-pulse">
                  <div className="pulse-dot active"></div>
                  <span>PENDING REVIEW</span>
                </div>
              </div>

              <div className="node-actions-right">
                <button 
                  onClick={() => navigate(`/inquiries/${inq._id}`)}
                  className="btn-dive-executive"
                >
                  <span>DIVE</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Pagination Module */}
      {pagination.pages > 1 && (
        <footer className="hub-pagination-instrumentation">
          <button 
            disabled={pagination.page === 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            className="instr-btn"
          >
            BACK SECTOR
          </button>
          <div className="instr-summary">
            INQUIRY BATCH <span>{pagination.page}</span> OF <span>{pagination.pages}</span>
          </div>
          <button 
            disabled={pagination.page === pagination.pages}
             onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            className="instr-btn"
          >
            FORWARD SECTOR
          </button>
        </footer>
      )}
    </motion.div>
  );
};

export const AddUser = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-container">
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em', marginBottom: '4px' }}>Artisan Registry</h2>
        <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Management and verification of institutional woodwork specialists.</p>
      </div>
    
    <div className="glass-card" style={{ padding: '40px', maxWidth: '600px' }}>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
        User registration interface loading...
      </p>
    </div>
  </motion.div>
);
