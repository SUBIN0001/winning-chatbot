import React, { useState, useRef, useEffect } from 'react'
import VoiceCommand from './VoiceCommand'
import { sendMessageToN8N } from "../../services/n8n";
const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AI assistant. How can I help you today? 🌟', sender: 'bot', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const newMessage = {
    id: Date.now(),
    text: inputMessage,
    sender: 'user',
    timestamp: new Date()
  };

  setMessages(prev => [...prev, newMessage]);
  const userText = inputMessage;
  setInputMessage("");

  try {
    // ⬇️ REAL AI REQUEST TO N8N
    const reply = await sendMessageToN8N(userText);

    const botReply = {
      id: Date.now() + 1,
      text: reply,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botReply]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        text: "⚠ AI service unavailable. Try again later.",
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  }
};


  const handleVoiceInput = (text) => {
    setInputMessage(text)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass-card p-5 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-float"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
            🤖
          </div>
          <div className="text-left">
            <p className="font-bold text-lg">AI Assistant</p>
            <p className="text-sm opacity-80">Click to chat</p>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 glass-card flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-white/80 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/70 transition-colors p-1 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white/5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    message.sender === 'user' 
                      ? 'bg-linear-to-r from-blue-500 to-purple-600' 
                      : 'bg-linear-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? '👤' : '🤖'}
                  </div>
                  
                  <div className={`rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
                      : 'bg-white/20 text-white rounded-bl-none'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-white/70'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/20 bg-white/5 rounded-b-2xl">
            <div className="flex space-x-2">
              <VoiceCommand 
                onVoiceInput={handleVoiceInput}
                isListening={isListening}
                setIsListening={setIsListening}
              />
              
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={isListening}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isListening}
                className="bg-linear-to-r from-green-400 to-blue-500 text-white p-3 rounded-xl hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatInterface