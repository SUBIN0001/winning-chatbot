import React, { useState } from "react";

const DEV_LOCAL_PATH = "/mnt/data/84322e27-37ed-48d9-9de5-87fae7e179c6.png";
const BACKEND_UPLOAD_BY_URL = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";
const BACKEND_MULTIPART_UPLOAD = "https://solutionseekers2.app.n8n.cloud/webhook-test/test";

export default function FileUploadModal({ type = "pdf", onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
      } else {
        alert("Only PDF or image files are accepted.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // DEV MODE: send the dev local path as the 'url' to the backend.
  // Set to false to actually upload file bytes to BACKEND_MULTIPART_UPLOAD.

 const handleUpload = async () => {
  if (!file) return alert("Please pick a file first.");
  setUploading(true);

  try {
    // ALWAYS send real binary files
    const fd = new FormData();
    fd.append("file", file);                 // <-- real binary file
    fd.append("type", type);
    fd.append("timestamp", new Date().toISOString());

    const resp = await fetch(BACKEND_MULTIPART_UPLOAD, {
      method: "POST",
      body: fd, // <-- DO NOT set Content-Type manually
    });

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      throw new Error(`multipart upload failed: ${resp.status} ${resp.statusText} ${t}`);
    }

    const json = await resp.json();
    onUpload && onUpload(json);
    alert("File uploaded to backend (multipart).");
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed: " + (err.message || err));
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Upload {type === "circular" ? "Circular" : "PDF Document"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2">
              Drag and drop your {type === "circular" ? "circular" : "PDF"} here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>

            <input type="file" id="file-upload" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
            <label
              htmlFor="file-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer transition-colors duration-200 inline-block"
            >
              Browse Files
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-file text-green-600"></i>
                <div className="flex-1">
                  <p className="font-medium text-green-800">{file.name}</p>
                  <p className="text-sm text-green-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button onClick={() => setFile(null)} className="text-green-600 hover:text-green-800">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-blue-500 mt-1"></i>
              <div>
                <p className="text-sm text-blue-800 font-medium">AI Processing</p>
                <p className="text-xs text-blue-600 mt-1">
                  This file will be processed by our RAG model and stored in Pinecone vector database for intelligent query
                  responses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-upload"></i>
                Upload & Process
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
