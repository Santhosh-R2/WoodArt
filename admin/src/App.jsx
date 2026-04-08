import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import AddInventory from './pages/AddInventory';
import ViewInventory from './pages/ViewInventory';
import DoorDetails from './pages/DoorDetails';
import { AddUser, ManageUsers, Inquiries } from './pages/ManagementModules';
import InquiryDetails from './pages/InquiryDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Artisanal Management Portal */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory/add" element={<AddInventory />} />
          <Route path="inventory/view" element={<ViewInventory />} />
          <Route path="inventory/view/:id" element={<DoorDetails />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/manage" element={<ManageUsers />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="inquiries/:id" element={<InquiryDetails />} />
        </Route>

        {/* Admin Secret Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Global Institutional Redirects */}
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;