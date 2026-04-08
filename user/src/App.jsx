import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';

// Discovery Portal Pages
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Spotlight from './pages/Spotlight';
import Location from './pages/Location';
import Inquiry from './pages/Inquiry';

// Authentication Portal Pages
import EmailLogin from './pages/Auth/EmailLogin';
import OTPVerify from './pages/Auth/OTPVerify';
import CompleteProfile from './pages/Auth/CompleteProfile';

// Protected Route Guard (Customer Identity Context)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');
  const isProfileComplete = localStorage.getItem('is_profile_complete') === 'true';

  if (!token) return <Navigate to="/auth/login" replace />;
  if (!isProfileComplete) return <Navigate to="/auth/complete-profile" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Discovery Entrance Portal (Public) */}
        <Route path="/" element={
          <UserLayout>
            <Home />
          </UserLayout>
        } />

        <Route path="/showcase" element={
          <UserLayout>
            <Showcase />
          </UserLayout>
        } />

        <Route path="/location" element={
          <UserLayout>
            <Location />
          </UserLayout>
        } />

        {/* Public Authentication Architecture */}
        <Route path="/auth/login" element={
          <UserLayout>
            <EmailLogin />
          </UserLayout>
        } />
        
        <Route path="/auth/verify" element={
          <UserLayout>
            <OTPVerify />
          </UserLayout>
        } />
        
        <Route path="/auth/complete-profile" element={
          <UserLayout>
            <CompleteProfile />
          </UserLayout>
        } />

        {/* Protected Artisanal Discovery & Inquiry */}
        <Route path="/spotlight/:id" element={
          <ProtectedRoute>
            <UserLayout>
              <Spotlight />
            </UserLayout>
          </ProtectedRoute>
        } />

        <Route path="/inquiry" element={
          <ProtectedRoute>
            <UserLayout>
              <Inquiry />
            </UserLayout>
          </ProtectedRoute>
        } />

        {/* Global Intelligence Routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
