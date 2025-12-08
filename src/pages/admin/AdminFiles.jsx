import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import FileUploadModal from '../../components/admin/FileUploadModal';
const API_URL = 'http://localhost:8000'; 
const AdminFiles = ({ userData, onLogout }) => {
  const [files, setFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('documents'); // 'documents' or 'faq-generator'
  
  // FAQ Generator States
  const [pdfs, setPdfs] = useState([]);
  const [droppedPDFs, setDroppedPDFs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();
  
  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchFiles();
    fetchUploadedPDFs();
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

  const fetchUploadedPDFs = () => {
    // Convert existing files to PDF list format
    const pdfList = files.map(file => ({
      id: file.id,
      name: file.name,
      date: file.uploadDate,
      size: file.size,
      serverPath: `/uploads/${file.name}`,
      processed: file.status === 'processed'
    }));
    setPdfs(pdfList);
  };

  // File Management Functions
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
    console.log('Downloading file:', file.name);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // FAQ Generator Functions
  const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files);

  for (const file of files) {
    if (file.type !== 'application/pdf') {
      alert('Please upload PDF files only');
      continue;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Uploading to:", `${API_URL}/upload-pdf`);
      const response = await fetch(`${API_URL}/upload-pdf`, {
        method: "POST",
        body: formData,  // DO NOT set Content-Type header
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (!response.ok) {
        throw new Error(data.detail || data.error || "Upload failed");
      }

      // Rest of your code...
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  }
};
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    const pdf = pdfs[index];
    e.dataTransfer.setData('application/pdf', JSON.stringify(pdf));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedData = e.dataTransfer.getData('application/pdf');
    
    if (droppedData) {
      const pdf = JSON.parse(droppedData);
      if (!droppedPDFs.some(item => item.id === pdf.id)) {
        setDroppedPDFs(prev => [...prev, pdf]);
        // Auto-process when dropped
        processPDF(pdf);
      }
    }
  };

  const processPDF = async (pdf) => {
    setIsProcessing(true);
    setSelectedPDF(pdf);

    try {
      // Simulate API call to generate FAQs
      setTimeout(() => {
        const generatedFaqs = Array.from({ length: 10 }, (_, i) => ({
          id: `${pdf.id}-${i}`,
          pdfId: pdf.id,
          pdfName: pdf.name,
          question: `Question ${i + 1} about ${pdf.name.split('.')[0]}`,
          answer: `This is answer ${i + 1} based on content from ${pdf.name}. This information is extracted from the uploaded document and will help students understand important concepts.`
        }));

        setFaqs(prev => [...prev, ...generatedFaqs]);

        setDroppedPDFs(prev =>
          prev.map(p =>
            p.id === pdf.id ? { ...p, processed: true } : p
          )
        );

        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      alert("Error: " + err.message);
      setIsProcessing(false);
    }
  };

  const removeDroppedPDF = (id) => {
    setDroppedPDFs(prev => prev.filter(pdf => pdf.id !== id));
    setFaqs(prev => prev.filter(faq => faq.pdfId !== id));
    if (selectedPDF?.id === id) {
      setSelectedPDF(null);
    }
  };

  const processAllPDFs = () => {
    if (droppedPDFs.length === 0) {
      alert('Please drop PDFs in the center area first');
      return;
    }

    setIsProcessing(true);
    droppedPDFs.forEach(pdf => {
      if (!pdf.processed) {
        processPDF(pdf);
      }
    });
  };

  const handleSyncToChatbot = () => {
    if (faqs.length === 0) {
      alert('No FAQs to sync. Please process some PDFs first.');
      return;
    }
    
    // This should connect to your n8n workflow
    alert(`Syncing ${faqs.length} FAQs to chatbot via n8n workflow...\n\nThe FAQs will now be available for the AI assistant to use when answering student questions.`);
    
    // Example n8n API call
    // fetch('https://your-n8n-workflow-url/webhook', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ faqs })
    // })
  };

  const totalFAQs = faqs.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="files" />
      
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopbar 
          userData={userData} 
          onLogout={onLogout} 
          title="File Management" 
          subtitle="Manage documents or generate FAQs for chatbot"
        />
        
        <div className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'documents'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="fas fa-folder mr-2"></i>
                  Document Library
                </button>
                <button
                  onClick={() => setActiveTab('faq-generator')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'faq-generator'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="fas fa-question-circle mr-2"></i>
                  FAQ Generator
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'documents' ? (
            <>
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
            </>
          ) : (
            /* FAQ Generator Interface */
            <div className="pdf-manager-container">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">PDF FAQ Generator</h1>
              <p className="text-gray-600 mb-8">Drag PDFs from left to center to generate FAQs, then sync with chatbot</p>
              
              <div className="layout-container">
                {/* Left Side - PDF Upload and List */}
                <div className="left-panel">
                  <div className="upload-section mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Upload PDFs</h3>
                    <div className="upload-area">
                      <input
                        type="file"
                        id="pdf-upload"
                        accept=".pdf"
                        multiple
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="pdf-upload" className="upload-button cursor-pointer bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors">
                        <div className="text-blue-500 text-3xl mb-2">📁</div>
                        <div className="font-medium text-gray-700">Click to Upload PDF</div>
                        <div className="text-sm text-gray-500 mt-1">or drag and drop</div>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Max file size: 10MB • PDF only</p>
                    </div>
                  </div>

                  <div className="pdf-list-section">
                    <h3 className="font-semibold text-gray-800 mb-3">Uploaded PDFs ({pdfs.length})</h3>
                    <div className="pdf-list space-y-2">
                      {pdfs.map((pdf, index) => (
                        <div
                          key={pdf.id}
                          className="pdf-item bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-move"
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-red-500 text-xl">📄</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-800 truncate">{pdf.name}</div>
                              <div className="flex text-xs text-gray-500 gap-2">
                                <span>{pdf.date}</span>
                                <span>•</span>
                                <span>{pdf.size}</span>
                              </div>
                            </div>
                            <div className="text-gray-400">⋮⋮</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center - Drag and Drop Zone */}
                <div className="center-panel">
                  <div
                    className="drop-zone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="drop-zone-content text-center p-8">
                      <div className="text-4xl mb-3">⬇️</div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">Drag PDFs Here</h3>
                      <p className="text-gray-600 mb-4">Drop PDFs to generate FAQs</p>
                      
                      {droppedPDFs.length > 0 && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                          onClick={processAllPDFs}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Process All PDFs'}
                        </button>
                      )}
                      
                      <div className="dropped-pdfs mt-4 space-y-2">
                        {droppedPDFs.map(pdf => (
                          <div key={pdf.id} className="dropped-pdf-item bg-white border border-gray-300 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">📄</span>
                                <span className="font-medium text-gray-800 truncate max-w-[200px]">{pdf.name}</span>
                                {pdf.processed && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✓ Processed</span>
                                )}
                              </div>
                              <button
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeDroppedPDF(pdf.id)}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-4">
                        {droppedPDFs.length === 0
                          ? 'Drag PDFs from the left panel'
                          : `${droppedPDFs.length} PDF(s) ready for processing`}
                      </p>
                    </div>
                  </div>

                  {isProcessing && selectedPDF && (
                    <div className="selected-pdf-info bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Currently Processing:</h4>
                      <div className="selected-pdf flex items-center gap-2">
                        <span className="text-gray-600">📄</span>
                        <span className="font-medium text-gray-800">{selectedPDF.name}</span>
                        <span className="text-blue-600 text-sm flex items-center gap-1">
                          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </span>
                      </div>
                    </div>
                  )}

                  {faqs.length > 0 && (
                    <div className="stats-info bg-white border border-gray-200 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Processing Stats:</h4>
                      <div className="stats-grid grid grid-cols-2 gap-4">
                        <div className="stat-item">
                          <div className="text-sm text-gray-600">Total PDFs Processed</div>
                          <div className="text-xl font-bold text-gray-900">{new Set(faqs.map(f => f.pdfId)).size}</div>
                        </div>
                        <div className="stat-item">
                          <div className="text-sm text-gray-600">Total FAQs Generated</div>
                          <div className="text-xl font-bold text-gray-900">{totalFAQs}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Generated FAQs */}
                <div className="right-panel">
                  <div className="faq-header flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg">Generated FAQs</h3>
                    <div className="faq-count bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Total: {totalFAQs}
                    </div>
                  </div>

                  <div className="faq-controls mb-4">
                    <button
                      className="text-sm text-gray-600 hover:text-red-600"
                      onClick={() => setFaqs([])}
                      disabled={faqs.length === 0}
                    >
                      Clear All FAQs
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="empty-faqs text-center py-8">
                      <div className="text-4xl text-gray-300 mb-3">❓</div>
                      <h3 className="font-medium text-gray-600 mb-2">No FAQs Generated Yet</h3>
                      <p className="text-gray-500 text-sm">Drop PDFs in the center area to generate FAQs</p>
                    </div>
                  ) : (
                    <div className="faq-list space-y-3 max-h-[400px] overflow-y-auto">
                      {faqs.map(faq => (
                        <div key={faq.id} className="faq-item bg-white border border-gray-200 rounded-lg p-4">
                          <div className="faq-header-small flex justify-between text-xs text-gray-500 mb-2">
                            <span className="truncate">{faq.pdfName}</span>
                            <span>#{faq.id.split('-')[1]}</span>
                          </div>
                          <div className="faq-question mb-2">
                            <div className="flex gap-2">
                              <span className="font-bold text-blue-600">Q:</span>
                              <span className="text-gray-800">{faq.question}</span>
                            </div>
                          </div>
                          <div className="faq-answer">
                            <div className="flex gap-2">
                              <span className="font-bold text-green-600">A:</span>
                              <span className="text-gray-600">{faq.answer}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="chatbot-sync-section mt-6 pt-4 border-t border-gray-200">
                    <div className="sync-info mb-3">
                      <div className="text-sm font-medium text-gray-800">
                        Ready to sync {totalFAQs} FAQs to chatbot
                      </div>
                      <div className="text-xs text-gray-500">
                        This will update your n8n workflow with new FAQs
                      </div>
                    </div>
                    <button
                      className="sync-button w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSyncToChatbot}
                      disabled={totalFAQs === 0}
                    >
                      <span className="text-lg">🤖</span>
                      Sync to Chatbot (n8n)
                    </button>
                    <p className="sync-note text-xs text-gray-500 mt-2 text-center">
                      FAQs will be sent to your n8n workflow for AI assistant integration
                    </p>
                  </div>
                </div>
              </div>
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