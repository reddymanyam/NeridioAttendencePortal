import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar'
import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
  return (
    <>
      <EmployeeNavbar />
      <Outlet />
    </>
  )
}

export default EmployeeLayout