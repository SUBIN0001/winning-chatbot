// import React from 'react'

// // SVG Icons
// const BellIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-6.24M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// )

// const SearchIcon = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// )

// const UserIcon = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//   </svg>
// )

// const ChevronDownIcon = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//   </svg>
// )

// const AdminTopbar = () => {
//   return (
//     <div className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <SearchIcon />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
//             />
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
//             <BellIcon />
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
//           </button>
          
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
//               <UserIcon />
//             </div>
//             <div className="text-left">
//               <p className="text-sm font-medium text-gray-900">Administrator</p>
//               <p className="text-xs text-gray-500">System Admin</p>
//             </div>
//             <ChevronDownIcon />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminTopbar





























import React from 'react'

const AdminTopbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome back, Admin!</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Administrator</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTopbar