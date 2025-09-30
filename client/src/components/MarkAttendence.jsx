import React, { useState, useEffect } from 'react';

const MarkAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState('not_marked');
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isLoading, setIsLoading] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState(null);

  // Hardcoded employee data (would come from auth context/API)
  const employeeData = {
    id: 1,
    name: 'John Doe',
    employeeId: 'NER001',
    department: 'Engineering',
    position: 'Software Engineer',
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Check if attendance is already marked for today
  useEffect(() => {
    const today = new Date().toDateString();
    const savedAttendance = localStorage.getItem(`attendance_${employeeData.id}_${today}`);
    
    if (savedAttendance) {
      const attendanceData = JSON.parse(savedAttendance);
      setTodayAttendance(attendanceData);
      setAttendanceStatus(attendanceData.checkOutTime ? 'checked_out' : 'checked_in');
      setCheckInTime(attendanceData.checkInTime);
      setCheckOutTime(attendanceData.checkOutTime);
    }
  }, [employeeData.id]);

  const handleCheckIn = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const now = new Date();
    const attendanceData = {
      date: now.toDateString(),
      checkInTime: now.toISOString(),
      checkOutTime: null,
      employeeId: employeeData.id,
      location: location,
      status: 'present'
    };

    // Save to localStorage (replace with API call)
    localStorage.setItem(`attendance_${employeeData.id}_${now.toDateString()}`, JSON.stringify(attendanceData));
    
    setTodayAttendance(attendanceData);
    setAttendanceStatus('checked_in');
    setCheckInTime(now.toISOString());
    setIsLoading(false);
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const now = new Date();
    const updatedAttendance = {
      ...todayAttendance,
      checkOutTime: now.toISOString(),
      workingHours: calculateWorkingHours(checkInTime, now.toISOString())
    };

    // Update in localStorage (replace with API call)
    localStorage.setItem(`attendance_${employeeData.id}_${new Date().toDateString()}`, JSON.stringify(updatedAttendance));
    
    setTodayAttendance(updatedAttendance);
    setAttendanceStatus('checked_out');
    setCheckOutTime(now.toISOString());
    setIsLoading(false);
  };

  const calculateWorkingHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = endTime - startTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getStatusMessage = () => {
    switch (attendanceStatus) {
      case 'not_marked':
        return 'You have not checked in today';
      case 'checked_in':
        return 'You are checked in for today';
      case 'checked_out':
        return 'You have completed your attendance for today';
      default:
        return 'Ready to mark attendance';
    }
  };

  const getStatusColor = () => {
    switch (attendanceStatus) {
      case 'not_marked':
        return 'bg-yellow-100 text-yellow-800';
      case 'checked_in':
        return 'bg-green-100 text-green-800';
      case 'checked_out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isWithinWorkingHours = () => {
    const currentHour = currentTime.getHours();
    return currentHour >= 9 && currentHour < 18;
  };

  const isLateCheckIn = () => {
    if (!checkInTime) return false;
    const checkInHour = new Date(checkInTime).getHours();
    const checkInMinute = new Date(checkInTime).getMinutes();
    return checkInHour > 9 || (checkInHour === 9 && checkInMinute > 30);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-gray-600 mt-2">Record your daily check-in and check-out</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Employee Info and Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Employee Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {employeeData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{employeeData.name}</h2>
                  <p className="text-sm text-gray-600">{employeeData.position}</p>
                  <p className="text-xs text-gray-500">{employeeData.department}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Employee ID:</span>
                  <span className="font-medium">{employeeData.employeeId}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>

            {/* Current Time */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-sm text-gray-600">Current Time</div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Status</h3>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                {getStatusMessage()}
              </div>
              
              {todayAttendance && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Check In:</span>
                    <span className="font-medium">{formatTime(todayAttendance.checkInTime)}</span>
                  </div>
                  {todayAttendance.checkOutTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Check Out:</span>
                      <span className="font-medium">{formatTime(todayAttendance.checkOutTime)}</span>
                    </div>
                  )}
                  {todayAttendance.workingHours && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Working Hours:</span>
                      <span className="font-medium text-green-600">{todayAttendance.workingHours}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Attendance Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {/* Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={attendanceStatus === 'checked_out' ? '#10b981' : '#3b82f6'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={251.2}
                      strokeDashoffset={attendanceStatus === 'checked_out' ? 0 : 125.6}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {attendanceStatus === 'checked_out' ? '✅' : attendanceStatus === 'checked_in' ? '🟢' : '🕒'}
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {attendanceStatus === 'checked_out' ? 'Attendance Complete' :
                   attendanceStatus === 'checked_in' ? 'Checked In' : 'Ready to Check In'}
                </h2>
                <p className="text-gray-600">
                  {attendanceStatus === 'checked_out' ? 'You have successfully completed your attendance for today.' :
                   attendanceStatus === 'checked_in' ? 'Remember to check out when you finish work.' :
                   'Click the button below to check in for the day.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {attendanceStatus === 'not_marked' && (
                  <button
                    onClick={handleCheckIn}
                    disabled={isLoading || !isWithinWorkingHours()}
                    className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Checking In...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Check In Now</span>
                      </>
                    )}
                  </button>
                )}

                {attendanceStatus === 'checked_in' && (
                  <button
                    onClick={handleCheckOut}
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Checking Out...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Check Out Now</span>
                      </>
                    )}
                  </button>
                )}

                {attendanceStatus === 'checked_out' && (
                  <button
                    disabled
                    className="w-full py-4 px-6 bg-gray-400 text-white font-semibold rounded-lg shadow-md cursor-not-allowed"
                  >
                    ✅ Attendance Completed for Today
                  </button>
                )}
              </div>

              {/* Notifications */}
              <div className="mt-6 space-y-3">
                {!isWithinWorkingHours() && attendanceStatus === 'not_marked' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-yellow-800">
                        Outside regular working hours (9:00 AM - 6:00 PM)
                      </span>
                    </div>
                  </div>
                )}

                {isLateCheckIn() && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-red-800">
                        Late check-in recorded
                      </span>
                    </div>
                  </div>
                )}

                {location.latitude && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-green-800">
                        Location captured successfully
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-xs text-gray-600">Present</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-xs text-gray-600">Absent</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-xs text-gray-600">Late</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">1</div>
                    <div className="text-xs text-gray-600">Leave</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;