import React, { useState } from 'react';

const AdminDashboard = () => {
  // Hardcoded employee data
  const employeesData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@neridio.com',
      department: 'Engineering',
      position: 'Software Engineer',
      joinDate: '2023-01-15',
      attendance: {
        '2024-01': { present: 22, absent: 2, leave: 4 },
        '2024-02': { present: 20, absent: 1, leave: 7 },
        '2024-03': { present: 18, absent: 0, leave: 2 }
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@neridio.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      joinDate: '2023-03-10',
      attendance: {
        '2024-01': { present: 20, absent: 3, leave: 5 },
        '2024-02': { present: 19, absent: 2, leave: 7 },
        '2024-03': { present: 21, absent: 1, leave: 0 }
      }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@neridio.com',
      department: 'Sales',
      position: 'Sales Executive',
      joinDate: '2023-02-20',
      attendance: {
        '2024-01': { present: 18, absent: 5, leave: 5 },
        '2024-02': { present: 17, absent: 4, leave: 7 },
        '2024-03': { present: 16, absent: 2, leave: 2 }
      }
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@neridio.com',
      department: 'HR',
      position: 'HR Manager',
      joinDate: '2023-01-05',
      attendance: {
        '2024-01': { present: 23, absent: 0, leave: 5 },
        '2024-02': { present: 22, absent: 0, leave: 6 },
        '2024-03': { present: 20, absent: 1, leave: 1 }
      }
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@neridio.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      joinDate: '2023-04-12',
      attendance: {
        '2024-01': { present: 21, absent: 1, leave: 6 },
        '2024-02': { present: 19, absent: 2, leave: 7 },
        '2024-03': { present: 22, absent: 0, leave: 0 }
      }
    }
  ];

  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Available months from the data
  const availableMonths = ['2024-01', '2024-02', '2024-03'];

  // Departments
  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR'];

  // Filter employees based on search and department
  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Calculate overall statistics
  const overallStats = filteredEmployees.reduce((stats, employee) => {
    const monthData = employee.attendance[selectedMonth];
    if (monthData) {
      stats.totalPresent += monthData.present;
      stats.totalAbsent += monthData.absent;
      stats.totalLeave += monthData.leave;
      stats.totalEmployees++;
    }
    return stats;
  }, { totalPresent: 0, totalAbsent: 0, totalLeave: 0, totalEmployees: 0 });

  // Calculate attendance percentage
  const totalDays = 22; // Assuming 22 working days in a month
  const overallAttendancePercentage = ((overallStats.totalPresent / (overallStats.totalEmployees * totalDays)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage employee attendance and track performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Present</p>
                <p className="text-2xl font-bold text-gray-900">{overallStats.totalPresent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Absent</p>
                <p className="text-2xl font-bold text-gray-900">{overallStats.totalAbsent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leave</p>
                <p className="text-2xl font-bold text-gray-900">{overallStats.totalLeave}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{overallAttendancePercentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Employees</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Employee Attendance - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredEmployees.length} employees
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Absent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => {
                  const monthData = employee.attendance[selectedMonth];
                  const attendancePercentage = monthData ? ((monthData.present / totalDays) * 100).toFixed(1) : 0;
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-green-600 font-semibold">{monthData?.present || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-red-600 font-semibold">{monthData?.absent || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-blue-600 font-semibold">{monthData?.leave || 0}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                attendancePercentage >= 90 ? 'bg-green-500' :
                                attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`font-semibold ${
                            attendancePercentage >= 90 ? 'text-green-600' :
                            attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attendancePercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          attendancePercentage >= 90 ? 'bg-green-100 text-green-800' :
                          attendancePercentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {attendancePercentage >= 90 ? 'Excellent' :
                           attendancePercentage >= 75 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
              <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;