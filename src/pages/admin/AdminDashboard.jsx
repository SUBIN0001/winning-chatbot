import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminSidebar from '../../components/admin/AdminSidebar';
import { AuthContext } from '../../App';

import {
  FaUsers,
  FaComments,
  FaFileAlt,
  FaFilePdf,
  FaUserCog,
  FaChartBar,
  FaBullhorn,
  FaUserShield,
  FaUserPlus,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaTimes,
  FaUserTie,
  FaBook
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');

  // 🔥 NEW: MongoDB Stats State
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalQueries: 0
  });

  // 🔥 NEW: Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/stats");
        setDashboardStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  // 🔥 Stats Grid – now uses backend data
  const stats = [
    {
      title: 'Total Students',
      value: dashboardStats.totalUsers,  // <-- dynamic
      icon: FaUsers,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Queries',
      value: dashboardStats.totalQueries,  // <-- dynamic
      icon: FaComments,
      color: 'bg-red-500',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Pending Chats',
      value: '23',
      icon: FaComments,
      color: 'bg-yellow-500',
      change: '-8%',
      trend: 'down'
    },
    {
      title: 'Documents',
      value: '156',
      icon: FaFileAlt,
      color: 'bg-green-500',
      change: '+15%',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Knowledge Base',
      description: 'Manage knowledge base content',
      icon: FaBook,
      color: 'bg-blue-100 text-blue-600',
      action: () => navigate('/admin/knowledge-base')
    },
    {
      title: 'File Management',
      description: 'Upload and manage PDF files',
      icon: FaFilePdf,
      color: 'bg-red-100 text-red-600',
      action: () => navigate('/admin/faq-generator')
    },
    {
      title: 'Manage Staff',
      description: 'Add or remove staff members',
      icon: FaUserCog,
      color: 'bg-yellow-100 text-yellow-600',
      action: () => navigate('/admin/staff')
    },
    {
      title: 'View Analytics',
      description: 'Check system performance',
      icon: FaChartBar,
      color: 'bg-green-100 text-green-600',
      action: () => navigate('/admin/analytics')
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="dashboard" />

      <div className="flex-1 flex flex-col ml-64">

        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back, Administrator</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">

          {/* Stats Grid - UPDATED */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border group cursor-pointer"
                  onClick={action.action}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-600 group-hover:text-black">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;








// ^ dynamic values







// ? testing working... 

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalQueries: 0,
//   });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/dashboard/stats")
  //     .then((response) => {
  //       console.log("API Response:", response.data);

  //       setStats({
  //         totalUsers: response.data.totalUsers,
  //         totalQueries: response.data.totalQueries,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching stats:", error);
  //     });
  // }, []);


//   useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/dashboard/stats");
//       setStats(response.data);
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   fetchStats();
// }, []);


//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Total Users: {stats.totalUsers}</p>
//       <p>Total Queries: {stats.totalQueries}</p>
//     </div>
//   );
// }