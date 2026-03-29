import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Sparkles, User, Bot } from 'lucide-react';
import { sendMessage } from '../services/api';
import { connectSocket, getSocket } from '../services/socket';
import { useAuth } from '../context/AuthContext';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const { sessionId } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = connectSocket();

    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Connected to server');
    });

    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      setIsLoading(false);
      if (data.success && data.bot) {
        setMessages((prev) => [...prev, data.bot]);
      } else if (data.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: data.response,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date().toISOString(),
            isError: true,
          },
        ]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const socket = getSocket();
      if (socket && socketConnected) {
        socket.emit('send_message', { message: inputValue.trim(), sessionId });
      } else {
        // Fallback to HTTP if socket is not available
        const response = await sendMessage(inputValue.trim());
        if (response.bot) {
          setMessages((prev) => [...prev, response.bot]);
        } else if (response.response) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'bot',
              content: response.response,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    }
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    setIsRecording(!isRecording);
    // In a real implementation, this would use the Web Speech API or similar
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Health Assistant</h1>
              <p className="text-slate-500 text-sm">
                {socketConnected ? 'Online' : 'Connecting...'}
                <span className={`inline-block w-2 h-2 rounded-full ml-2 ${socketConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Bot className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Welcome to HealthBuddy Chat
              </h3>
              <p className="max-w-md">
                Ask me anything about health, nutrition, exercise, or wellness.
                I'm here to help you on your health journey!
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Healthy eating tips', 'Exercise routine', 'Sleep better', 'Stress management'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-4 py-2 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-700 rounded-lg text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gradient-to-br from-green-500 to-teal-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.isError
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user'
                          ? 'text-blue-200'
                          : message.isError
                          ? 'text-red-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-3 rounded-xl transition-colors ${
              isRecording
                ? 'bg-red-100 text-red-600 recording-pulse'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about health, nutrition, exercise..."
            className="flex-1 px-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-800 placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
