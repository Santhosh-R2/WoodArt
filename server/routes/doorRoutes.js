const express = require('express');
const router = express.Router();
const {
    addDoor,
    viewAllDoors,
    viewDoorById,
    updateDoor,
    deleteDoor
} = require('../controller/doorController');

// Routes mapping for CRUD
router.route('/').get(viewAllDoors).post(addDoor);
router.route('/:id').get(viewDoorById).put(updateDoor).delete(deleteDoor);

module.exports = router;
