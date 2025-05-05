import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import ApplyLeave from '../leave/ApplyLeave';
import ManageLeaves from '../leave/ManageLeaves';
import WriteAppraisal from '../appraisal/WriteAppraisal';
import ManageAppraisals from '../appraisal/ManageAppraisals';
import ProfilePage from '../profile/ProfilePage';
import ManageAttendance from '../attendance/ManageAttendance';
import Toast from '../ui/Toast';
import { useToast } from '../../context/ToastContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/apply-leave" element={<ApplyLeave />} />
              <Route path="/manage-leaves" element={<ManageLeaves />} />
              <Route path="/write-appraisal" element={<WriteAppraisal />} />
              <Route path="/manage-appraisals" element={<ManageAppraisals />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/manage-attendance" element={<ManageAttendance />} />
            </Routes>
          </div>
        </main>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

export default Layout;