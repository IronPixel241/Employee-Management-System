import React from 'react';
import { useLeave } from '../../context/LeaveContext';
import { useToast } from '../../context/ToastContext';
import LeaveCard from './LeaveCard';

const ManageLeaves = () => {
  const { leaves, withdrawLeave } = useLeave();
  const { showToast } = useToast();
  
  // Order leaves by creation date (newest first)
  const sortedLeaves = [...leaves].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const handleWithdraw = (id: string) => {
    withdrawLeave(id);
    showToast({
      type: 'success',
      message: 'Leave application withdrawn successfully'
    });
  };
  
  // Group leaves by status
  const pendingLeaves = sortedLeaves.filter(leave => leave.status === 'pending');
  const approvedLeaves = sortedLeaves.filter(leave => leave.status === 'approved');
  const rejectedLeaves = sortedLeaves.filter(leave => leave.status === 'rejected');
  
  const renderLeaveList = (leaveList: any[], title: string, emptyMessage: string) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      {leaveList.length > 0 ? (
        <div className="space-y-4">
          {leaveList.map(leave => (
            <LeaveCard 
              key={leave.id} 
              leave={leave} 
              onWithdraw={handleWithdraw}
              showWithdrawButton={leave.status === 'pending'}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-4">{emptyMessage}</p>
      )}
    </div>
  );
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Leave Applications</h2>
          
          {leaves.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't applied for any leaves yet.</p>
              <a 
                href="/apply-leave" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply for Leave
              </a>
            </div>
          ) : (
            <div>
              {renderLeaveList(
                pendingLeaves, 
                "Pending Applications", 
                "No pending leave applications"
              )}
              
              {renderLeaveList(
                approvedLeaves, 
                "Approved Leaves", 
                "No approved leave applications"
              )}
              
              {renderLeaveList(
                rejectedLeaves, 
                "Rejected Applications", 
                "No rejected leave applications"
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLeaves;