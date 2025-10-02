const express = require('express');
const { 
  checkIn, 
  checkOut, 
  getMonthlyAttendance, 
  getAllAttendance 
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/monthly', getMonthlyAttendance);
router.get('/admin', authorize('admin'), getAllAttendance);

module.exports = router;