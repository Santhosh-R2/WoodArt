const mongoose = require('mongoose');

const doorSchema = new mongoose.Schema({
    doorName: {
        type: String,
        required: [true, 'Please add a door name'],
        trim: true
    },
    doorImage: {
        type: String,
        required: [true, 'Please provide the door image as Base64']
    },
    amount: {
        type: Number,
        required: [true, 'Please specify the door amount']
    },
    description: {
        type: String,
        required: [true, 'Please add a description of the craftsmanship']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

doorSchema.index({ doorName: 'text' }); // Enable text search if needed

module.exports = mongoose.model('Door', doorSchema);
