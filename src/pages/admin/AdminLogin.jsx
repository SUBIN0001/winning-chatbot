// !Default 
//import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const AdminLogin = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsAuthenticated(true)
//     navigate('/admin/dashboard')
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-lg border border-gray-200 p-8">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-white text-2xl">A</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
//             <p className="text-gray-600 mt-2">Access the administration dashboard</p>
//           </div>
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="admin@company.com"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
//             >
//               Sign In
//             </button>
//           </form>
          
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <p className="text-xs text-gray-600 text-center">
//               Demo: Enter any credentials to proceed
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminLogin




// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const AdminLogin = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1500))
    
//     setIsAuthenticated(true)
//     setIsLoading(false)
//     navigate('/admin/dashboard')
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   // Demo credentials for quick login
//   const handleQuickLogin = (demoEmail, demoPassword) => {
//     setFormData({
//       email: demoEmail,
//       password: demoPassword
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header Section */}
//         <div className="text-center">
//           <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-600">Sign in to your admin dashboard</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                   placeholder="admin@college.edu"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing In...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           {/* Demo Credentials Section */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600 text-center mb-4">
//               Quick demo access
//             </p>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() => handleQuickLogin('admin@college.edu', 'admin123')}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center"
//               >
//                 Admin Account
//               </button>
//               <button
//                 onClick={() => handleQuickLogin('staff@college.edu', 'staff123')}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center"
//               >
//                 Staff Account
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Raj-Sahayak Admin Portal v1.0
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminLogin




// * before spinner


// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../App'

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [showForgotPassword, setShowForgotPassword] = useState(false)
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
//   const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
//   const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)
  
//   const { login } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       // Simulate successful login with a token
//       const mockToken = 'admin-auth-token-' + Date.now()
      
//       // Save remember me preference
//       if (rememberMe) {
//         localStorage.setItem('rememberMe', 'true')
//         localStorage.setItem('savedEmail', formData.email)
//       } else {
//         localStorage.removeItem('rememberMe')
//         localStorage.removeItem('savedEmail')
//       }
      
//       // Use the login function from context
//       login(mockToken)
      
//       // Navigate to dashboard after successful login
//       navigate('/admin/dashboard')
      
