import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Neridio</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Attendance
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              

              <NavLink
                to="/employee"
                end
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
                    : "px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
                }
              >
                Mark Your Attendance
              </NavLink>

              <NavLink
                to="/employee/employeedashboard"
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
                    : "px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
                }
              >
                Dashboard
              </NavLink>

              {/* <Link
                to="/reports"
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
              >
                Reports
              </Link>

              <NavLink
                to="/employeeslist"
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
                    : "px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
                }
              >
                Employees List
              </NavLink> */}
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 transition duration-150">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">SS</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">SamSon</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile menu */ }
  {
    isMenuOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">


          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
          >
            Mark Your Attendance
          </Link>

          <Link
            to="/employeedashboard"
            className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
          >
            Dashboard
          </Link>

          {/* <Link
                to="/reports"
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
              >
                Reports
              </Link>

              <Link
                to="/employeeslist"
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition duration-150"
              >
                Employees
              </Link> */}
        </div>
      </div>
    )
  }
    </nav >
  );
};

export default EmployeeNavbar;