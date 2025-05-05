import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useLeave } from '../../context/LeaveContext';
import { useAppraisal } from '../../context/AppraisalContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { leaves } = useLeave();
  const { appraisals } = useAppraisal();

  // Calculate leave statistics
  const pendingLeaves = leaves.filter(leave => leave.status === 'pending').length;
  const approvedLeaves = leaves.filter(leave => leave.status === 'approved').length;
  const rejectedLeaves = leaves.filter(leave => leave.status === 'rejected').length;

  // Get most recent appraisal
  const latestAppraisal = appraisals.length > 0 
    ? appraisals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] 
    : null;

  const stats = [
    { 
      title: 'Pending Leaves', 
      value: pendingLeaves, 
      icon: <Clock className="text-amber-500" size={24} />,
      color: 'bg-amber-50 border-amber-200'
    },
    { 
      title: 'Approved Leaves', 
      value: approvedLeaves, 
      icon: <CheckCircle className="text-green-500" size={24} />,
      color: 'bg-green-50 border-green-200'
    },
    { 
      title: 'Rejected Leaves', 
      value: rejectedLeaves, 
      icon: <AlertCircle className="text-red-500" size={24} />,
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-blue-100">Your employee dashboard at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg shadow-sm border ${stat.color} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => navigate('/apply-leave')}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Calendar size={20} className="text-blue-700" />
                <span className="ml-3 font-medium text-blue-900">Apply for Leave</span>
              </div>
              <span className="text-blue-700">→</span>
            </button>
            
            <button 
              onClick={() => navigate('/write-appraisal')}
              className="flex items-center justify-between p-4 bg-teal-50 rounded-lg border border-teal-100 hover:bg-teal-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <FileText size={20} className="text-teal-700" />
                <span className="ml-3 font-medium text-teal-900">Write Appraisal</span>
              </div>
              <span className="text-teal-700">→</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Latest Activity</h2>
          </div>
          
          {leaves.length > 0 || appraisals.length > 0 ? (
            <div className="space-y-4">
              {leaves.length > 0 && (
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="mt-0.5 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Leave request ({leaves[0].status})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(leaves[0].startDate).toLocaleDateString()} - {new Date(leaves[0].endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              
              {latestAppraisal && (
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <FileText size={18} className="mt-0.5 text-teal-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Appraisal submitted
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(latestAppraisal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;