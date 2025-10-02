const express = require('express');
const { 
  getEmployees, 
  getEmployee, 
  updateEmployee, 
  getEmployeeStats 
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'), getEmployees);
router.get('/stats', authorize('admin'), getEmployeeStats);
router.get('/:id', getEmployee);
router.put('/:id', authorize('admin'), updateEmployee);

module.exports = router;