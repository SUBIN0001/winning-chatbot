import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PDFFaqGenerator from './pages/admin/PDFFaqGenerator'; // Add this import

// Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminStaff from './pages/admin/AdminStaff'
import AdminChats from './pages/admin/AdminChats'
import AdminKnowledgeBase from './pages/admin/AdminKnowledgeBase'
import AdminSettings from './pages/admin/AdminSettings'

// Components
import ChatBot from './components/chatbot/ChatBot'
import AdminWidget from './components/admin/AdminWidget'
import AdminFiles from './components/admin/AdminFiles'
import StarSpinner from './components/common/StarSpinner'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserShield, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUserShield, faUser)

// Create Auth Context for better state management
export const AuthContext = React.createContext()


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext)
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <StarSpinner size="large" text="Checking authentication..." />
        </div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext)
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <StarSpinner size="large" text="Checking authentication..." />
        </div>
      </div>
    )
  }
  
  return !isAuthenticated ? children : <Navigate to="/admin/dashboard" replace />
}

// Component to handle chatbot visibility
const ChatBotHandler = ({ showChatBot, setShowChatBot }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Don't show chatbot on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  if (!isHomePage) return null

  return (
    <>
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
      <AdminWidget onCloseChatbot={() => setShowChatBot(false)} />
    </>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showChatBot, setShowChatBot] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken')
        const authStatus = localStorage.getItem('isAuthenticated')
        
        console.log('🔐 Auth check - Token exists:', !!token, 'Auth Status:', authStatus)
        
        // Only set authenticated if BOTH token and authStatus exist
        if (token && authStatus === 'true') {
          console.log('✅ User is authenticated')
          setIsAuthenticated(true)
        } else {
          console.log('❌ User is NOT authenticated')
          setIsAuthenticated(false)
          // Clear any invalid data
          localStorage.removeItem('adminToken')
          localStorage.removeItem('isAuthenticated')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
        // Clear all auth data on error
        localStorage.removeItem('adminToken')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('savedEmail')
      } finally {
        setIsLoading(false)
        console.log('🏁 Auth check completed')
      }
    }

    checkAuth()
  }, [])

  // Auth context value
  const authContextValue = {
    isAuthenticated,
    isLoading,
    setIsAuthenticated: (status) => {
      console.log('🔄 Setting auth status to:', status)
      setIsAuthenticated(status)
      if (status) {
        localStorage.setItem('isAuthenticated', 'true')
      } else {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('savedEmail')
      }
    },
    login: (token) => {
      console.log('🔑 Login called with token')
      localStorage.setItem('adminToken', token)
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
    },
    logout: () => {
      console.log('🚪 Logout called')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('savedEmail')
      setIsAuthenticated(false)
      window.location.href = '/'
    }
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <StarSpinner size="large" text="Initializing Raj-Sahayak..." />
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ChatBotHandler 
            showChatBot={showChatBot}
            setShowChatBot={setShowChatBot}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/admin/login" element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            } />
            
            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/files" element={
              <ProtectedRoute>
                <AdminFiles />
              </ProtectedRoute>
            } />
            
            {/* PDF FAQ Generator Route */}
            <Route path="/admin/faq-generator" element={
              <ProtectedRoute>
                <PDFFaqGenerator />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/staff" element={
              <ProtectedRoute>
                <AdminStaff />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/knowledge-base" element={
              <ProtectedRoute>
                <AdminKnowledgeBase />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/chats" element={
              <ProtectedRoute>
                <AdminChats />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
            
            {/* Redirects */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

// Extract HomePage to separate component for better readability
const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center max-w-2xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-purple-600">Raj-Sahayak</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your multilingual AI campus assistant is ready to help!
        </p>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-md mx-auto">
          <p className="text-gray-700 mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">💬</span>
            Chat with the AI Assistant below
          </p>
          <p className="text-gray-700 flex items-center justify-center gap-2">
            <span className="text-2xl">🔧</span>
            Click Admin widget for management
          </p>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { icon: "🌐", title: "Multilingual", desc: "Supports Hindi, English, Tamil, Telugu, Gujarati & Marathi" },
          { icon: "🎤", title: "Voice Enabled", desc: "Speak naturally in your preferred language" },
          { icon: "📚", title: "Verified Sources", desc: "Answers from official college documents only" }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default App