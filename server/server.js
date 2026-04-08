require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const doorRoutes = require('./routes/doorRoutes');
const userRoutes = require('./routes/userRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reqLogger = require('./middleware/reqLogger');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Multi-Origin Management (Admin & Customer Portal)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Cross-Origin Access Restricted'));
    }
  },
  credentials: true
}));

// Apply performance logger
app.use(reqLogger);

// Middleware
// Set deep limit for Base64 image payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mount Routes
app.use('/api/doors', doorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('WoodDoor API is operational.');
});

// Port Configuration
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\x1b[36m🚀 Server running on port ${PORT}\x1b[0m`);
    });
}

module.exports = app;