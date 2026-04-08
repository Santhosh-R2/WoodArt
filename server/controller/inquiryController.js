const Inquiry = require('../schema/Inquiry');
const User = require('../schema/User');
const Door = require('../schema/Door');
const mongoose = require('mongoose');

// @desc    Create a new inquiry
// @route   POST /api/inquiries
exports.createInquiry = async (req, res) => {
  try {
    const { doorId, message } = req.body;
    const userId = req.user.id;

    if (!doorId || !message) {
      return res.status(400).json({ success: false, message: 'Institutional door ID and message are required' });
    }

    // Validate Door Existence before registry
    const doorExists = await Door.findById(doorId);
    if (!doorExists) {
      return res.status(404).json({ success: false, message: 'Artisanal collection entry not found' });
    }

    const inquiry = await Inquiry.create({
      user: new mongoose.Types.ObjectId(userId),
      door: new mongoose.Types.ObjectId(doorId),
      message
    });

    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Institutional Registry Error: ' + error.message });
  }
};

// @desc    Get current user's inquiries
// @route   GET /api/inquiries/my
exports.getMyInquiries = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Inquiry.countDocuments({ user: userId });
    const inquiries = await Inquiry.find({ user: userId })
      .populate('door', 'doorName doorImage amount')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    res.status(200).json({ 
      success: true, 
      count: inquiries.length, 
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      inquiries 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all inquiries (Admin Only)
// @route   GET /api/inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Inquiry.countDocuments();
    const inquiries = await Inquiry.find()
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'door',
        select: 'doorName amount'
      })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    res.status(200).json({ 
      success: true, 
      count: inquiries.length, 
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      inquiries 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sync Failure: ' + error.message });
  }
};
// @desc    Get Inquiry by ID (Admin Detailed View)
// @route   GET /api/inquiries/:id
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('user', 'name email phone address')
      .populate('door', 'doorName doorImage amount description');

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Institutional Registry Entry not found' });
    }

    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Institutional Registry Sync error' });
  }
};

// @desc    Update Inquiry Status (Artisanal Workflow)
// @route   PUT /api/inquiries/:id/status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Registry Entry identified for update' });
    }
    
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registry State Update error' });
  }
};

// @desc    Delete Inquiry (Registry Removal)
// @route   DELETE /api/inquiries/:id
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Institutional Registry Entry not identified' });
    }
    res.status(200).json({ success: true, message: 'Registry Entry purged successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Institutional Deletion Failure' });
  }
};

