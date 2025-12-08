
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App'; // Import AuthContext

const AdminSidebar = ({ activePage }) => { // Remove onLogout from props
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext); // Use logout from context

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/admin/dashboard'
    },
    // In AdminSidebar.jsx, add to the menuItems array:
{
  id: 'faq-generator',
  label: 'FAQ Generator',
  icon: 'fas fa-question-circle',
  path: '/admin/faq-generator'
},
    
    {
      id: 'staff',
      label: 'Staff Management',
      icon: 'fas fa-user-tie',
      path: '/admin/staff'
    },
 
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'fas fa-chart-bar',
      path: '/admin/analytics'
    },
    
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fas fa-cog',
      path: '/admin/settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log('Logout clicked from sidebar');
    logout(); // Use logout from context
  };

  const isActive = (item) => {
    if (activePage) {
      return item.id === activePage;
    }
    return location.pathname === item.path;
  };

  return (
    <div className="w-64 bg-linear-to-br from-purple-600 to-purple-800 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
      <div className="p-5 border-b border-purple-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
            RS
          </div>
          <div>
            <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
            <p className="text-purple-200 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
                  isActive(item) 
                    ? 'bg-purple-400 text-white shadow-lg' 
                    : 'text-purple-100 hover:bg-purple-400 hover:bg-opacity-30'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <i className={`${item.icon} w-5 text-center`}></i>
                <span className="flex-1">{item.label}</span>
                {isActive(item) && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5 border-t border-purple-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
            
            <i className="fas fa-user-shield text-sm"></i>
          </div>
          <div>
            <div className="font-semibold text-sm">Administrator</div>
            <div className="text-purple-200 text-xs">Super Admin</div>
          </div>
        </div>
        <button 
          className="w-full bg-purple-400 bg-opacity-30 border border-purple-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-400 transition-all duration-200"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;