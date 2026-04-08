import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="user-portal-layout">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default UserLayout;
