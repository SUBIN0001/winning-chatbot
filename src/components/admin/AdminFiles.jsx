import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import FileUploadModal from '../../components/admin/FileUploadModal';

const AdminFiles = ({ userData, onLogout }) => {
  const [files, setFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      // Demo data
      setFiles([
        {
          id: 1,
          name: 'Scholarship_Notification_2025.pdf',
          type: 'pdf',
          size: '2.4 MB',
          uploadedBy: 'Admin User',
          uploadDate: '2024-01-15',
          category: 'Scholarship',
          downloads: 147,
          status: 'processed'
        },
        {
          id: 2,
          name: 'Fee_Structure_2024-25.pdf',
          type: 'pdf',
          size: '1.8 MB',
          uploadedBy: 'Dr. Sharma',
          uploadDate: '2024-01-10',
          category: 'Fees',
          downloads: 203,
          status: 'processed'
        },
        {
          id: 3,
          name: 'Hostel_Rules_Regulations.pdf',
          type: 'pdf',
          size: '3.1 MB',
          uploadedBy: 'Ms. Patel',
          uploadDate: '2024-01-05',
          category: 'Hostel',
          downloads: 89,
          status: 'processing'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return 'fas fa-file-pdf text-red-500';
      case 'doc': case 'docx': return 'fas fa-file-word text-blue-500';
      case 'xls': case 'xlsx': return 'fas fa-file-excel text-green-500';
      case 'jpg': case 'png': case 'jpeg': return 'fas fa-file-image text-yellow-500';
      default: return 'fas fa-file text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = async (file) => {
    // Download logic here
    console.log('Downloading file:', file.name);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="files" />
      
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopbar 
          userData={userData} 
          onLogout={onLogout} 
          title="File Management" 
          subtitle="Manage all documents and circulars"
        />
        
        <div className="flex-1 p-6">
          {/* Header with Upload Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Document Library</h2>
              <p className="text-gray-600">Manage all uploaded documents and circulars</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setUploadType('circular');
                  setShowUploadModal(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <i className="fas fa-bullhorn"></i>
                Upload Circular
              </button>
              <button 
                onClick={() => {
                  setUploadType('pdf');
                  setShowUploadModal(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <i className="fas fa-file-pdf"></i>
                Upload PDF
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{files.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">PDF Documents</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{files.filter(f => f.type === 'pdf').length}</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-pdf text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {files.reduce((sum, file) => sum + file.downloads, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-download text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {files.filter(f => f.status === 'processed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-white text-lg"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map(file => (
              <div key={file.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <i className={`text-2xl ${getFileIcon(file.type)}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate mb-1">
                      {file.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {file.size} • {file.category} • {file.downloads} downloads
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      onClick={() => handleDownload(file)}
                      title="Download"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      onClick={() => handleDeleteFile(file.id)}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Uploaded by: {file.uploadedBy}</span>
                    <span>Date: {file.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {files.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <i className="fas fa-folder-open text-5xl mb-4 opacity-40"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No documents uploaded yet
              </h3>
              <p className="text-gray-500">
                Upload your first document to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <FileUploadModal 
          type={uploadType}
          onClose={() => setShowUploadModal(false)}
          onUpload={(file) => {
            console.log('Uploading file:', file);
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminFiles;