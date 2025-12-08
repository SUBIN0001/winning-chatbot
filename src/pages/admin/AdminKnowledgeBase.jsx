// import React, { useState } from 'react';

// const KnowledgeBase = () => {
//   const [files, setFiles] = useState([
//     { id: 1, name: 'User Manual.pdf', type: 'pdf', date: '2023-10-15', size: '2.4 MB' },
//     { id: 2, name: 'FAQ.docx', type: 'word', date: '2023-10-10', size: '1.1 MB' },
//     { id: 3, name: 'Product Specifications.txt', type: 'text', date: '2023-10-05', size: '0.8 MB' },
//   ]);

//   const handleFileUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     const newFiles = uploadedFiles.map((file, index) => ({
//       id: files.length + index + 1,
//       name: file.name,
//       type: getFileType(file.name),
//       date: new Date().toISOString().split('T')[0],
//       size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
//     }));
    
//     setFiles(prev => [...newFiles, ...prev]);
//     alert(`${uploadedFiles.length} file(s) uploaded successfully!`);
//     e.target.value = '';
//   };

//   const getFileType = (filename) => {
//     if (filename.endsWith('.pdf')) return 'pdf';
//     if (filename.endsWith('.docx') || filename.endsWith('.doc')) return 'word';
//     if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) return 'excel';
//     return 'text';
//   };

//   const getFileIcon = (type) => {
//     switch (type) {
//       case 'pdf': return '📄';
//       case 'word': return '📝';
//       case 'excel': return '📊';
//       default: return '📃';
//     }
//   };

//   return (
//     <div className="flex-1 p-8 overflow-y-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Knowledge Base</h2>
//         <p className="text-gray-600">Manage your chatbot's knowledge and responses</p>
//       </div>

//       {/* Upload Area */}
//       <div className="bg-white p-8 rounded-xl shadow-card border-2 border-dashed border-blue-500 text-center mb-8">
//         <div className="text-5xl text-blue-500 mb-4">📤</div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Files to Knowledge Base</h3>
//         <p className="text-gray-600 mb-6">Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)</p>
//         <label className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block">
//           <span className="mr-2">📁</span> Upload Files
//           <input
//             type="file"
//             multiple
//             onChange={handleFileUpload}
//             className="hidden"
//             accept=".pdf,.doc,.docx,.txt"
//           />
//         </label>
//       </div>

//       {/* Files List */}
//       <div className="space-y-4">
//         {files.map((file) => (
//           <div key={file.id} className="bg-white p-6 rounded-xl shadow-card flex justify-between items-center">
//             <div className="flex items-center">
//               <div className="text-3xl mr-4">{getFileIcon(file.type)}</div>
//               <div>
//                 <h3 className="font-semibold text-gray-800 text-lg">{file.name}</h3>
//                 <p className="text-gray-600 text-sm">Uploaded: {file.date} | Size: {file.size}</p>
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 flex items-center">
//                 <span className="mr-2">✏️</span> Edit
//               </button>
//               <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-300 flex items-center">
//                 <span className="mr-2">🔄</span> Sync with Chatbot
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KnowledgeBase;







import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import ChatInterface from '../../components/admin/ChatInterface';

const AdminKnowledgeBase = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('chat');

  const documents = [
    {
      id: 1,
      title: 'Scholarship Guidelines 2024',
      category: 'Admissions',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'Processed'
    },
    {
      id: 2,
      title: 'Academic Calendar 2024-25',
      category: 'Academics',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      status: 'Processed'
    },
    {
      id: 3,
      title: 'Hostel Rules and Regulations',
      category: 'Campus Life',
      type: 'PDF',
      size: '3.1 MB',
      uploadDate: '2024-01-05',
      status: 'Processing'
    }
  ];

  const categories = [
    { name: 'Admissions', count: 12, color: 'bg-blue-500' },
    { name: 'Academics', count: 8, color: 'bg-green-500' },
    { name: 'Financial', count: 6, color: 'bg-yellow-500' },
    { name: 'Campus Life', count: 4, color: 'bg-purple-500' },
    { name: 'Examinations', count: 7, color: 'bg-red-500' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="knowledge-base" />
      
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopbar 
          userData={userData} 
          onLogout={onLogout} 
          title="Knowledge Base" 
          subtitle="AI-powered document intelligence and chat"
        />
        
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              <i className="fas fa-robot mr-2"></i>
              AI Chat Interface
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              <i className="fas fa-file-alt mr-2"></i>
              Document Library
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <i className="fas fa-folder mr-2"></i>
              Categories
            </button>
          </div>

          {activeTab === 'chat' && (
            <div className="h-[calc(100vh-240px)]">
              <ChatInterface userData={userData} />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Documents</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file text-white text-lg"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Processed</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">142</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-check-circle text-white text-lg"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-folder text-white text-lg"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">AI Queries</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">2,347</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-robot text-white text-lg"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <i className="fas fa-file-pdf text-red-500 text-lg mr-3"></i>
                              <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {doc.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.uploadDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              doc.status === 'Processed' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <i className="fas fa-folder text-white text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.count} documents</p>
                    </div>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminKnowledgeBase;