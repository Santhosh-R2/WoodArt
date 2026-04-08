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

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setShowLogoutModal(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Overview' },
    { path: '/inventory/add', label: 'Add Inventory' },
    { path: '/inventory/view', label: 'View Inventory' },
    { path: '/users/manage', label: 'Manage Users' },
    { path: '/inquiries', label: 'Inquiry Hub' },
  ];

  return (
    <div className="admin-container">
      {/* Top Professional Navigation */}
      <header className="top-nav">
        <div className="nav-left">
          <div className="nav-logo">
            <DoorOpen size={24} />
            <span className="brand-text">TimberAdmin</span>
          </div>
          
          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `top-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="nav-right">
          <div className="user-profile">
            <div className="profile-text">
              <span className="name">Super Admin</span>
              <span className="role">Portal Master</span>
            </div>
          </div>
          <button onClick={() => setShowLogoutModal(true)} className="top-logout">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area (Full Width) */}
      <main className="main-viewport">
        <section className="content-body">
          <Outlet />
        </section>
      </main>

      {/* Institutional Termination Confirmation */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content-logout"
            >
              <div className="modal-icon-logout">
                <AlertTriangle size={32} />
              </div>
              <h2 className="playfair-modal-title">Terminate Session?</h2>
              <p className="modal-desc-logout">You are about to disconnect from the Artisanal Command Portal. Institutional data synchronization will be suspended.</p>
              <div className="modal-actions-logout">
                <button onClick={() => setShowLogoutModal(false)} className="btn-stay">
                  Stay Synchronized
                </button>
                <button onClick={confirmLogout} className="btn-terminate">
                  Terminate Access
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
