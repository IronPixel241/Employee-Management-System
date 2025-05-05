import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  toast: {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  };
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <XCircle size={20} className="text-red-500" />;
      case 'info':
        return <AlertCircle size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <div 
      className={`flex items-center w-80 p-4 rounded-lg shadow-lg border ${getBackgroundColor()} animate-fade-in-up`}
      style={{ animationDuration: '0.3s' }}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="ml-3 mr-2 flex-1">
        <p className="text-sm font-medium text-gray-800">{toast.message}</p>
      </div>
      <button 
        className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
        onClick={() => setIsVisible(false)}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;