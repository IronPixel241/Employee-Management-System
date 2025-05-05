import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ToastProvider } from './context/ToastContext';
import { LeaveProvider } from './context/LeaveContext';
import { AppraisalProvider } from './context/AppraisalContext';
import { ProfileProvider } from './context/ProfileContext';
import { AttendanceProvider } from './context/AttendanceContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <ProfileProvider>
          <LeaveProvider>
            <AppraisalProvider>
              <AttendanceProvider>
                <Layout />
              </AttendanceProvider>
            </AppraisalProvider>
          </LeaveProvider>
        </ProfileProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;