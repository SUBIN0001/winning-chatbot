import React from 'react'
import { Mic, Square } from 'lucide-react'

const VoiceCommand = ({ onVoiceInput, isListening, setIsListening }) => {
  const handleVoiceCommand = () => {
    setIsListening(!isListening)
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const commands = [
          "Navigate to user management",
          "Show analytics dashboard",
          "Open system settings",
          "Access knowledge base"
        ]
        const randomCommand = commands[Math.floor(Math.random() * commands.length)]
        onVoiceInput(randomCommand)
        setIsListening(false)
      }, 3000)
    }
  }

  return (
    <button
      onClick={handleVoiceCommand}
      className={`p-3 rounded-lg border transition-colors duration-200 flex items-center space-x-2 ${
        isListening 
          ? 'bg-red-50 border-red-200 text-red-600' 
          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
      }`}
    >
      {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      <span className="text-sm font-medium">
        {isListening ? 'Stop' : 'Voice'}
      </span>
    </button>
  )
}

export default VoiceCommand