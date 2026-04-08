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
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';


export const ViewInventory = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-container">
    <div className="page-header" style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Inventory Database</h2>
      <p style={{ color: 'var(--text-dim)' }}>Complete log of all premium wood door collections and current stock levels.</p>
    </div>
    
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600 }}>Active Stock List</span>
        <button className="btn-ghost" style={{ fontSize: '0.8125rem' }}>Export Data</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--surface-hover)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
            <th style={{ padding: '16px 24px' }}>Item Name</th>
            <th style={{ padding: '16px 24px' }}>Category</th>
            <th style={{ padding: '16px 24px' }}>Quantity</th>
            <th style={{ padding: '16px 24px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '16px 24px' }}>Modern Walnut Door #{i}04</td>
              <td style={{ padding: '16px 24px' }}>Interior</td>
              <td style={{ padding: '16px 24px' }}>12 Units</td>
              <td style={{ padding: '16px 24px' }}>
                <span style={{ backgroundColor: 'var(--primary-low)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem' }}>In Stock</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

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
      const { data } = await api.get(`/users/all?page=${page}&limit=10`);
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Institutional Sync Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-container">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck className="text-primary" size={28} />
            User Management Hub
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '4px' }}>Comprehensive directory of registered artisanal portal identities and service accounts.</p>
        </div>
        
        <div className="search-container" style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            placeholder="Search identity or direct line..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '12px 16px 12px 42px', 
              borderRadius: '14px', 
              border: '1px solid var(--border-light)', 
              background: 'var(--surface)',
              color: 'var(--text-main)',
              width: '320px',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
      </div>
      
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={20} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 600 }}>Institutional Stakeholders</span>
            <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'var(--primary-low)', color: 'var(--primary)', borderRadius: '20px', fontWeight: 700, border: '1px solid var(--border-primary)' }}>
              {filteredUsers.length} ACTIVE ENTITIES
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
             <button className="btn-ghost" style={{ fontSize: '0.8125rem' }}>Refresh Registry</button>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-darker)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
                <th style={{ padding: '18px 24px' }}>Identity Descriptor</th>
                <th style={{ padding: '18px 24px' }}>Direct Communication</th>
                <th style={{ padding: '18px 24px' }}>Verification State</th>
                <th style={{ padding: '18px 24px' }}>Registry Integration</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  <div className="animate-pulse">Parsing institutional data nodes...</div>
                </td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No matching identities identified in the current sector.
                </td></tr>
              ) : filteredUsers.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-low)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700 }}>
                        {(user.name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{user.name || 'Artisan Entity'}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={12} /> {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <div style={{ padding: '6px', borderRadius: '8px', background: 'var(--surface-hover)' }}>
                        <Phone size={14} />
                      </div>
                      {user.phone || 'System link pending'}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    {user.isProfileComplete ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#166534', padding: '6px 14px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                        <CheckCircle2 size={14} /> Full Clearance
                      </div>
                    ) : (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234, 179, 8, 0.08)', color: '#854d0e', padding: '6px 14px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                        <XCircle size={14} /> Profile Fragmented
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      <CalendarDays size={14} />
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      const { data } = await api.get(`/inquiries/all?page=${page}&limit=10`);
      console.log(data);
      if (data.success) {
        setInquiries(data.inquiries);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Institutional Inquiry sync failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.door?.doorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-container">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MessageSquare className="text-primary" size={28} />
            Inquiry Hub
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '4px' }}>Real-time stream of artisanal door requests and institutional communication nodes.</p>
        </div>
        
        <div className="search-container" style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            placeholder="Filter by artisan or collection..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '12px 16px 12px 42px', 
              borderRadius: '14px', 
              border: '1px solid var(--border-light)', 
              background: 'var(--surface)',
              color: 'var(--text-main)',
              width: '320px',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>
      </div>
      
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ClipboardList size={20} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 600 }}>Active Requests</span>
            <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'var(--primary-low)', color: 'var(--primary)', borderRadius: '20px', fontWeight: 700, border: '1px solid var(--border-primary)' }}>
              {filteredInquiries.length} LOGGED SESSIONS
            </span>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-darker)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
                <th style={{ padding: '18px 24px', textAlign: 'left' }}>Artisan Identity</th>
                <th style={{ padding: '18px 24px', textAlign: 'left' }}>Selected Collection</th>
                <th style={{ padding: '18px 24px', textAlign: 'left' }}>Registry Date</th>
                <th style={{ padding: '18px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  <div className="animate-pulse">Retrieving communication buffers...</div>
                </td></tr>
              ) : filteredInquiries.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No active inquiries detected in the current sector.
                </td></tr>
              ) : filteredInquiries.map(inq => (
                <tr key={inq._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{inq.user?.name || 'Anonymous Artisan'}</span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.875rem' }}>
                      <Tag size={12} />
                      {inq.door?.doorName || <span style={{ color: 'var(--text-dim)' }}>Legacy Entry</span>}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      <CalendarDays size={14} />
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button 
                        onClick={() => navigate(`/inquiries/${inq._id}`)}
                        className="btn-ghost" 
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: '6px 14px', 
                          border: '1px solid var(--border-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          letterSpacing: '0.05em',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      >
                        Institutional Dive <ExternalLink size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
