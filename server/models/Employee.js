const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveBalance: {
    sickLeave: {
      type: Number,
      default: 12
    },
    casualLeave: {
      type: Number,
      default: 8
    },
    earnedLeave: {
      type: Number,
      default: 15
    }
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  salary: {
    type: Number
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);