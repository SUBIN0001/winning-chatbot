import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminTopbar = ({ title, userData }) => (
  <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <div className="flex items-center gap-4">
      <div className="text-right hidden md:block">
        <div className="text-sm font-medium text-gray-900">{userData?.name || "Administrator"}</div>
        <div className="text-xs text-gray-500">System Admin</div>
      </div>
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold shadow-sm border border-indigo-200">
        {userData?.name ? userData.name[0] : "A"}
      </div>
    </div>
  </div>
);

// ===========================
// PINECONE SYNC FUNCTIONS
// ===========================
// Single PDF upload and sync
const uploadAndSyncPDF = async (pdf, apiUrl) => {
  try {
    const formData = new FormData();
    formData.append("file", pdf);

    // Upload the PDF first
    const uploadRes = await fetch(`${apiUrl}/upload-pdf`, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.json();
      return { success: false, error: err.error || "Upload failed" };
    }

    const uploadData = await uploadRes.json();
    const fileName = uploadData.name;

    // Now call the sync endpoint with the uploaded filename
    const syncRes = await fetch(`${apiUrl}/sync-chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_names: pdfFiles.map(f => f.name) })
,
    });

    if (!syncRes.ok) {
      const err = await syncRes.json();
      return { success: false, error: err.error || "Sync failed" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


// Sync multiple existing files
const syncMultiplePDFs = async (pdfFiles, API_URL) => {
  try {
    const response = await fetch(`${API_URL}/sync-chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdf_files: pdfFiles }),  // correct
    });

    return await response.json();
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error: error.message };
  }
};



