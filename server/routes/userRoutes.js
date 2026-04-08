const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, updateProfile, getProfile, getAllUsers, adminLogin } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/admin-login', adminLogin);
router.put('/profile', protect, updateProfile);
router.get('/profile', protect, getProfile);
router.get('/all', protect, getAllUsers);

module.exports = router;
