const express = require('express');
const router = express.Router();
const { createInquiry, getMyInquiries, getAllInquiries, getInquiryById, updateInquiryStatus, deleteInquiry } = require('../controller/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createInquiry);
router.get('/my', protect, getMyInquiries);
router.get('/all', protect, getAllInquiries); // Admin Only
router.get('/:id', protect, getInquiryById); // Admin Only
router.put('/:id/status', protect, updateInquiryStatus); // Admin Only
router.delete('/:id', protect, deleteInquiry); // Admin Only

module.exports = router;
