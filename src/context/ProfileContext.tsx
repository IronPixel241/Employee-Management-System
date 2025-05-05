import React, { createContext, useContext, useState, useEffect } from 'react';

interface Profile {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  salary: number;
  age: number;
  phone: string;
  address: string;
  imageUrl: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Software Engineer',
  department: 'Engineering',
  joinDate: '2023-01-15',
  salary: 75000,
  age: 28,
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, Silicon Valley, CA 94025',
  imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const savedProfile = localStorage.getItem('employeeProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('employeeProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};