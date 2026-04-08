const Door = require('../schema/Door');

// @desc    Add new door item
// @route   POST /api/doors
exports.addDoor = async (req, res) => {
    try {
        const { doorName, doorImage, amount, description } = req.body;
        
        const door = await Door.create({
            doorName,
            doorImage,
            amount,
            description
        });
        
        res.status(201).json({ success: true, data: door });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    View all door items
// @route   GET /api/doors
exports.viewAllDoors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const select = req.query.select || ''; // Allow field selection (e.g., -doorImage)

        const total = await Door.countDocuments();
        const doors = await Door.find()
            .select(select)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ 
            success: true, 
            count: doors.length,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            },
            data: doors 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    View one door by ID
// @route   GET /api/doors/:id
exports.viewDoorById = async (req, res) => {
    try {
        const door = await Door.findById(req.params.id);
        if (!door) {
            return res.status(404).json({ success: false, message: 'Door not found' });
        }
        res.status(200).json({ success: true, data: door });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Door ID' });
    }
};

// @desc    Update door details
// @route   PUT /api/doors/:id
exports.updateDoor = async (req, res) => {
    try {
        const door = await Door.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!door) {
            return res.status(404).json({ success: false, message: 'Door not found' });
        }
        
        res.status(200).json({ success: true, data: door });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete door item
// @route   DELETE /api/doors/:id
exports.deleteDoor = async (req, res) => {
    try {
        const door = await Door.findByIdAndDelete(req.params.id);
        if (!door) {
            return res.status(404).json({ success: false, message: 'Door not found' });
        }
        res.status(200).json({ success: true, message: 'Door deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Door ID or deletion error' });
    }
};
