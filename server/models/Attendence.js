const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkIn: {
    time: {
      type: String,
      required: true
    },
    location: {
      latitude: Number,
      longitude: Number
    },
    late: {
      type: Boolean,
      default: false
    }
  },
  checkOut: {
    time: String,
    location: {
      latitude: Number,
      longitude: Number
    }
  },
  workingHours: {
    type: String
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'leave', 'half-day'],
    default: 'present'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to ensure one attendance record per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

// Virtual for formatted date (YYYY-MM-DD)
attendanceSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

module.exports = mongoose.model('Attendance', attendanceSchema);