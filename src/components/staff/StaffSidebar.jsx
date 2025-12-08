// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const StaffSidebar = ({ activePage, onLogout }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     {
//       id: 'upload',
//       label: 'Upload Files',
//       icon: 'fas fa-upload',
//       path: '/staff/upload'
//     },
//     {
//       id: 'chat-reply',
//       label: 'Chat Replies',
//       icon: 'fas fa-comments',
//       path: '/staff/chat-reply'
//     }
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     navigate('/staff/login');
//   };

//   const isActive = (item) => {
//     if (activePage) {
//       return item.id === activePage;
//     }
//     return location.pathname === item.path;
//   };

//   return (
//     <div className="w-64 bg-linear-to-br from-blue-500 to-blue-700 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
//       {/* Sidebar Header */}
//       <div className="p-5 border-b border-blue-400">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
//             RS
//           </div>
//           <div>
//             <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
//             <p className="text-blue-200 text-sm">Staff Panel</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4">
//         <ul className="space-y-1">
//           {menuItems.map(item => (
//             <li key={item.id}>
//               <button
//                 className={`w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200 relative ${
//                   isActive(item) 
//                     ? 'bg-blue-400 text-white shadow-lg' 
//                     : 'text-blue-100 hover:bg-blue-400 hover:bg-opacity-30'
//                 }`}
//                 onClick={() => handleNavigation(item.path)}
//               >
//                 <i className={`${item.icon} w-5 text-center`}></i>
//                 <span className="flex-1">{item.label}</span>
//                 {isActive(item) && (
//                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-lg"></div>
//                 )}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Sidebar Footer */}
//       <div className="p-5 border-t border-blue-400">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
//             <i className="fas fa-user-tie text-sm"></i>
//           </div>
//           <div>
//             <div className="font-semibold text-sm">Staff Member</div>
//             <div className="text-blue-200 text-xs">Faculty</div>
//           </div>
//         </div>
//         <button 
//           className="w-full bg-blue-400 bg-opacity-30 border border-blue-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-400 transition-all duration-200"
//           onClick={handleLogout}
//         >
//           <i className="fas fa-sign-out-alt"></i>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StaffSidebar;














import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StaffSidebar = ({ activePage, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'upload',
      label: 'Upload Files',
      icon: 'fas fa-upload',
      path: '/staff/upload'
    },
    {
      id: 'chat-reply',
      label: 'Chat Replies',
      icon: 'fas fa-comments',
      path: '/staff/chat-reply'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/staff/login');
  };

  const isActive = (item) => {
    if (activePage) {
      return item.id === activePage;
    }
    return location.pathname === item.path;
  };

  return (
    <div className="w-64 bg-linear-to-br from-blue-500 to-blue-700 text-white fixed h-screen left-0 top-0 flex flex-col z-50">
      <div className="p-5 border-b border-blue-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
            RS
          </div>
          <div>
            <h2 className="text-lg font-bold">RAJ-Sahayak</h2>
            <p className="text-blue-200 text-sm">Staff Panel</p>
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
                    ? 'bg-blue-400 text-white shadow-lg' 
                    : 'text-blue-100 hover:bg-blue-400 hover:bg-opacity-30'
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

      <div className="p-5 border-t border-blue-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <i className="fas fa-user-tie text-sm"></i>
          </div>
          <div>
            <div className="font-semibold text-sm">Staff Member</div>
            <div className="text-blue-200 text-xs">Faculty</div>
          </div>
        </div>
        <button 
          className="w-full bg-blue-400 bg-opacity-30 border border-blue-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-400 transition-all duration-200"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;