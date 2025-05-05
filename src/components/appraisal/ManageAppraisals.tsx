import React, { useState } from 'react';
import { useAppraisal } from '../../context/AppraisalContext';
import { useToast } from '../../context/ToastContext';
import AppraisalCard from './AppraisalCard';

const ManageAppraisals = () => {
  const { appraisals, updateAppraisal, deleteAppraisal } = useAppraisal();
  const { showToast } = useToast();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    achievements: '',
    challenges: '',
    goals: '',
    skillsImproved: '',
    feedback: ''
  });
  
  // Order appraisals by creation date (newest first)
  const sortedAppraisals = [...appraisals].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const handleEdit = (id: string) => {
    const appraisal = appraisals.find(a => a.id === id);
    if (appraisal) {
      setEditFormData({
        achievements: appraisal.achievements,
        challenges: appraisal.challenges,
        goals: appraisal.goals,
        skillsImproved: appraisal.skillsImproved,
        feedback: appraisal.feedback
      });
      setEditingId(id);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateAppraisal(editingId, {
        ...editFormData,
        updatedAt: new Date().toISOString()
      });
      
      setEditingId(null);
      showToast({
        type: 'success',
        message: 'Appraisal updated successfully'
      });
    }
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appraisal?')) {
      deleteAppraisal(id);
      showToast({
        type: 'success',
        message: 'Appraisal deleted successfully'
      });
    }
  };
  
  const handleCancel = () => {
    setEditingId(null);
  };
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Appraisals</h2>
          
          {appraisals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't submitted any appraisals yet.</p>
              <a 
                href="/write-appraisal" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Write Appraisal
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedAppraisals.map(appraisal => (
                <div key={appraisal.id}>
                  {editingId === appraisal.id ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Appraisal</h3>
                        
                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div>
                            <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
                              Key Achievements
                            </label>
                            <textarea
                              id="achievements"
                              name="achievements"
                              rows={3}
                              value={editFormData.achievements}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                              Challenges Faced
                            </label>
                            <textarea
                              id="challenges"
                              name="challenges"
                              rows={2}
                              value={editFormData.challenges}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                              Goals for Next Period
                            </label>
                            <textarea
                              id="goals"
                              name="goals"
                              rows={2}
                              value={editFormData.goals}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="skillsImproved" className="block text-sm font-medium text-gray-700 mb-1">
                              Skills Improved
                            </label>
                            <input
                              type="text"
                              id="skillsImproved"
                              name="skillsImproved"
                              value={editFormData.skillsImproved}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Feedback
                            </label>
                            <textarea
                              id="feedback"
                              name="feedback"
                              rows={2}
                              value={editFormData.feedback}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <AppraisalCard 
                      appraisal={appraisal} 
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAppraisals;