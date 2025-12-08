import React, { useState, useRef, useEffect } from "react";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI Assistant. How can I help you today?",
      sender: "bot",
      language: "en"
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showAutoDetectBadge, setShowAutoDetectBadge] = useState(false);
  const [originalSelectedLang, setOriginalSelectedLang] = useState("en");
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Available languages with speech recognition codes
  const languages = [
    { code: "en", name: "English", native: "English", speechCode: "en-IN" },
    { code: "hi", name: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
    { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
    { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" },
    { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" },
    { code: "mwr", name: "Marwari", native: "मारवाड़ी", speechCode: "hi-IN" }
  ];

  // Helper function to format bot messages with line breaks
  const formatMessageText = (text, isBot = false) => {
    if (!isBot) return text;
    
    // Clean up markdown ** and ensure proper newlines
    let cleanedText = text
      .replace(/\\(.?)\\*/g, '$1') // Remove ** markdown
      .replace(/\\n/g, '\n'); // Convert \n to actual newlines
    
    return cleanedText;
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser');
        setSpeechSupported(false);
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      const currentLang = languages.find(lang => lang.code === selectedLanguage);
      recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript) {
          setInputMessage(interimTranscript);
        }

        if (finalTranscript) {
          setInputMessage(finalTranscript);
          // Auto-detect language for voice input
          detectLanguage(finalTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        
        if (inputMessage.trim().length > 0) {
          setTimeout(() => {
            handleAutoSend();
          }, 500);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          alert('Please allow microphone access to use voice commands');
        }
      };
    };

    initSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Initialize audio recording
  const initAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setIsRecording(false);
        
        // Auto-send audio to backend
        handleSendAudioMessage(audioBlob);
      };

    } catch (error) {
      console.error('Error initializing audio recording:', error);
      alert('Microphone access denied. Please allow microphone permissions.');
    }
  };

  // Start audio recording
  const startAudioRecording = async () => {
    if (!mediaRecorderRef.current) {
      await initAudioRecording();
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'recording') {
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  // Stop audio recording
  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Send audio message to n8n workflow
  const handleSendAudioMessage = async (audioBlob) => {
    if (!audioBlob) return;

    setIsProcessing(true);

    try {
      // Create FormData to send audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-message.wav');
      formData.append('language', selectedLanguage);
      formData.append('detectedLanguage', detectedLanguage || selectedLanguage);
      formData.append('hasAudio', 'true');
      formData.append('audioType', 'wav');

      // Add user message to chat
      const newMessage = {
        id: Date.now(),
        text: "🎤 Voice message...",
        sender: "user",
        language: selectedLanguage,
        isVoice: true,
        isAudio: true
      };

      setMessages((prev) => [...prev, newMessage]);

      // Send audio to n8n workflow
      const response = await fetch('https://solutionseekers2.app.n8n.cloud/webhook/test', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const data = await response.json();
      
      // Parse n8n response
      let replyText = parseN8nResponse(data);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replyText,
          sender: "bot",
          language: selectedLanguage
        },
      ]);

    } catch (error) {
      console.error('Error sending audio message:', error);
      
      // Fallback: Send as text message to n8n
      const textResponse = await sendMessageToN8N("Voice message received", selectedLanguage);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: textResponse,
          sender: "bot",
          language: selectedLanguage
        },
      ]);
    } finally {
      setIsProcessing(false);
      setAudioBlob(null);
    }
  };

  // Parse n8n response to extract text and clean it
  const parseN8nResponse = (data) => {
    if (!data) return "I received your message but couldn't process the response.";
    
    let responseText = "";
    
    // Handle array response (common in n8n)
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      if (firstItem.json && firstItem.json.output) {
        responseText = firstItem.json.output;
      } else if (firstItem.output) {
        responseText = firstItem.output;
      } else if (firstItem.text) {
        responseText = firstItem.text;
      } else if (typeof firstItem === 'string') {
        responseText = firstItem;
      }
    } else if (typeof data === 'object') {
      // Handle object response
      if (data.output) responseText = data.output;
      else if (data.reply) responseText = data.reply;
      else if (data.text) responseText = data.text;
      else if (data.message) responseText = data.message;
    } else if (typeof data === 'string') {
      // Handle string response
      responseText = data;
    }
    
    // Clean up the response text
    if (responseText) {
      // Remove markdown-style ** and replace with proper formatting
      responseText = responseText.replace(/\\(.?)\\*/g, '$1');
      
      // Ensure proper newlines
      responseText = responseText.replace(/\\n/g, '\n');
      
      // Clean up any other markdown artifacts
      responseText = responseText.replace(/\* /g, '• '); // Convert * bullets to • 
      responseText = responseText.replace(/#{1,6}\s*/g, ''); // Remove markdown headers
      
      return responseText;
    }
    
    // Fallback
    return "I processed your request successfully.";
  };

  // Update speech recognition language when selected language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const currentLang = languages.find(lang => lang.code === selectedLanguage);
      recognitionRef.current.lang = currentLang ? currentLang.speechCode : 'en-IN';
    }
  }, [selectedLanguage]);

  // Auto-send message after voice input
  const handleAutoSend = async () => {
    if (!inputMessage.trim()) return;
    
    setIsProcessing(true);
    
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      language: selectedLanguage,
      isVoice: true
    };

    setMessages((prev) => [...prev, newMessage]);
    
    const messageToSend = inputMessage;
    setInputMessage("");

    try {
      const botReply = await sendMessageToN8N(messageToSend, selectedLanguage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          language: selectedLanguage
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          language: selectedLanguage
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Detect language from text using OpenAI API with better prompting
  const detectLanguage = async (text) => {
    if (text.trim().length < 3) return;
    
    // Store original language before detection
    setOriginalSelectedLang(selectedLanguage);
    
    try {
      // Use OpenAI API for language detection with BETTER PROMPT
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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` // REPLACE WITH YOUR KEY
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Analyze this text and determine its primary language: "${text}"
              
              Available language codes: en (English), hi (Hindi), ta (Tamil), te (Telugu), gu (Gujarati), mr (Marathi),mwr (Marwari)

              
              Rules:
              1. If text contains Hindi words like "aap", "kaise", "hain", "hai", "namaste", "dhanyavad", etc., return "hi"
              2. If text contains Tamil words like "vanakkam", "nandri", "epdi", etc., return "ta"
              3. If text contains Telugu words like "namaskaram", "dhanyavadalu", "ela", etc., return "te"
              4. If text contains Gujarati words like "kem cho", "aavjo", etc., return "gu"
              5. If text contains Marathi words like "kasa aahat", "namaskar", etc., return "mr"
              6. If text contains Marwari words like "khamma ghani", "ghano dhanyavaad",
"thare", "mharo", "mhari", "tharo", "su", "kai", "kay re", "kem cho sa",
return "mwr".

              7. If text is mostly English, return "en"
              8. Return ONLY the language code, no explanations.
              
              Text to analyze: "${text}"`
            }
          ],
          temperature: 0.1,
          max_tokens: 10
        })
      });

      if (!response.ok) {
        console.error("OpenAI API error:", await response.text());
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const detectedLang = data.choices[0].message.content.trim().toLowerCase();
      
      console.log("Text analyzed:", text);
      console.log("OpenAI detected language:", detectedLang);
      
      // Validate that detected language is in our supported languages
      const validLang = languages.find(lang => lang.code === detectedLang) ? detectedLang : "en";
      
      // Set detected language
      setDetectedLanguage(validLang);
      
      // Show auto-detect badge if different from original selection
      if (validLang !== originalSelectedLang && validLang !== "en") {
        setShowAutoDetectBadge(true);
        console.log("Showing badge for:", validLang);
      } else {
        setShowAutoDetectBadge(false);
      }
      
      // Auto-switch to detected language if user hasn't manually selected one or is on English
      // But only if detected language is NOT English
      if ((selectedLanguage === "en" || originalSelectedLang === "en") && validLang !== "en") {
        setSelectedLanguage(validLang);
        // Keep badge showing to indicate auto-switch happened
        setShowAutoDetectBadge(true);
      }
      
      return validLang;
    } catch (error) {
      console.error("OpenAI language detection failed:", error);
      
      // FALLBACK: Use enhanced local detection
      const enhancedLang = enhancedLanguageDetection(text);
      setDetectedLanguage(enhancedLang);
      
      // Show badge if different and not English
      if (enhancedLang !== originalSelectedLang && enhancedLang !== "en") {
        setShowAutoDetectBadge(true);
        console.log("Fallback detection showing badge for:", enhancedLang);
      }
      
      if ((selectedLanguage === "en" || originalSelectedLang === "en") && enhancedLang !== "en") {
        setSelectedLanguage(enhancedLang);
        setShowAutoDetectBadge(true);
      }
      
      return enhancedLang;
    }
  };

  // Enhanced language detection (fallback)
  // Enhanced language detection (fallback)
const enhancedLanguageDetection = (text) => {
  const textLower = text.toLowerCase().trim();
  
  if (textLower.length < 2) return "en";
  
  // Hindi detection patterns (Romanized and Devanagari)
  const hindiPatterns = [
    /\b(aap|tum|kaise|kya|kaun|kahan|kyon|hain|hai|ho|nahi|ji|shukriya|dhanyavad|namaste|accha|thik|theek|sahi|galti|samajh|dekh|sun|bol|likh|padh)\b/i,
    /[\u0900-\u097F]/, // Devanagari script
    /\b(mera|meri|hamara|tumhara|uska|unki|unka|kaise)\b/i,
    /\b(karna|hona|jana|lena|dena|ana)\b/i,
    /\b(bahut|zyada|kam|accha|bura|sundar)\b/i
  ];
  
  // Tamil detection
  const tamilPatterns = [
    /\b(vanakkam|nandri|epdi|eppadi|enga|yaaru|enna|edhukku|porumai|nalama|romba|konjam)\b/i,
    /[\u0B80-\u0BFF]/, // Tamil script
    /\b(nan|naan|ungal|ungalukku|ungaloda)\b/i
  ];
  
  // Telugu detection
  const teluguPatterns = [
    /\b(namaskaram|dhanyavadalu|ela|emi|evaru|ekkada|enduku|chala|baga|manchi)\b/i,
    /[\u0C00-\u0C7F]/, // Telugu script
    /\b(nenu|meeru|thamudu|chelli|amma|nanna)\b/i
  ];
  
  // Gujarati detection
  const gujaratiPatterns = [
    /\b(kem|cho|chho|shu|kai|kyare|kahan|kemcho|avjo|jojo|shubh|ratri|divas)\b/i,
    /[\u0A80-\u0AFF]/, // Gujarati script
    /\b(hu|tame|aman|maro|taro|chhe)\b/i
  ];
  
  // Marathi detection
  const marathiPatterns = [
    /\b(kasa|kashi|kase|kaay|ka|kadhi|kevha|kuthe|kuthhe|kon|konti|konte|kitikonta)\b/i,
    /\b(aahe|ahe|ahet|hot|hoti|hoto|kar|ja|ye|sang|bol|de|ghe)\b/i,
    /\b(mala|tula|amhala|tumhala|pan|tar|ani|kichit)\b/i,
    /\b(ho|kaay|kiti|jasta|kami|changla|vait)\b/i,
    /[\u0900-\u097F]/    // Devanagari script
  ];

  // Marwari detection
  const marwariPatterns = [
    /\b(khamma ghani|ram ram sa|ghano dhanyavaad|thare|tharo|mharo|mhari|su che|su sa|kay re|kai re|kun sa|kon sa)\b/i,
    /\b(re|sa|mhane|mhari|mhara|thanney|mane|tanne)\b/i,
    /\b(खम्मा|घणी|थारे|थारो|म्हारो|म्हारी|सा|रे|काय|कोन|म्है|म्हार)\b/,
    /\b(हां सा|नां सा)\b/i
  ];
  
  // STEP 1: Split text into words and remove very short words
  const words = textLower.split(/[\s\p{P}]+/u).filter(w => w.length > 1);
  
  if (words.length === 0) return "en";
  
  console.log("Words to analyze:", words);
  
  // STEP 2: Check if any word matches patterns for each language
  const languageMatches = {
    hi: { count: 0, words: [] },
    ta: { count: 0, words: [] },
    te: { count: 0, words: [] },
    gu: { count: 0, words: [] },
    mr: { count: 0, words: [] },
    mwr: { count: 0, words: [] }
  };
  
  // Check each word against each language pattern
  words.forEach(word => {
    // Hindi
    if (hindiPatterns.some(p => p.test(word))) {
      languageMatches.hi.count++;
      languageMatches.hi.words.push(word);
    }
    
    // Tamil
    if (tamilPatterns.some(p => p.test(word))) {
      languageMatches.ta.count++;
      languageMatches.ta.words.push(word);
    }
    
    // Telugu
    if (teluguPatterns.some(p => p.test(word))) {
      languageMatches.te.count++;
      languageMatches.te.words.push(word);
    }
    
    // Gujarati
    if (gujaratiPatterns.some(p => p.test(word))) {
      languageMatches.gu.count++;
      languageMatches.gu.words.push(word);
    }
    
    // Marathi
    if (marathiPatterns.some(p => p.test(word))) {
      languageMatches.mr.count++;
      languageMatches.mr.words.push(word);
    }
    
    // Marwari
    if (marwariPatterns.some(p => p.test(word))) {
      languageMatches.mwr.count++;
      languageMatches.mwr.words.push(word);
    }
  });
  
  console.log("Language matches:", languageMatches);
  
  // STEP 3: Find languages that have at least one match
  const languagesWithMatches = Object.entries(languageMatches)
    .filter(([lang, data]) => data.count > 0)
    .map(([lang, data]) => ({ lang, ...data }));
  
  console.log("Languages with matches:", languagesWithMatches);
  
  // STEP 4: If only one language has matches, return it immediately
  if (languagesWithMatches.length === 1) {
    console.log(`Single language detected: ${languagesWithMatches[0].lang} (words: ${languagesWithMatches[0].words.join(', ')})`);
    return languagesWithMatches[0].lang;
  }
  
  // STEP 5: If multiple languages have matches, we need to decide
  if (languagesWithMatches.length > 1) {
    // Check for "exclusive words" - words that match only ONE language
    const exclusiveWords = [];
    
    words.forEach(word => {
      const matchesForWord = [];
      
      if (hindiPatterns.some(p => p.test(word))) matchesForWord.push('hi');
      if (tamilPatterns.some(p => p.test(word))) matchesForWord.push('ta');
      if (teluguPatterns.some(p => p.test(word))) matchesForWord.push('te');
      if (gujaratiPatterns.some(p => p.test(word))) matchesForWord.push('gu');
      if (marathiPatterns.some(p => p.test(word))) matchesForWord.push('mr');
      if (marwariPatterns.some(p => p.test(word))) matchesForWord.push('mwr');
      
      if (matchesForWord.length === 1) {
        exclusiveWords.push({
          word: word,
          lang: matchesForWord[0]
        });
      }
    });
    
    console.log("Exclusive words:", exclusiveWords);
    
    // If we have exclusive words, count them by language
    if (exclusiveWords.length > 0) {
      const exclusiveCounts = {};
      exclusiveWords.forEach(ew => {
        exclusiveCounts[ew.lang] = (exclusiveCounts[ew.lang] || 0) + 1;
      });
      
      // Find language with most exclusive words
      const sortedExclusive = Object.entries(exclusiveCounts).sort((a, b) => b[1] - a[1]);
      if (sortedExclusive.length > 0 && sortedExclusive[0][1] > 0) {
        console.log(`Detected via exclusive words: ${sortedExclusive[0][0]} (${sortedExclusive[0][1]} exclusive words)`);
        return sortedExclusive[0][0];
      }
    }
    
    // If no exclusive words or tie, use frequency of matches
    const languageByFrequency = languagesWithMatches.sort((a, b) => {
      // First sort by match count
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      
      // If tie, check if any language has script characters
      const aHasScript = hasScriptCharacters(a.lang, a.words);
      const bHasScript = hasScriptCharacters(b.lang, b.words);
      
      if (aHasScript && !bHasScript) return -1;
      if (!aHasScript && bHasScript) return 1;
      
      return 0;
    });
    
    console.log(`Detected via frequency: ${languageByFrequency[0].lang} (${languageByFrequency[0].count} matches)`);
    return languageByFrequency[0].lang;
  }
  
  // STEP 6: Check for greeting patterns in short texts
  if (textLower.length < 20) {
    const greetings = {
      hi: ['namaste', 'namaskar', 'pranam', 'aadaab'],
      ta: ['vanakkam', 'vaazhga'],
      te: ['namaskaram', 'dhanyavadalu'],
      gu: ['kem cho', 'jai shree krishna'],
      mr: ['namaskar', 'jai maharashtra'],
      mwr: ['khamma ghani', 'ram ram sa', 'ghani ghani', 'ram sa']
    };
    
    for (const [lang, greets] of Object.entries(greetings)) {
      if (greets.some(greet => textLower.includes(greet.toLowerCase()))) {
        console.log(`Detected via greeting: ${lang}`);
        return lang;
      }
    }
  }
  
  // Default to English
  console.log("Defaulting to English");
  return "en";
};

