// import React from 'react'
// import AdminSidebar from './AdminSidebar'
// import AdminTopbar from './AdminTopbar'

// const AdminPanel = ({ children }) => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <AdminSidebar />
      
//       <div className="flex-1 flex flex-col min-h-0">
//         <AdminTopbar />
        
//         <main className="flex-1 overflow-y-auto p-4"> {/* Reduced padding from p-6 to p-4 */}
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default AdminPanel
















// import React from 'react'
// import AdminPanel from '../../components/admin/AdminPanel'

// // SVG Icons
// const UsersIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//   </svg>
// )

// const TrendingUpIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//   </svg>
// )

// const ShieldIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// )

// const BarChart3Icon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//   </svg>
// )

// const AdminDashboard = () => {
//   const stats = [
//     { label: 'Total Users', value: '2,847', change: '+12.4%', icon: UsersIcon, color: 'blue' },
//     { label: 'Active Sessions', value: '1,234', change: '+8.2%', icon: TrendingUpIcon, color: 'green' },
//     { label: 'System Health', value: '99.8%', change: '+0.2%', icon: ShieldIcon, color: 'emerald' },
//     { label: 'Storage Used', value: '78%', change: '+5.1%', icon: BarChart3Icon, color: 'purple' },
//   ]

//   const recentActivities = [
//     { action: 'User login', user: 'john.doe@company.com', time: '2 minutes ago', status: 'success' },
//     { action: 'Password reset', user: 'sarah.wilson@company.com', time: '15 minutes ago', status: 'warning' },
//     { action: 'Role updated', user: 'mike.johnson@company.com', time: '1 hour ago', status: 'info' },
//     { action: 'System backup', user: 'System', time: '2 hours ago', status: 'success' },
//   ]

//   return (
//     <AdminPanel>
//       <div className="space-y-4">
//         {/* Header */}
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 text-sm">Welcome to your administration dashboard</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon
            
//             return (
//               <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow duration-200">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                     stat.color === 'blue' ? 'text-blue-600 bg-blue-50' :
//                     stat.color === 'green' ? 'text-green-600 bg-green-50' :
//                     stat.color === 'emerald' ? 'text-emerald-600 bg-emerald-50' :
//                     'text-purple-600 bg-purple-50'
//                   }`}>
//                     <Icon />
//                   </div>
//                   <span className={`text-xs font-medium ${
//                     stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
//                   }`}>
//                     {stat.change}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
//                 <p className="text-gray-600 text-sm">{stat.label}</p>
//               </div>
//             )
//           })}
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {/* Recent Activity */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
//             <div className="space-y-2">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors duration-200">
//                   <div className={`w-1.5 h-1.5 rounded-full ${
//                     activity.status === 'success' ? 'bg-green-500' :
//                     activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
//                   }`}></div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
//                     <p className="text-xs text-gray-500 truncate">{activity.user}</p>
//                   </div>
//                   <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-3">
//               <button className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-left">
//                 <UsersIcon />
//                 <p className="font-medium text-gray-900 text-sm mt-1">Manage Users</p>
//                 <p className="text-xs text-gray-500">User accounts</p>
//               </button>
//               <button className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-left">
//                 <BarChart3Icon />
//                 <p className="font-medium text-gray-900 text-sm mt-1">Analytics</p>
//                 <p className="text-xs text-gray-500">View reports</p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminPanel>
//   )
// }

// export default AdminDashboard










import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

const AdminPanel = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <AdminTopbar />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel