import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  ClipboardList, 
  FileText, 
  Settings, 
  X, 
  ChevronRight,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Manage Attendance', icon: <Clock size={20} />, path: '/manage-attendance' },
    { name: 'Apply for Leave', icon: <Calendar size={20} />, path: '/apply-leave' },
    { name: 'Manage Leaves', icon: <ClipboardList size={20} />, path: '/manage-leaves' },
    { name: 'Write Appraisal', icon: <FileText size={20} />, path: '/write-appraisal' },
    { name: 'Manage Appraisals', icon: <FileText size={20} />, path: '/manage-appraisals' }
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-navy-800 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ backgroundColor: '#1a2e51' }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-navy-700">
          <div className="flex items-center">
            <span className="text-xl font-semibold tracking-wide">EmpowerHR</span>
          </div>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X size={20} className="text-gray-300" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-navy-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Software Engineer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Toggle button for mobile (shown when sidebar is closed) */}
      {!isOpen && (
        <button
          className="fixed md:hidden bottom-4 left-4 z-20 p-2 rounded-full bg-blue-600 text-white shadow-lg"
          onClick={toggleSidebar}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;