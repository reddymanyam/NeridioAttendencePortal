import React from 'react'
import './index.css';
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import EmployeeDashboard from './EmployeDashboard/EmployeDashboard';
import SignUp from './components/SignUp';
import MarkAttendance from './components/MarkAttendence';
const App = () => {
  return (
    // <Authentication />
    // <Navbar />
    // <AdminDashboard />
    // <EmployeeDashboard />
    <MarkAttendance />
    // <SignUp />
  )
}

export default App