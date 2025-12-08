// import React, { useState, useEffect } from 'react';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import AdminTopbar from '../../components/admin/AdminTopbar';

// const AdminChats = ({ userData, onLogout }) => {
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       // Demo data
//       setChats([
//         {
//           id: 1,
//           studentName: 'Rahul Sharma',
//           studentId: 'STU001',
//           question: 'Need information about scholarship deadlines',
//           status: 'pending',
//           timestamp: '10:30 AM',
//           priority: 'high'
//         },
//         {
//           id: 2,
//           studentName: 'Priya Patel',
//           studentId: 'STU002',
//           question: 'Hostel fee structure query',
//           status: 'assigned',
//           timestamp: '9:45 AM',
//           priority: 'medium'
//         },
//         {
//           id: 3,
//           studentName: 'Amit Kumar',
//           studentId: 'STU003',
//           question: 'Exam schedule clarification',
//           status: 'resolved',
//           timestamp: 'Yesterday',
//           priority: 'low'
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'assigned': return 'bg-blue-100 text-blue-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <AdminSidebar activePage="chats" />
      
//       <div className="flex-1 flex flex-col ml-64">
//         <AdminTopbar 
//           userData={userData} 
//           onLogout={onLogout} 
//           title="Live Chats Management" 
//           subtitle="Monitor and manage student queries"
//         />
        
//         <div className="flex-1 p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
//             {/* Chats List */}
//             <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Active Chats</h3>
//                 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
//                   {chats.length}
//                 </span>
//               </div>
              
//               {loading ? (
//                 <div className="flex flex-col items-center justify-center py-12 text-gray-500">
//                   <i className="fas fa-spinner fa-spin text-2xl mb-3"></i>
//                   <p>Loading chats...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {chats.map(chat => (
//                     <div 
//                       key={chat.id}
//                       className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
//                         selectedChat?.id === chat.id
//                           ? 'bg-blue-50 border-blue-300 shadow-md'
//                           : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
//                       }`}
//                       onClick={() => setSelectedChat(chat)}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
//                           <i className="fas fa-user-graduate text-sm"></i>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start mb-1">
//                             <h4 className="font-semibold text-gray-800 truncate">
//                               {chat.studentName}
//                             </h4>
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(chat.priority)}`}>
//                               {chat.priority}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 truncate mb-2">
//                             {chat.question}
//                           </p>
//                           <div className="flex justify-between items-center">
//                             <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(chat.status)}`}>
//                               {chat.status}
//                             </span>
//                             <span className="text-xs text-gray-500">{chat.timestamp}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Chat Details */}
//             <div className="lg:col-span-3 bg-white rounded-xl shadow-sm flex flex-col">
//               {selectedChat ? (
//                 <>
//                   <div className="p-6 border-b border-gray-200">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h2 className="text-xl font-bold text-gray-800">
//                           Chat with {selectedChat.studentName}
//                         </h2>
//                         <p className="text-gray-600">Student ID: {selectedChat.studentId}</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
//                           <i className="fas fa-comment"></i>
//                           Reply
//                         </button>
//                         <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
//                           <i className="fas fa-check"></i>
//                           Resolve
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1 p-6 overflow-y-auto">
//                     <div className="space-y-4">
//                       {/* Chat messages would go here */}
//                       <div className="text-center text-gray-500 py-8">
//                         <i className="fas fa-comments text-4xl mb-4 opacity-40"></i>
//                         <p>Chat interface will be displayed here</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-12">
//                   <i className="fas fa-comments text-5xl mb-4 opacity-40"></i>
//                   <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                     Select a chat to view
//                   </h3>
//                   <p className="text-gray-500 text-center">
//                     Choose a conversation from the list to view details and manage the chat
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminChats;






import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';

const AdminChats = ({ userData, onLogout }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      // Demo data
      setChats([
        {
          id: 1,
          studentName: 'Rahul Sharma',
          studentId: 'STU001',
          question: 'Need information about scholarship deadlines',
          status: 'pending',
          timestamp: '10:30 AM',
          priority: 'high'
        },
        {
          id: 2,
          studentName: 'Priya Patel',
          studentId: 'STU002',
          question: 'Hostel fee structure query',
          status: 'assigned',
          timestamp: '9:45 AM',
          priority: 'medium'
        },
        {
          id: 3,
          studentName: 'Amit Kumar',
          studentId: 'STU003',
          question: 'Exam schedule clarification',
          status: 'resolved',
          timestamp: 'Yesterday',
          priority: 'low'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="chats" />
      
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopbar 
          userData={userData} 
          onLogout={onLogout} 
          title="Live Chats Management" 
          subtitle="Monitor and manage student queries"
        />
        
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
            {/* Chats List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Active Chats</h3>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {chats.length}
                </span>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <i className="fas fa-spinner fa-spin text-2xl mb-3"></i>
                  <p>Loading chats...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedChat?.id === chat.id
                          ? 'bg-blue-50 border-blue-300 shadow-md'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                          <i className="fas fa-user-graduate text-sm"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-800 truncate">
                              {chat.studentName}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(chat.priority)}`}>
                              {chat.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-2">
                            {chat.question}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(chat.status)}`}>
                              {chat.status}
                            </span>
                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Details */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Chat with {selectedChat.studentName}
                        </h2>
                        <p className="text-gray-600">Student ID: {selectedChat.studentId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
                          <i className="fas fa-comment"></i>
                          Reply
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
                          <i className="fas fa-check"></i>
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-4">
                      {/* Chat messages would go here */}
                      <div className="text-center text-gray-500 py-8">
                        <i className="fas fa-comments text-4xl mb-4 opacity-40"></i>
                        <p>Chat interface will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-12">
                  <i className="fas fa-comments text-5xl mb-4 opacity-40"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Select a chat to view
                  </h3>
                  <p className="text-gray-500 text-center">
                    Choose a conversation from the list to view details and manage the chat
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChats;