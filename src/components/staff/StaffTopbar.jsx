import React from 'react';

const StaffTopbar = ({ userData, onLogout, title, subtitle }) => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title || 'Staff Dashboard'}</h1>
        <p className="text-gray-600 text-sm">{subtitle || 'Manage your tasks and communications'}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-gray-50 py-2 px-4 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
            <i className="fas fa-user-tie"></i>
          </div>
          <div>
            <div className="font-medium text-sm text-gray-800">
              {userData?.user?.name || 'Staff User'}
            </div>
            <div className="text-gray-500 text-xs">Staff</div>
          </div>
        </div>
        
        <button 
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors duration-200 text-sm"
          onClick={onLogout}
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default StaffTopbar;