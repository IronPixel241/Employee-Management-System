import React, { useState } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useToast } from '../../context/ToastContext';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';

const ManageAttendance = () => {
  const { attendance, markAttendance, getAttendanceStats } = useAttendance();
  const { showToast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const stats = getAttendanceStats();

  const handleMarkAttendance = (status: 'present' | 'absent') => {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendance.find(record => record.date === today);

    if (existingRecord) {
      showToast({
        type: 'error',
        message: 'Attendance already marked for today'
      });
      return;
    }

    markAttendance(status);
    showToast({
      type: 'success',
      message: `Attendance marked as ${status} for today`
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getAttendanceForDate = (date: string) => {
    return attendance.find(record => record.date === date);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days = [];
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(year, month, day);
      const attendanceRecord = getAttendanceForDate(date);
      const isToday = date === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          className={`h-12 border border-gray-200 p-2 ${
            isToday ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
            {attendanceRecord && (
              <span className={`text-sm ${
                attendanceRecord.status === 'present' ? 'text-green-500' : 'text-red-500'
              }`}>
                {attendanceRecord.status === 'present' ? (
                  <CheckCircle size={16} />
                ) : (
                  <XCircle size={16} />
                )}
              </span>
            )}
          </div>
          {attendanceRecord?.checkInTime && (
            <div className="text-xs text-gray-500 mt-1">
              {attendanceRecord.checkInTime}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedMonth(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Days</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalDays}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Present Days</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{stats.presentDays}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Absent Days</h3>
          <p className="mt-2 text-3xl font-semibold text-red-600">{stats.absentDays}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Attendance %</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {stats.attendancePercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Mark Attendance Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Mark Today's Attendance</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleMarkAttendance('present')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Mark Present
          </button>
          <button
            onClick={() => handleMarkAttendance('absent')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Mark Absent
          </button>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Attendance Calendar</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ←
            </button>
            <span className="text-gray-600">
              {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;