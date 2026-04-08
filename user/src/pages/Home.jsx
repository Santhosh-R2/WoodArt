import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Microscope,
  ArrowRight,
  ChevronRight,
  Hammer,
  TreePine,
  Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Local Artisanal Assets
import workshopImg from '../assets/workshop.png';
import grainImg from '../assets/grain.png';
import interiorImg from '../assets/interior.png';
import heroImg from '../assets/hero_dark.png';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="home-portal">
      {/* Cinematic Hero (Masterpiece Reveal) */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="hero-background"
        >
          <img src={heroImg} alt="Hero Masterpiece" />
          <div className="hero-overlay" />
        </motion.div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="brand-identity"
          >
            <span className="brand-tag">The Institutional Standard</span>
            <h1>Artisanal Doors Defined by Historical Precision</h1>
            <p>Experience the highest fidelity of woodworking technology. Every door is a singular masterpiece of engineering and historical discovery.</p>

            <div className="hero-actions">
              <button onClick={() => navigate('/showcase')} className="btn-primary hero-btn">
                <span>Explore Collection</span>
                <ArrowRight size={20} />
              </button>
              {!isAuthenticated && (
                <button onClick={() => navigate('/auth/login')} className="btn-ghost hero-btn">
                  <span>Access The Vault</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authority Matrix (Micro-Animations) */}
      <section id="standards" className="authority-grid-section">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="authority-grid"
        >
          <motion.div variants={fadeInUp} className="grid-item">
            <ShieldCheck size={32} className="text-primary" />
            <h3>Institutional Grade</h3>
            <p>Reinforced core technology meeting global structural standards for elite safety.</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid-item">
            <Award size={32} className="text-primary" />
            <h3>Certified Timber</h3>
            <p>Sourced from sustainable, high-grade timber forests with institutional certification.</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid-item">
            <Microscope size={32} className="text-primary" />
            <h3>Precision Design</h3>
            <p>Measured to the millimeter using surgical level artisanal techniques and modern AI.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Discovery Matrix (Zig-Zag Narrative) */}
      <section id="story" className="discovery-matrix">

        {/* Section 1: The Workshop (Image Left / Text Right) */}
        <div className="matrix-row">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="matrix-visual"
          >
            <img src={workshopImg} alt="Artisanal Workshop" />
            <div className="image-accent" />
          </motion.div>
          <motion.div
            {...fadeInUp}
            className="matrix-content"
          >
            <div className="section-label">
              <Hammer size={16} />
              <span>01. Craftsmanship</span>
            </div>
            <h2>Defined by the Artisan's Hand</h2>
            <p>Every masterpiece begins in our institutional workshop. We combine traditional Japanese joinery with modern structural integrity, ensuring that each door is as much a piece of art as it is a functional portal.</p>
            <button className="text-btn">
              <span>Our Process</span>
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Section 2: The Material (Text Left / Image Right) */}
        <div className="matrix-row reverse">
          <motion.div
            {...fadeInUp}
            className="matrix-content"
          >
            <div className="section-label">
              <TreePine size={16} />
              <span>02. Material Integrity</span>
            </div>
            <h2>Sourced for Generations</h2>
            <p>We utilize the top 0.1% of global timber. From deep-grain Mahogany to resilient Teak, our materials are cured for years before entering the cutting room, guaranteeing zero warping and high-fidelity texture.</p>
            <button className="text-btn">
              <span>Timber Standards</span>
              <ChevronRight size={18} />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="matrix-visual"
          >
            <img src={grainImg} alt="Timber Grain" />
            <div className="image-accent secondary" />
          </motion.div>
        </div>

        {/* Section 3: Integration (Image Left / Text Right) */}
        <div className="matrix-row">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="matrix-visual"
          >
            <img src={interiorImg} alt="Luxury Interior" />
            <div className="image-accent" />
          </motion.div>
          <motion.div
            {...fadeInUp}
            className="matrix-content"
          >
            <div className="section-label">
              <Layers size={16} />
              <span>03. Architectural Integration</span>
            </div>
            <h2>Modern Context. Historical Soul.</h2>
            <p>Whether it's a minimalist Tokyo penthouse or a historical London estate, our doors integrate seamlessly. We design for the specific lighting and acoustic requirements of your environment.</p>
            <button className="text-btn">
              <span>Portfolio View</span>
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

      </section>

      {/* The Vault CTA (Conditionally Hidden) */}
      {!isAuthenticated && (
        <section id="vault" className="vault-cta">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-card glass-card"
          >
            <div className="cta-content">
              <h2>Access the Artisanal Identity</h2>
              <p>Join our exclusive portal to view technical door specifications, individual pricing modules, and secure architectural data.</p>
              <button onClick={() => navigate('/auth/login')} className="btn-primary cta-btn">
                <span>Secure Identification</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="cta-glow" />
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home;
