import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminWidget = ({ isAuthenticated, setIsAuthenticated, onCloseChatbot }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleAdminClick = () => {
    // Close chatbot first
    if (onCloseChatbot) {
      onCloseChatbot()
    }
    // Then navigate to login after a small delay
    setTimeout(() => {
      navigate('/admin/login')
    }, 100)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 shadow-lg rounded-lg p-3 hover:shadow-xl flex items-center space-x-2"
      >
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">A</span>
        </div>
        <span className="font-semibold text-gray-900 text-sm">Admin</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-3">
          <div className="space-y-2">
            <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
              Login Required
            </div>
            <button
              onClick={handleAdminClick}
              className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminWidget