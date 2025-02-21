const express = require('express');
const { getDoctors, getDoctor, getAvailableSlots } = require('../controllers/doctorController');

const router = express.Router();

router.get('/', getDoctors);
// router.post('/add', addDoctor);
router.get('/:id', getDoctor);
router.get('/:id/slots', getAvailableSlots);

module.exports = router;
