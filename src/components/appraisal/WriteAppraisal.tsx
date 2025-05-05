import React, { useState } from 'react';
import { useAppraisal } from '../../context/AppraisalContext';
import { useToast } from '../../context/ToastContext';

const WriteAppraisal = () => {
  const { addAppraisal } = useAppraisal();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    achievements: '',
    challenges: '',
    goals: '',
    skillsImproved: '',
    feedback: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.achievements.trim() || !formData.goals.trim()) {
      showToast({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }
    
    // Submit appraisal
    addAppraisal({
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    // Reset form
    setFormData({
      achievements: '',
      challenges: '',
      goals: '',
      skillsImproved: '',
      feedback: ''
    });
    
    // Show success message
    showToast({
      type: 'success',
      message: 'Appraisal submitted successfully'
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Write Self-Appraisal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements <span className="text-red-500">*</span>
              </label>
              <textarea
                id="achievements"
                name="achievements"
                rows={4}
                value={formData.achievements}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your key achievements during this period..."
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
                rows={3}
                value={formData.challenges}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe any challenges you faced and how you addressed them..."
              />
            </div>
            
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                Goals for Next Period <span className="text-red-500">*</span>
              </label>
              <textarea
                id="goals"
                name="goals"
                rows={3}
                value={formData.goals}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="What are your goals for the upcoming period..."
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
                value={formData.skillsImproved}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="List skills you've developed or improved..."
              />
            </div>
            
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={3}
                value={formData.feedback}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any other feedback or comments you'd like to share..."
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Submit Appraisal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteAppraisal;