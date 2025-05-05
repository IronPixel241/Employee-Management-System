import React, { createContext, useContext, useState, useEffect } from 'react';

interface Appraisal {
  id: string;
  achievements: string;
  challenges: string;
  goals: string;
  skillsImproved: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

interface AppraisalContextType {
  appraisals: Appraisal[];
  addAppraisal: (appraisal: Appraisal) => void;
  updateAppraisal: (id: string, updates: Partial<Appraisal>) => void;
  deleteAppraisal: (id: string) => void;
}

const AppraisalContext = createContext<AppraisalContextType | undefined>(undefined);

export const useAppraisal = () => {
  const context = useContext(AppraisalContext);
  if (!context) {
    throw new Error('useAppraisal must be used within an AppraisalProvider');
  }
  return context;
};

export const AppraisalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appraisals, setAppraisals] = useState<Appraisal[]>(() => {
    // Load from localStorage
    const savedAppraisals = localStorage.getItem('employeeAppraisals');
    return savedAppraisals ? JSON.parse(savedAppraisals) : [];
  });
  
  // Save to localStorage when appraisals change
  useEffect(() => {
    localStorage.setItem('employeeAppraisals', JSON.stringify(appraisals));
  }, [appraisals]);
  
  // Add new appraisal
  const addAppraisal = (appraisal: Appraisal) => {
    setAppraisals(prev => [...prev, appraisal]);
  };
  
  // Update existing appraisal
  const updateAppraisal = (id: string, updates: Partial<Appraisal>) => {
    setAppraisals(prev => 
      prev.map(appraisal => 
        appraisal.id === id ? { ...appraisal, ...updates } : appraisal
      )
    );
  };
  
  // Delete appraisal
  const deleteAppraisal = (id: string) => {
    setAppraisals(prev => prev.filter(appraisal => appraisal.id !== id));
  };
  
  return (
    <AppraisalContext.Provider value={{ appraisals, addAppraisal, updateAppraisal, deleteAppraisal }}>
      {children}
    </AppraisalContext.Provider>
  );
};