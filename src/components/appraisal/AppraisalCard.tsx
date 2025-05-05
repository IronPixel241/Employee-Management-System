import React, { useState } from 'react';
import { Calendar, Edit, Trash } from 'lucide-react';

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

interface AppraisalCardProps {
  appraisal: Appraisal;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AppraisalCard: React.FC<AppraisalCardProps> = ({ appraisal, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Check if appraisal was updated after creation
  const wasUpdated = new Date(appraisal.updatedAt).getTime() > new Date(appraisal.createdAt).getTime();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="text-teal-600" />
            <span className="ml-2 text-sm text-gray-600">
              Submitted on {formatDate(appraisal.createdAt)}
              {wasUpdated && (
                <span className="ml-2 text-xs text-gray-500">
                  (Updated: {formatDate(appraisal.updatedAt)})
                </span>
              )}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(appraisal.id)}
              className="p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(appraisal.id)}
              className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Key Achievements:</h4>
          <p className="text-gray-700">
            {expanded ? appraisal.achievements : appraisal.achievements.slice(0, 150)}
            {!expanded && appraisal.achievements.length > 150 && '...'}
          </p>
        </div>
        
        {(expanded || appraisal.challenges) && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Challenges Faced:</h4>
            <p className="text-gray-700">{appraisal.challenges || 'None specified'}</p>
          </div>
        )}
        
        {(expanded || appraisal.goals) && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Goals for Next Period:</h4>
            <p className="text-gray-700">{appraisal.goals}</p>
          </div>
        )}
        
        {expanded && (
          <>
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Skills Improved:</h4>
              <p className="text-gray-700">{appraisal.skillsImproved || 'None specified'}</p>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Additional Feedback:</h4>
              <p className="text-gray-700">{appraisal.feedback || 'None provided'}</p>
            </div>
          </>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-700 focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default AppraisalCard;