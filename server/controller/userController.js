const User = require('../schema/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Nodemailer Transporter (Surgical SMTP Configuration)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL for high-fidelity security
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @desc    Send OTP to email
// @route   POST /api/users/send-otp
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    // LOG OTP FOR TESTING (System Trace)
    console.log(`[AUTH] OTP for ${email}: ${otp}`);

    // Try sending email (Institutional Dispatch)
    try {
      await transporter.sendMail({
        from: `"Artesanal Portal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Artisanal Identity Login Code',
        text: `Your one-time password is: ${otp}. It will expire in 10 minutes.`
      });
      
      res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (mailError) {
      console.log(`[SMTP] Could not send email: ${mailError.message}`);
      // bubble up the error so the user knows the sync failed
      res.status(500).json({ success: false, message: 'Institutional Mail Sync failed. Please contact admin.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify OTP and Log In
// @route   POST /api/users/verify-otp
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Clear OTP after use
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Profile (Complete Onboarding)
// @route   PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = name;
    user.phone = phone;
    user.address = address;
    user.isProfileComplete = true; // Mark onboarding as complete
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile completed successfully',
      user: {
        id: user._id,
        name: user.name,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/users/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-otp -otpExpires');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Identity not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Get All Users (Admin Access)
// @route   GET /api/users/all
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .select('-otp -otpExpires')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ 
      success: true, 
      count: users.length, 
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      users 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server synchronization error' });
  }
};

// @desc    Admin Login (Professional JWT Authentication)
// @route   POST /api/users/admin-login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Standardizing on Institutional Admin Credentials
    if (email === 'viswamcarving.com' && password === 'admin123') {
      const token = jwt.sign(
        { id: 'admin_institutional_master', role: 'admin' }, 
        process.env.JWT_SECRET || 'secret123', 
        { expiresIn: '7d' }
      );
      
      return res.status(200).json({ 
        success: true, 
        token,
        message: 'Administrative clearance granted' 
      });
    }
    res.status(401).json({ success: false, message: 'Invalid administrative credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Institutional Auth Sync failed' });
  }
};