//     } catch (error) {
//       console.error('Login failed:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // ... rest of the AdminLogin component code remains the same
//   // (Keep all the form fields, forgot password modal, etc.)


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleQuickLogin = (demoEmail, demoPassword) => {
//     if (isLoading) return;
    
//     setFormData({
//       email: demoEmail,
//       password: demoPassword
//     })
//   }

//   const handleForgotPassword = async (e) => {
//     e.preventDefault()
//     if (!forgotPasswordEmail.trim()) return

//     setForgotPasswordLoading(true)
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       setForgotPasswordSuccess(true)
//       setTimeout(() => {
//         setShowForgotPassword(false)
//         setForgotPasswordSuccess(false)
//         setForgotPasswordEmail('')
//       }, 3000)
//     } catch (error) {
//       console.error('Forgot password failed:', error)
//     } finally {
//       setForgotPasswordLoading(false)
//     }
//   }

//   // Load saved email on component mount
//   React.useEffect(() => {
//     const savedRememberMe = localStorage.getItem('rememberMe')
//     const savedEmail = localStorage.getItem('savedEmail')
    
//     if (savedRememberMe === 'true' && savedEmail) {
//       setRememberMe(true)
//       setFormData(prev => ({ ...prev, email: savedEmail }))
//     }
//   }, [])

//   // Button Spinner component
//   const ButtonSpinner = () => (
//     <div className="flex items-center justify-center">
//       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//       <span>Signing In...</span>
//     </div>
//   );

//   // Forgot Password Spinner
//   const ForgotPasswordSpinner = () => (
//     <div className="flex items-center justify-center">
//       <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-2"></div>
//       <span>Sending reset link...</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header Section */}
//         <div className="text-center">
//           <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-600">Sign in to your admin dashboard</p>
//         </div>

//         {/* Forgot Password Modal */}
//         {showForgotPassword && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md w-full">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
//                 <button
//                   onClick={() => setShowForgotPassword(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                   disabled={forgotPasswordLoading}
//                 >
//                   ✕
//                 </button>
//               </div>
              
//               {forgotPasswordSuccess ? (
//                 <div className="text-center py-4">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <p className="text-gray-700 mb-2">Reset link sent!</p>
//                   <p className="text-sm text-gray-500">Check your email for password reset instructions</p>
//                 </div>
//               ) : (
//                 <>
//                   <p className="text-gray-600 text-sm mb-4">
//                     Enter your email address and we'll send you a link to reset your password.
//                   </p>
//                   <form onSubmit={handleForgotPassword}>
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         required
//                         value={forgotPasswordEmail}
//                         onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         placeholder="your@email.com"
//                         disabled={forgotPasswordLoading}
//                       />
//                     </div>
//                     <div className="flex space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => setShowForgotPassword(false)}
//                         className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//                         disabled={forgotPasswordLoading}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={forgotPasswordLoading || !forgotPasswordEmail.trim()}
//                         className="flex-1 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center"
//                       >
//                         {forgotPasswordLoading ? <ForgotPasswordSpinner /> : 'Send Link'}
//                       </button>
//                     </div>
//                   </form>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Login Form */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   placeholder="admin@college.edu"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
//                   onClick={togglePasswordVisibility}
//                   disabled={isLoading}
//                 >
//                   {showPassword ? (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   disabled={isLoading}
//                   className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded disabled:opacity-50"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(true)}
//                   className="font-medium text-purple-600 hover:text-purple-500 transition-colors disabled:opacity-50"
//                   disabled={isLoading}
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center"
//             >
//               {isLoading ? <ButtonSpinner /> : 'Sign In'}
//             </button>
//           </form>

//           {/* Demo Credentials Section */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600 text-center mb-4">
//               Quick demo access
//             </p>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() => handleQuickLogin('admin@college.edu', 'admin123')}
//                 disabled={isLoading}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Admin Account
//               </button>
//               <button
//                 onClick={() => handleQuickLogin('staff@college.edu', 'staff123')}
//                 disabled={isLoading}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Staff Account
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Raj-Sahayak Admin Portal v1.0
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminLogin







//& after spinner


// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../App'
// import StarSpinner from '../../components/common/StarSpinner'

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [showForgotPassword, setShowForgotPassword] = useState(false)
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
//   const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
//   const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)
  
//   const { login } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 2000))
      
//       // Simulate successful login with a token
//       const mockToken = 'admin-auth-token-' + Date.now()
      
//       // Save remember me preference
//       if (rememberMe) {
//         localStorage.setItem('rememberMe', 'true')
//         localStorage.setItem('savedEmail', formData.email)
//       } else {
//         localStorage.removeItem('rememberMe')
//         localStorage.removeItem('savedEmail')
//       }
      
//       // Use the login function from context
//       login(mockToken)
//       setIsLoading(false)
//       navigate('/admin/dashboard')
//     } catch (error) {
//       console.error('Login failed:', error)
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleQuickLogin = (demoEmail, demoPassword) => {
//     if (isLoading) return;
    
//     setFormData({
//       email: demoEmail,
//       password: demoPassword
//     })
//   }

//   const handleForgotPassword = async (e) => {
//     e.preventDefault()
//     if (!forgotPasswordEmail.trim()) return

//     setForgotPasswordLoading(true)
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       setForgotPasswordSuccess(true)
//       setTimeout(() => {
//         setShowForgotPassword(false)
//         setForgotPasswordSuccess(false)
//         setForgotPasswordEmail('')
//       }, 3000)
//     } catch (error) {
//       console.error('Forgot password failed:', error)
//     } finally {
//       setForgotPasswordLoading(false)
//     }
//   }

//   // Load saved email on component mount
//   React.useEffect(() => {
//     const savedRememberMe = localStorage.getItem('rememberMe')
//     const savedEmail = localStorage.getItem('savedEmail')
    
//     if (savedRememberMe === 'true' && savedEmail) {
//       setRememberMe(true)
//       setFormData(prev => ({ ...prev, email: savedEmail }))
//     }
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header Section */}
//         <div className="text-center">
//           <div className="mx-auto w-20 h-20 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-cyan-200">Sign in to your admin dashboard</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-500 border-opacity-20 p-8">
//           {isLoading ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <StarSpinner text="Signing you in..." size="medium" />
//             </div>
//           ) : (
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-cyan-200 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 bg-gray-800 border border-cyan-500 border-opacity-30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                     placeholder="admin@college.edu"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-cyan-200 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 bg-gray-800 border border-cyan-500 border-opacity-30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 pr-12 placeholder-gray-400"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
//                     onClick={togglePasswordVisibility}
//                     disabled={isLoading}
//                   >
//                     {showPassword ? (
//                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     ) : (
//                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     disabled={isLoading}
//                     className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-cyan-500 bg-gray-800 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-cyan-200">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <button
//                     type="button"
//                     onClick={() => setShowForgotPassword(true)}
//                     className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
//                     disabled={isLoading}
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 Sign In
//               </button>
//             </form>
//           )}

//           {/* Demo Credentials Section */}
//           {!isLoading && (
//             <div className="mt-8 pt-6 border-t border-cyan-500 border-opacity-20">
//               <p className="text-sm text-cyan-300 text-center mb-4">
//                 Quick demo access
//               </p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => handleQuickLogin('admin@college.edu', 'admin123')}
//                   disabled={isLoading}
//                   className="text-xs bg-cyan-900 bg-opacity-30 text-cyan-300 py-2 px-3 rounded-lg transition-colors text-center hover:bg-cyan-800 disabled:opacity-50"
//                 >
//                   Admin Account
//                 </button>
//                 <button
//                   onClick={() => handleQuickLogin('staff@college.edu', 'staff123')}
//                   disabled={isLoading}
//                   className="text-xs bg-cyan-900 bg-opacity-30 text-cyan-300 py-2 px-3 rounded-lg transition-colors text-center hover:bg-cyan-800 disabled:opacity-50"
//                 >
//                   Staff Account
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="text-center">
//           <p className="text-sm text-cyan-300">
//             Raj-Sahayak Admin Portal v1.0
//           </p>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       {showForgotPassword && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-gray-900 border border-cyan-500 border-opacity-30 rounded-2xl shadow-xl p-6 max-w-md w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-white">Reset Password</h3>
//               <button
//                 onClick={() => setShowForgotPassword(false)}
//                 className="text-cyan-400 hover:text-cyan-300 transition-colors"
//                 disabled={forgotPasswordLoading}
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             {forgotPasswordSuccess ? (
//               <div className="text-center py-4">
//                 <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <p className="text-cyan-200 mb-2">Reset link sent!</p>
//                 <p className="text-sm text-cyan-300">Check your email for password reset instructions</p>
//               </div>
//             ) : (
//               <>
//                 <p className="text-cyan-200 text-sm mb-4">
//                   Enter your email address and we'll send you a link to reset your password.
//                 </p>
//                 {forgotPasswordLoading ? (
//                   <div className="flex flex-col items-center justify-center py-8">
//                     <StarSpinner text="Sending reset link..." size="small" />
//                   </div>
//                 ) : (
//                   <form onSubmit={handleForgotPassword}>
//                     <div className="mb-4">
//                       <input
//                         type="email"
//                         required
//                         value={forgotPasswordEmail}
//                         onChange={(e) => setForgotPasswordEmail(e.target.value)}
//                         className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 border-opacity-30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
//                         placeholder="your@email.com"
//                       />
//                     </div>
//                     <div className="flex space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => setShowForgotPassword(false)}
//                         className="flex-1 bg-gray-700 text-cyan-200 font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={!forgotPasswordEmail.trim()}
//                         className="flex-1 bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
//                       >
//                         Send Link
//                       </button>
//                     </div>
//                   </form>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminLogin





import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import StarSpinner from '../../components/common/StarSpinner'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)
  
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful login with a token
      const mockToken = 'admin-auth-token-' + Date.now()
      
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('savedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('savedEmail')
      }
      
      // Use the login function from context
      login(mockToken)
      setIsLoading(false)
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleQuickLogin = (demoEmail, demoPassword) => {
    if (isLoading) return;
    
    setFormData({
      email: demoEmail,
      password: demoPassword
    })
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!forgotPasswordEmail.trim()) return

    setForgotPasswordLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setForgotPasswordSuccess(true)
      setTimeout(() => {
        setShowForgotPassword(false)
        setForgotPasswordSuccess(false)
        setForgotPasswordEmail('')
      }, 3000)
    } catch (error) {
      console.error('Forgot password failed:', error)
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  // Load saved email on component mount
  React.useEffect(() => {
    const savedRememberMe = localStorage.getItem('rememberMe')
    const savedEmail = localStorage.getItem('savedEmail')
    
    if (savedRememberMe === 'true' && savedEmail) {
      setRememberMe(true)
      setFormData(prev => ({ ...prev, email: savedEmail }))
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <StarSpinner text="Signing you in..." size="medium" />
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="admin@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 placeholder-gray-400"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Demo Credentials Section */}
          {!isLoading && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">
                Quick demo access
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickLogin('admin@college.edu', 'admin123')}
                  disabled={isLoading}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center disabled:opacity-50"
                >
                  Admin Account
                </button>
                <button
                  onClick={() => handleQuickLogin('staff@college.edu', 'staff123')}
                  disabled={isLoading}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors text-center disabled:opacity-50"
                >
                  Staff Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Raj-Sahayak Admin Portal v1.0
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={forgotPasswordLoading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {forgotPasswordSuccess ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-2">Reset link sent!</p>
                <p className="text-sm text-gray-500">Check your email for password reset instructions</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-sm mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                {forgotPasswordLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <StarSpinner text="Sending reset link..." size="small" />
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                      <input
                        type="email"
                        required
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!forgotPasswordEmail.trim()}
                        className="flex-1 bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                      >
                        Send Link
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLogin