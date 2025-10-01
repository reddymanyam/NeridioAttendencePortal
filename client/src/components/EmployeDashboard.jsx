import React, { useState } from 'react';

const EmployeeDashboard = () => {
  // Hardcoded employee data (this would come from API/auth context)
  const employeeData = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@neridio.com',
    employeeId: 'NER001',
    department: 'Engineering',
    position: 'Software Engineer',
    joinDate: '2023-01-15',
    manager: 'Sarah Wilson',
    phone: '+1 (555) 123-4567',
    attendance: {
      '2024-01': {
        present: 22,
        absent: 2,
        leave: 4,
        late: 1,
        details: [
          { date: '2024-01-01', status: 'Leave', type: 'Holiday', checkIn: '-', checkOut: '-' },
          { date: '2024-01-02', status: 'Present', checkIn: '09:05 AM', checkOut: '06:15 PM' },
          { date: '2024-01-03', status: 'Present', checkIn: '09:15 AM', checkOut: '06:20 PM' },
          { date: '2024-01-04', status: 'Present', checkIn: '09:00 AM', checkOut: '06:10 PM' },
          { date: '2024-01-05', status: 'Late', checkIn: '10:30 AM', checkOut: '06:25 PM' },
          { date: '2024-01-08', status: 'Present', checkIn: '09:10 AM', checkOut: '06:05 PM' },
          // ... more days
        ]
      },
      '2024-02': {
        present: 20,
        absent: 1,
        leave: 7,
        late: 0,
        details: [
          { date: '2024-02-01', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM' },
          { date: '2024-02-02', status: 'Present', checkIn: '09:05 AM', checkOut: '06:10 PM' },
          { date: '2024-02-05', status: 'Leave', type: 'Sick Leave', checkIn: '-', checkOut: '-' },
          // ... more days
        ]
      },
      '2024-03': {
        present: 18,
        absent: 0,
        leave: 2,
        late: 2,
        details: [
          { date: '2024-03-01', status: 'Present', checkIn: '09:20 AM', checkOut: '06:15 PM' },
          { date: '2024-03-04', status: 'Late', checkIn: '10:15 AM', checkOut: '06:30 PM' },
          { date: '2024-03-05', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM' },
          { date: '2024-03-08', status: 'Leave', type: 'Personal', checkIn: '-', checkOut: '-' },
          // ... more days
        ]
      }
    },
    leaveBalance: {
      sickLeave: 12,
      casualLeave: 8,
      earnedLeave: 15
    }
  };

  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const availableMonths = ['2024-01', '2024-02', '2024-03'];
  const currentMonthData = employeeData.attendance[selectedMonth];
  const totalDays = 22; // Assuming 22 working days in the month

  // Calculate statistics
  const attendancePercentage = ((currentMonthData.present / totalDays) * 100).toFixed(1);
  const totalWorkingDays = currentMonthData.present + currentMonthData.absent + currentMonthData.late;

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Leave': return 'bg-blue-100 text-blue-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {employeeData.name}!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats and Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {employeeData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{employeeData.name}</h2>
                <p className="text-gray-600">{employeeData.position}</p>
                <p className="text-sm text-gray-500">{employeeData.department} Department</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employee ID:</span>
                <span className="font-medium">{employeeData.employeeId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{employeeData.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Manager:</span>
                <span className="font-medium">{employeeData.manager}</span>
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-semibold">{attendancePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      attendancePercentage >= 90 ? 'bg-green-500' :
                      attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentMonthData.present}</div>
                  <div className="text-sm text-green-800">Present</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{currentMonthData.absent}</div>
                  <div className="text-sm text-red-800">Absent</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentMonthData.leave}</div>
                  <div className="text-sm text-blue-800">Leave</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{currentMonthData.late}</div>
                  <div className="text-sm text-yellow-800">Late</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Balance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sick Leave</span>
                  <span className="font-semibold">{employeeData.leaveBalance.sickLeave} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(employeeData.leaveBalance.sickLeave / 15) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Casual Leave</span>
                  <span className="font-semibold">{employeeData.leaveBalance.casualLeave} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(employeeData.leaveBalance.casualLeave / 12) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Earned Leave</span>
                  <span className="font-semibold">{employeeData.leaveBalance.earnedLeave} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(employeeData.leaveBalance.earnedLeave / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance</h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Details Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Daily Attendance - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Working Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMonthData.details.map((day, index) => {
                  const date = new Date(day.date);
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  
                  return (
                    <tr key={index} className={isWeekend ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDate(day.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {date.toLocaleDateString('en-US', { weekday: 'long' })}
                        {isWeekend && <span className="ml-2 text-xs text-orange-600">Weekend</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(day.status)}`}>
                          {day.status} {day.type && `(${day.type})`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {day.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {day.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {day.status === 'Present' || day.status === 'Late' ? '8h 10m' : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                Total Working Days: <strong>{totalWorkingDays}</strong>
              </span>
              <span className="text-gray-600">
                Attendance Rate: <strong>{attendancePercentage}%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;