import React, { createContext, useContext, useState, useEffect } from 'react';

interface Attendance {
  date: string;
  status: 'present' | 'absent';
  checkInTime?: string;
}

interface AttendanceContextType {
  attendance: Attendance[];
  markAttendance: (status: 'present' | 'absent') => void;
  getAttendanceStats: () => {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    attendancePercentage: number;
  };
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attendance, setAttendance] = useState<Attendance[]>(() => {
    const savedAttendance = localStorage.getItem('employeeAttendance');
    return savedAttendance ? JSON.parse(savedAttendance) : [];
  });

  useEffect(() => {
    localStorage.setItem('employeeAttendance', JSON.stringify(attendance));
  }, [attendance]);

  const markAttendance = (status: 'present' | 'absent') => {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendance.find(record => record.date === today);

    if (existingRecord) {
      return; // Already marked attendance for today
    }

    const newAttendance: Attendance = {
      date: today,
      status,
      ...(status === 'present' ? { checkInTime: new Date().toLocaleTimeString() } : {})
    };

    setAttendance(prev => [...prev, newAttendance]);
  };

  const getAttendanceStats = () => {
    const totalDays = attendance.length;
    const presentDays = attendance.filter(record => record.status === 'present').length;
    const absentDays = attendance.filter(record => record.status === 'absent').length;
    const attendancePercentage = totalDays === 0 ? 0 : (presentDays / totalDays) * 100;

    return {
      totalDays,
      presentDays,
      absentDays,
      attendancePercentage
    };
  };

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance, getAttendanceStats }}>
      {children}
    </AttendanceContext.Provider>
  );
};