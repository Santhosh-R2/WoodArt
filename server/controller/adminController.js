const User = require('../schema/User');
const Door = require('../schema/Door');
const Inquiry = require('../schema/Inquiry');

// @desc    Get Global Institutional Statistics
// @route   GET /api/admin/stats
exports.getGlobalStats = async (req, res) => {
  try {
    const totalArtisans = await User.countDocuments();
    const totalCollections = await Door.countDocuments();
    
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    const totalInquiries = allInquiries.length;
    const pendingInquiries = allInquiries.filter(i => i.status === 'pending').length;
    
    // Get last 3 inquiries for the activity node
    const recentActivity = await Inquiry.find()
      .populate('user', 'name email')
      .populate('door', 'doorName')
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      stats: {
        totalArtisans,
        totalCollections,
        totalInquiries,
        pendingInquiries
      },
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Institutional Intelligence Failure' });
  }
};