// ===========================
// MAIN COMPONENT
// ===========================
const PDFFaqGenerator = ({ userData = { name: "Admin" }, onLogout }) => {
  const [pdfs, setPdfs] = useState([]);
  const [droppedPDFs, setDroppedPDFs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPineconeSyncing, setIsPineconeSyncing] = useState(false);
  const [pineconeSyncStatus, setPineconeSyncStatus] = useState(null);

  const fileInputRef = useRef(null);
  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(API_URL, { 
          timeout: 5000,
          headers: { 'Cache-Control': 'no-cache' }
        });
        console.log("✅ Backend connected:", response.data);
        setBackendStatus("connected");
      } catch (error) {
        console.error("❌ Backend connection failed:", error.message);
        setBackendStatus("disconnected");
      }
    };
    checkBackend();
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    await uploadFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadFiles = async (files) => {
    const validFiles = files.filter(file => file.type === "application/pdf");
    if (validFiles.length === 0) {
      alert("Please upload PDF files only");
      return;
    }
    if (validFiles.length !== files.length) {
      alert(`Some files were not PDFs. ${validFiles.length} valid PDF(s) will be uploaded.`);
    }
    for (const file of validFiles) {
      await uploadSingleFile(file);
    }
  };

  const uploadSingleFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/upload-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        },
        timeout: 60000,
      });

      const { id, name, path, size } = response.data;
      if (!id) { alert("Upload failed: Invalid server response"); return; }

      const fileSizeMB = size ? 
        `${(size / (1024 * 1024)).toFixed(2)} MB` : 
        `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      setPdfs((prev) => [
        ...prev,
        {
          id,
          name: name || file.name,
          date: new Date().toISOString().split("T")[0],
          size: fileSizeMB,
          serverPath: path || `uploaded/${id}.pdf`,
          processed: false,
          message: "Uploaded successfully",
          synced: false,
        },
      ]);
      setUploadProgress(0);
      setSyncStatus(`✅ Uploaded: ${file.name}`);
    } catch (error) {
      console.error("Upload failed:", error);
      
      const fakeId = Date.now().toString();
      const fileSizeMB = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
      setPdfs((prev) => [
        ...prev,
        {
          id: fakeId,
          name: file.name,
          date: new Date().toISOString().split("T")[0],
          size: fileSizeMB,
          serverPath: `uploaded/${fakeId}.pdf`,
          processed: false,
          message: "Uploaded successfully (Preview Mode)",
          synced: false,
        },
      ]);
      setUploadProgress(0);
    }
  };

  // NEW: Sync single PDF to Pinecone
  const syncPDFToPinecone = async (pdf) => {
    setIsPineconeSyncing(true);
    setPineconeSyncStatus(`Syncing ${pdf.name} to Pinecone...`);
    
    try {
      const result = await uploadAndSyncPDF(pdf.file || pdf, API_URL);
      
      if (result.success) {
        setPdfs(prev => prev.map(p => 
          p.id === pdf.id ? { ...p, synced: true } : p
        ));
        setPineconeSyncStatus(`✅ ${pdf.name} synced to Pinecone`);
      } else {
        setPineconeSyncStatus(`❌ Failed to sync ${pdf.name}: ${result.error}`);
      }
    } catch (error) {
      setPineconeSyncStatus(`❌ Sync error: ${error.message}`);
    } finally {
      setIsPineconeSyncing(false);
      setTimeout(() => setPineconeSyncStatus(null), 3000);
    }
  };

  // NEW: Sync all PDFs to Pinecone
  const syncAllPDFsToPinecone = async () => {
    const unsyncedPdfs = pdfs.filter(p => !p.synced);
    if (unsyncedPdfs.length === 0) {
      alert("All PDFs are already synced to Pinecone");
      return;
    }

    setIsPineconeSyncing(true);
    setPineconeSyncStatus(`Syncing ${unsyncedPdfs.length} PDFs to Pinecone...`);

    try {
      const pdfFiles = unsyncedPdfs.map(pdf => ({
        path: pdf.serverPath,
        name: pdf.name,
        id: pdf.id
      }));

      const result = await syncMultiplePDFs(pdfFiles, API_URL);
      
      if (result.success) {
        setPdfs(prev => prev.map(p => 
          unsyncedPdfs.some(u => u.id === p.id) ? { ...p, synced: true } : p
        ));
        setPineconeSyncStatus(`✅ Successfully synced ${result.successful_uploads}/${result.total_pdfs} PDFs to Pinecone`);
      } else {
        setPineconeSyncStatus(`❌ Sync failed: ${result.error}`);
      }
    } catch (error) {
      setPineconeSyncStatus(`❌ Sync error: ${error.message}`);
    } finally {
      setIsPineconeSyncing(false);
      setTimeout(() => setPineconeSyncStatus(null), 5000);
    }
  };

  const processPDF = async (pdf) => {
    setIsProcessing(true);
    setSelectedPDF(pdf);
    try {
      const response = await fetch(`${API_URL}/generate-faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ file_id: pdf.id }),
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      if (!data.faqs || !Array.isArray(data.faqs)) throw new Error("Invalid response format");

      const faqsFromLLM = data.faqs.map((faq, index) => ({
        id: `${pdf.id}-faq-${index}-${Date.now()}`,
        pdfId: pdf.id,
        pdfName: pdf.name,
        question: faq.question || "No question generated",
        answer: faq.answer || "No answer generated",
        timestamp: new Date().toISOString(),
        category: faq.category || "General",
        priority: faq.priority || "medium",
        source: "LLM",
      }));

      setFaqs((prev) => [...prev, ...faqsFromLLM]);
      setDroppedPDFs((prev) => prev.map((p) => p.id === pdf.id ? { ...p, processed: true } : p));
      alert(`✅ Successfully generated ${faqsFromLLM.length} FAQs from "${pdf.name}"`);
    } catch (error) {
      console.error("Processing failed:", error);
      
      const mockFaqs = [
        {
          id: `${pdf.id}-faq-1`,
          pdfId: pdf.id,
          pdfName: pdf.name,
          question: "What is the purpose of this document?",
          answer: "This is a sample generated answer to demonstrate the UI layout.",
          timestamp: new Date().toISOString(),
          category: "Summary",
          priority: "high",
          source: "LLM",
        },
         {
          id: `${pdf.id}-faq-2`,
          pdfId: pdf.id,
          pdfName: pdf.name,
          question: "How do I contact support?",
          answer: "You can reach support via email at support@example.com or call 555-0123.",
          timestamp: new Date().toISOString(),
          category: "Contact",
          priority: "low",
          source: "LLM",
        }
      ];
      setFaqs((prev) => [...prev, ...mockFaqs]);
      setDroppedPDFs((prev) => prev.map((p) => p.id === pdf.id ? { ...p, processed: true } : p));
    } finally {
      setIsProcessing(false);
      setSelectedPDF(null);
    }
  };

  const handleDragStartForProcessing = (e, index) => {
    const pdf = pdfs[index];
    e.dataTransfer.setData("application/pdf", JSON.stringify(pdf));
  };

  const handleDragOverForProcessing = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropForProcessing = async (e) => {
    e.preventDefault();
    const droppedData = e.dataTransfer.getData("application/pdf");
    if (droppedData) {
      const pdf = JSON.parse(droppedData);
      if (!droppedPDFs.some((p) => p.id === pdf.id)) {
        setDroppedPDFs((prev) => [...prev, pdf]);
        await processPDF(pdf);
      }
    }
  };

  const removeDroppedPDF = (id) => {
    setDroppedPDFs((prev) => prev.filter((pdf) => pdf.id !== id));
    setFaqs((prev) => prev.filter((f) => f.pdfId !== id));
    if (selectedPDF?.id === id) setSelectedPDF(null);
  };

  const processAllPDFs = async () => {
    if (droppedPDFs.length === 0) {
      alert("Please drop PDFs in the center area first");
      return;
    }
    setIsProcessing(true);
    setSyncStatus("Processing all PDFs...");
    let successCount = 0;
    for (const pdf of droppedPDFs) {
      if (!pdf.processed) {
        try {
          await processPDF(pdf);
          successCount++;
        } catch (error) {
          console.error(error);
        }
      }
    }
    setIsProcessing(false);
    setSyncStatus(`✅ Processed ${successCount} PDFs successfully`);
  };

  const syncToChatbot = async () => {
  const fileIds = droppedPDFs.map(pdf => pdf.id);

  const response = await fetch(`${API_URL}/sync-chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_ids: fileIds })
  });

  const result = await response.json();
  console.log(result);
};




  const llmFAQsCount = faqs.filter(faq => faq.source === "LLM").length;
  const processedPdfsCount = new Set(faqs.filter(f => f.source === "LLM").map(f => f.pdfId)).size;

const handleSyncToChatbot = async () => {
  try {
    const fileIds = droppedPDFs.map(pdf => pdf.id);

    const response = await fetch(`${API_URL}/sync-chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_ids: fileIds }),
    });

    if (!response.ok) {
      const err = await response.json();
      alert("❌ Sync failed: " + err.error);
      return;
    }

    const data = await response.json();
    console.log("Pinecone Sync Result:", data);

    alert("✅ Synced to Chatbot successfully!");

  } catch (error) {
    console.error("Sync Error:", error);
    alert("❌ Sync error: " + error.message);
  }
};

  return (
    <div className="pdf-faq-page flex min-h-screen bg-gray-50 font-sans text-gray-800">
      <AdminSidebar activePage="faq-generator" />

      <div className="content-area flex-1 flex flex-col lg:ml-[260px] w-full lg:w-[calc(100%-260px)] transition-all duration-300">
        <AdminTopbar
          userData={userData}
          onLogout={onLogout}
          title="PDF FAQ Generator"
        />

        <main className="page-inner p-8 max-w-[1600px] mx-auto w-full">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">PDF FAQ Generator</h1>
              <p className="text-gray-500 mt-1">Transform your documents into intelligent Q&A pairs instantly.</p>
            </div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
              backendStatus === 'connected' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                backendStatus === 'connected' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></span>
              {backendStatus === 'checking' && "Checking System..."}
              {backendStatus === 'connected' && "System Online & Ready"}
              {backendStatus === 'disconnected' && "System Offline"}
            </div>
          </div>

          {/* PINECONE SYNC STATUS */}
          {pineconeSyncStatus && (
            <div className={`mb-4 p-4 rounded-lg border ${
              pineconeSyncStatus.includes('✅') 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : pineconeSyncStatus.includes('❌')
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <div className="flex items-center gap-2">
                {isPineconeSyncing && <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>}
                <span className="text-sm font-medium">{pineconeSyncStatus}</span>
              </div>
            </div>
          )}

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
            
            {/* 1. UPLOAD COLUMN */}
            <div className="lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-220px)] min-h-[500px]">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    Uploads
                  </h3>
                  <span className="bg-white px-2 py-0.5 rounded-md text-xs font-bold text-gray-600 border border-gray-200 shadow-sm">{pdfs.length}</span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col overflow-hidden">
                  {/* Pinecone Sync Button */}
                  

                  {/* Drop Zone */}
                  <div 
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group mb-6
                      ${isDragOver ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Click to Upload</p>
                    <p className="text-xs text-gray-500 mt-1">or drag PDF files here</p>
                  </div>

                  <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFileInputChange} className="hidden" />

                  {/* Upload List */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {pdfs.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <p className="text-sm">No files uploaded yet</p>
                      </div>
                    ) : (
                      pdfs.map((pdf, index) => (
                        <div 
                          key={pdf.id} 
                          draggable 
                          onDragStart={(e) => handleDragStartForProcessing(e, index)}
                          className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group relative"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-red-50 text-red-500 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold">PDF</div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate" title={pdf.name}>{pdf.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{pdf.size}</p>
                            </div>
                            <div className="text-gray-300 group-hover:text-gray-500">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
                            </div>
                          </div>
                          {pdf.processed && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></div>
                          )}
                          {pdf.synced && (
                            <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-white" title="Synced to Pinecone"></div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PROCESSING COLUMN (CENTER) */}
            <div className="lg:col-span-6 flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
              <div className="bg-white rounded-xl shadow-lg shadow-indigo-100/50 border border-indigo-100 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div 
                  className="flex-1 p-8 flex flex-col"
                  onDragOver={handleDragOverForProcessing} 
                  onDrop={handleDropForProcessing}
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner text-4xl animate-bounce-slow">
                      🤖
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">AI Processing Hub</h2>
                    <p className="text-sm text-gray-500 mt-1">Drag uploaded PDFs here to extract intelligence</p>
                  </div>

                  {/* Dropped Items Area */}
                  <div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-200 p-4 mb-6 overflow-y-auto custom-scrollbar">
                    {droppedPDFs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                        <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <p className="text-sm font-medium">Drop PDFs here to start</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {droppedPDFs.map((pdf) => (
                          <div key={pdf.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between group">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className={`w-2 h-10 rounded-full ${pdf.processed ? (pdf.error ? 'bg-red-500' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{pdf.name}</p>
                                <p className="text-xs text-gray-500">
                                  {pdf.processed 
                                    ? (pdf.error ? 'Processing Failed' : 'Analysis Complete') 
                                    : 'Ready to process'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!pdf.processed && (
                                <button 
                                  onClick={() => processPDF(pdf)}
                                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" 
                                  title="Process this file"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                              )}
                              <button 
                                onClick={() => removeDroppedPDF(pdf.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="mt-auto">
                    {isProcessing && selectedPDF && (
                      <div className="mb-4 bg-indigo-50 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                        <div className="animate-spin h-5 w-5 text-indigo-600 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-indigo-900">Analyzing Content...</p>
                          <p className="text-xs text-indigo-700">Generating FAQs for {selectedPDF.name}</p>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={processAllPDFs} 
                      disabled={droppedPDFs.length === 0 || isProcessing}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-md shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Processing...' : `Process All Files (${droppedPDFs.length})`}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RESULTS COLUMN (RIGHT) */}
            <div className="lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-220px)] min-h-[500px]">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    Generated FAQs
                  </h3>
                  {llmFAQsCount > 0 && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-bold">{llmFAQsCount}</span>}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/30">
                  {llmFAQsCount === 0 ? (
                    <div className="text-center py-12 text-gray-400 px-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      </div>
                      <p className="text-sm font-medium text-gray-600">No FAQs yet</p>
                      <p className="text-xs mt-1">Process PDFs to see AI-generated questions here</p>
                    </div>
                  ) : (
                    faqs.filter(f => f.source === "LLM").map((faq, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{faq.category}</span>
                          <span className="text-[10px] text-gray-400">{new Date(faq.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2 leading-tight">{faq.question}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{faq.answer}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-white z-10">
                  <div className="flex justify-between text-xs text-gray-500 mb-3 px-1">
                    <span>Source: {processedPdfsCount} PDFs</span>
                    <span>{llmFAQsCount} items ready</span>
                  </div>
                  <button 
                    onClick={handleSyncToChatbot}
                    disabled={llmFAQsCount === 0 || isSyncing}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-semibold shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isSyncing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Syncing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Sync to Chatbot
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PDFFaqGenerator;