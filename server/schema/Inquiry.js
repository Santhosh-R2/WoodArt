const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  door: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Door',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

inquirySchema.index({ user: 1, createdAt: -1 });
inquirySchema.index({ door: 1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
