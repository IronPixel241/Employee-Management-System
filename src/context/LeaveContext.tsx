import React, { createContext, useContext, useState, useEffect } from 'react';

interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface LeaveContextType {
  leaves: Leave[];
  addLeave: (leave: Leave) => void;
  withdrawLeave: (id: string) => void;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const useLeave = () => {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};

export const LeaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaves, setLeaves] = useState<Leave[]>(() => {
    // Load from localStorage
    const savedLeaves = localStorage.getItem('employeeLeaves');
    return savedLeaves ? JSON.parse(savedLeaves) : [];
  });
  
  // Save to localStorage when leaves change
  useEffect(() => {
    localStorage.setItem('employeeLeaves', JSON.stringify(leaves));
  }, [leaves]);
  
  // Add new leave
  const addLeave = (leave: Leave) => {
    setLeaves(prev => [...prev, leave]);
  };
  
  // Withdraw (delete) leave
  const withdrawLeave = (id: string) => {
    setLeaves(prev => prev.filter(leave => leave.id !== id));
  };
  
  return (
    <LeaveContext.Provider value={{ leaves, addLeave, withdrawLeave }}>
      {children}
    </LeaveContext.Provider>
  );
};