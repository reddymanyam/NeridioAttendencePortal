const Attendance = require('../models/Attendance');
const User = require('../models/User');
const moment = require('moment');

// @desc    Check in for attendance
// @route   POST /api/attendance/checkin
// @access  Private
const checkIn = async (req, res) => {
  try {
    const { location } = req.body;
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ 
        message: 'Already checked in for today' 
      });
    }

    const currentTime = new Date();
    const checkInTime = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Check if late (after 9:30 AM)
    const isLate = currentTime.getHours() > 9 || 
                  (currentTime.getHours() === 9 && currentTime.getMinutes() > 30);

    const attendance = await Attendance.create({
      user: userId,
      date: currentTime,
      checkIn: {
        time: checkInTime,
        location: location,
        late: isLate
      },
      status: 'present'
    });

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('user', 'name email employeeId department position');

    res.status(201).json({
      message: 'Checked in successfully',
      attendance: populatedAttendance
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ message: 'Server error during check-in' });
  }
};

// @desc    Check out for attendance
// @route   POST /api/attendance/checkout
// @access  Private
const checkOut = async (req, res) => {
  try {
    const { location } = req.body;
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record
    const attendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!attendance) {
      return res.status(400).json({ 
        message: 'No check-in record found for today' 
      });
    }

    if (attendance.checkOut.time) {
      return res.status(400).json({ 
        message: 'Already checked out for today' 
      });
    }

    const currentTime = new Date();
    const checkOutTime = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Calculate working hours
    const checkInTime = new Date(attendance.date);
    checkInTime.setHours(
      parseInt(attendance.checkIn.time.split(':')[0]) + (attendance.checkIn.time.includes('PM') ? 12 : 0),
      parseInt(attendance.checkIn.time.split(':')[1]),
      parseInt(attendance.checkIn.time.split(':')[2].split(' ')[0])
    );

    const diff = currentTime - checkInTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const workingHours = `${hours}h ${minutes}m`;

    attendance.checkOut = {
      time: checkOutTime,
      location: location
    };
    attendance.workingHours = workingHours;

    await attendance.save();

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('user', 'name email employeeId department position');

    res.json({
      message: 'Checked out successfully',
      attendance: populatedAttendance
    });
  } catch (error) {
    console.error('Check-out error:', error);
    res.status(500).json({ message: 'Server error during check-out' });
  }
};

// @desc    Get user's attendance for a month
// @route   GET /api/attendance/monthly
// @access  Private
const getMonthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.role === 'admin' ? req.query.userId : req.user.id;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.find({
      user: userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: -1 });

    // Calculate summary
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const leave = attendance.filter(a => a.status === 'leave').length;
    const late = attendance.filter(a => a.checkIn.late).length;

    res.json({
      summary: { present, absent, leave, late },
      attendance
    });
  } catch (error) {
    console.error('Get monthly attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all attendance for admin
// @route   GET /api/attendance/admin
// @access  Private/Admin
const getAllAttendance = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, startDate, endDate } = req.query;

    let filter = {};
    if (department) {
      const users = await User.find({ department }, '_id');
      filter.user = { $in: users.map(u => u._id) };
    }
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(filter)
      .populate('user', 'name email employeeId department position')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Attendance.countDocuments(filter);

    res.json({
      attendance,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMonthlyAttendance,
  getAllAttendance
};