// Helper function to check if words contain script characters
const hasScriptCharacters = (langCode, words) => {
  // Script patterns for each language
  const scriptPatterns = {
    hi: /[\u0900-\u097F]/,
    ta: /[\u0B80-\u0BFF]/,
    te: /[\u0C00-\u0C7F]/,
    gu: /[\u0A80-\u0AFF]/,
    mr: /[\u0900-\u097F]/,
    mwr: /[\u0900-\u097F]/
  };
  
  const pattern = scriptPatterns[langCode];
  if (!pattern) return false;
  
  return words.some(word => pattern.test(word));
};

  // Start voice recording (text transcription)
  const startVoiceInput = () => {
    if (!speechSupported) {
      alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (recognitionRef.current && !isListening) {
      setInputMessage("");
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  // Stop voice recording manually
  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Start audio recording (for sending audio file)
  const startAudioInput = async () => {
    try {
      await startAudioRecording();
    } catch (error) {
      console.error('Failed to start audio recording:', error);
    }
  };

  // Stop audio recording
  const stopAudioInput = () => {
    stopAudioRecording();
  };

  // Manual send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsProcessing(true);
    
    // Store original language before sending
    const originalLang = selectedLanguage;
    
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      language: selectedLanguage,
      isVoice: false
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      // First detect language if English is selected or input suggests different language
      let langToUse = selectedLanguage;
      
      // Always run detection to show badge, but only auto-switch if English was selected
      const detectedLang = await detectLanguage(inputMessage);
      
      if (originalLang === "en") {
        langToUse = detectedLang;
        setSelectedLanguage(detectedLang);
      }
      
      const botReply = await sendMessageToN8N(inputMessage, langToUse);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: "bot",
          language: langToUse
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          language: selectedLanguage
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Send message to n8n Webhook - MAIN INTEGRATION POINT
  const sendMessageToN8N = async (message, language) => {
    try {
      const res = await fetch(
        "https://solutionseekers2.app.n8n.cloud/webhook/test",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message,
            language: language || selectedLanguage,
            detectedLanguage: detectedLanguage || language || selectedLanguage,
            timestamp: new Date().toISOString(),
            source: "chatbot_web"
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      // Parse the response using the helper function
      const replyText = parseN8nResponse(data);
      
      return replyText;
      
    } catch (error) {
      console.error("Error sending message to n8n:", error);
      
      // Return user-friendly error message
      if (error.message.includes('Failed to fetch')) {
        return "⚠ Network error: Unable to connect to the server. Please check your internet connection.";
      }
      
      throw error;
    }
  };

  // Get current language name
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === selectedLanguage);
    return lang ? lang.native : "English";
  };

  // Get detected language name
  const getDetectedLanguageName = () => {
    const lang = languages.find(l => l.code === detectedLanguage);
    return lang ? lang.name : "Unknown";
  };

  // Reset auto-detect badge when user manually changes language
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setShowAutoDetectBadge(false); // Hide badge on manual change
    setOriginalSelectedLang(newLang); // Reset original
  };

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col">
      {/* Header with Language Info */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Raj-Sahayak AI Assistant
              </h1>
              <p className="text-sm text-gray-500">How can I help you today?</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Detection Badge - FIXED LOGIC */}
            {showAutoDetectBadge && detectedLanguage && (
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full animate-pulse">
                Auto-detected: {getDetectedLanguageName()}
              </div>
            )}
            
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
            
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                {/* Use white-space: pre-line for bot messages to preserve line breaks */}
                <p 
                  className="text-sm"
                  style={{ 
                    whiteSpace: message.sender === "bot" ? "pre-line" : "normal"
                  }}
                >
                  {formatMessageText(message.text, message.sender === "bot")}
                </p>
                {message.sender === "user" && (
                  <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                    {message.isAudio ? (
                      <>
                        <span>🎵</span>
                        <span>Audio Message • {getCurrentLanguageName()}</span>
                      </>
                    ) : message.isVoice ? (
                      <>
                        <span>🎤</span>
                        <span>Voice • {getCurrentLanguageName()}</span>
                      </>
                    ) : (
                      <>
                        <span>⌨</span>
                        <span>{getCurrentLanguageName()}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {audioBlob ? "Processing audio..." : "Thinking..."}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar with Voice */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            {/* Voice Input Button (Text Transcription) */}
            <button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                isListening 
                  ? "bg-blue-100 border-blue-300 text-blue-600 animate-pulse" 
                  : speechSupported 
                    ? "bg-blue-100 border-blue-300 text-blue-600 hover:bg-blue-200"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
              title={
                !speechSupported 
                  ? "Voice transcription not supported" 
                  : isListening 
                    ? "Stop voice transcription" 
                    : "Start voice transcription (text)"
              }
              type="button"
              disabled={isProcessing || !speechSupported || isRecording}
            >
              {isListening ? "⏹" : "🎤"}
            </button>

            {/* Audio Recording Button (Send Audio File) */}
            
            
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                if (e.target.value.trim().length >= 3) {
                  detectLanguage(e.target.value);
                }
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={
                isListening 
                  ? "Speaking... (text transcription)" 
                  : isRecording
                    ? "Recording audio... (will send as file)"
                    : `Type your message in ${getCurrentLanguageName()}...`
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              disabled={isProcessing || isRecording}
            />
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing || isRecording}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Send'
              )}
            </button>
          </div>
          
          {/* Voice Recording Status */}
          {isListening && (
            <div className="text-center mt-3">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>🎤 Listening... Speak for text transcription</span>
              </div>
            </div>
          )}

          {/* Audio Recording Status */}
          {isRecording && (
            <div className="text-center mt-3">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span>🎵 Recording audio... Click stop to send</span>
              </div>
            </div>
          )}
          
          {/* Browser Support Warning */}
          {!speechSupported && (
            <div className="text-center mt-2">
              <p className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-lg inline-block">
                ⚠ Voice transcription not supported. Please use Chrome, Edge, or Safari.
              </p>
            </div>
          )}
          
          {/* Instructions */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">
              🎤 Voice-to-text • ⌨ Type message
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;