import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  UserPlus, 
  LogOut, 
  DoorOpen,
  ChevronRight,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setShowLogoutModal(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/inventory/add', label: 'Add Entry' },
    { path: '/inventory/view', label: 'Stock Registry' },
    { path: '/users/manage', label: 'Identity Hub' },
    { path: '/inquiries', label: 'Inquiry Hub' },
  ];

  return (
    <div className="admin-container">
      {/* Top Executive Command Bar */}
      <header className="executive-command-bar glass-card">
        <div className="command-bar-inner">
          <div className="nav-left-orchestration">
            <div className="nav-logo-v2" onClick={() => navigate('/dashboard')}>
              <DoorOpen size={22} className="text-primary" />
              <span className="executive-brand">Viswam Carvings</span>
            </div>
            
            <nav className="desktop-navigation">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={({ isActive }) => `executive-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {item.label && <div className="link-indicator" />}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="nav-right-orchestration">
            <div className="executive-profile-node">
              <div className="profile-details">
                <span className="p-name">Super Admin</span>
                <span className="p-role">Portal Master</span>
              </div>
              <div className="profile-hex-avatar">SA</div>
            </div>
            
            <button onClick={() => setShowLogoutModal(true)} className="executive-logout-btn" title="Sign Out">
              <LogOut size={18} />
            </button>

            {/* Mobile Command Toggle */}
            <button 
              className={`mobile-command-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-navigation-overlay glass-card"
          >
            <nav className="mobile-overlay-links">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `mobile-executive-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                className="mobile-terminate-btn"
              >
                Terminate Session
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Viewport */}
      <main className="main-viewport-orchestrated">
        <Outlet />
      </main>

      {/* Institutional Termination Confirmation */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="modal-portal-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-executive-logout glass-card"
            >
              <div className="modal-caution-icon-red">
                <AlertTriangle size={32} />
              </div>
              <h3>Terminate Session?</h3>
              <p>You are about to disconnect from the Artisanal Command Portal. Institutional data synchronization will be suspended until re-authentication.</p>
              <div className="modal-command-row">
                <button onClick={() => setShowLogoutModal(false)} className="btn-cancel-instr">
                  STAY CONNECTED
                </button>
                <button onClick={confirmLogout} className="btn-purge-definitive">
                  TERMINATE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
