import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface LeaveCardProps {
  leave: Leave;
  onWithdraw: (id: string) => void;
  showWithdrawButton: boolean;
}

const LeaveCard: React.FC<LeaveCardProps> = ({ leave, onWithdraw, showWithdrawButton }) => {
  // Format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate number of days
  const calculateDays = () => {
    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  // Status badge styles
  const getStatusDetails = () => {
    switch (leave.status) {
      case 'pending':
        return {
          color: 'bg-amber-100 text-amber-800',
          icon: <Clock size={16} className="text-amber-500" />
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle size={16} className="text-green-500" />
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <XCircle size={16} className="text-red-500" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };
  
  // Get leave type badge color
  const getLeaveTypeColor = () => {
    switch (leave.type) {
      case 'casual':
        return 'bg-blue-50 text-blue-700';
      case 'sick':
        return 'bg-purple-50 text-purple-700';
      case 'vacation':
        return 'bg-teal-50 text-teal-700';
      case 'personal':
        return 'bg-indigo-50 text-indigo-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  const statusDetails = getStatusDetails();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeColor()}`}>
              {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave
            </span>
            <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDetails.color}`}>
              {statusDetails.icon}
              <span className="ml-1">{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            Applied on {formatDate(leave.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <Calendar size={18} className="text-gray-400" />
          <div className="ml-2 flex items-center">
            <span className="text-gray-700">{formatDate(leave.startDate)}</span>
            <span className="mx-2">-</span>
            <span className="text-gray-700">{formatDate(leave.endDate)}</span>
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
              {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Reason:</h4>
          <p className="text-gray-700">{leave.reason}</p>
        </div>
        
        {showWithdrawButton && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onWithdraw(leave.id)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Withdraw Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveCard;