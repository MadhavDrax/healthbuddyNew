import { useState, useRef, useEffect } from 'react';
import { Bot, Mic, Square, Loader2, Sparkles, Activity } from 'lucide-react';
import api from '../services/api';

export default function VoiceChat() {
  const [state, setState] = useState('idle'); // idle | listening | processing | speaking
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);

  // Stop any currently playing audio on unmount
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  const startRecording = async () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setState('listening');
      setTranscript('');
      setAiResponse('');
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Unable to access microphone. Please ensure permissions are granted.");
      setState('idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && state === 'listening') {
      mediaRecorderRef.current.stop();
      setState('processing');
    }
  };

  const sendAudioToBackend = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');
    
    try {
      const response = await api.post('/api/voice/speak', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      const trans = decodeURIComponent(response.headers['x-transcript'] || '');
      const aiReply = decodeURIComponent(response.headers['x-ai-response'] || '');
      if (trans) setTranscript(trans);
      if (aiReply) setAiResponse(aiReply);

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      
      setState('speaking');
      audio.play();

      audio.onended = () => {
        setState('idle');
      };
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setState('idle');
      if (error.response && error.response.data instanceof Blob) {
          error.response.data.text().then(text => {
              try {
                  const json = JSON.parse(text);
                  setAiResponse(`API Error: ${json.error || 'Unknown Error'}`);
              } catch(e) {
                  setAiResponse("Network dropped the audio buffer.");
              }
          });
      } else {
          setAiResponse("Sorry, I encountered a network error. Let's try again.");
      }
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 pt-12 flex flex-col items-center justify-center min-h-[600px] border border-slate-100 relative transition-all duration-500">
        
        {/* Background Pulses */}
        {state === 'speaking' && <div className="absolute inset-0 bg-green-500/5 animate-pulse transition-all duration-500 pointer-events-none" />}
        {state === 'listening' && <div className="absolute inset-0 bg-blue-500/5 animate-pulse transition-all duration-500 pointer-events-none" />}

        <div className="text-center z-10 mb-12">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-green-500" />
                Medical Assistant Buddy
            </h1>
            <p className="text-slate-500 font-medium">Tap to speak with your personal AI health companion</p>
        </div>

        {/* Animated Robot Avatar */}
        <div className="relative my-8 lg:my-10 flex justify-center items-center z-10 min-h-[180px] lg:min-h-[200px]">
            <div className={`absolute rounded-full opacity-20 transition-all duration-1000 bg-blue-500 ${
                state === 'listening' ? 'w-64 h-64 lg:w-80 lg:h-80 animate-ping' :
                state === 'speaking' ? 'w-56 h-56 lg:w-72 lg:h-72 bg-green-500 animate-pulse' :
                state === 'processing' ? 'w-48 h-48 lg:w-64 lg:h-64 bg-amber-500 animate-spin' :
                'w-40 h-40 lg:w-56 lg:h-56 bg-slate-300'
            }`} />
            <div className={`absolute rounded-full opacity-40 transition-all duration-500 bg-blue-400 ${
                state === 'listening' ? 'w-52 h-52 lg:w-64 lg:h-64 animate-pulse' :
                state === 'speaking' ? 'w-48 h-48 lg:w-60 lg:h-60 bg-green-400 animate-pulse' :
                state === 'processing' ? 'w-40 h-40 lg:w-52 lg:h-52 bg-amber-400' :
                'w-36 h-36 lg:w-48 lg:h-48 bg-slate-200'
            }`} />
            
            <div className={`relative z-20 w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-4 ${
                state === 'listening' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-200 shadow-blue-500/50 scale-110' :
                state === 'speaking' ? 'bg-gradient-to-br from-green-400 to-teal-600 border-green-200 shadow-green-500/50 -translate-y-2' :
                state === 'processing' ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-200 shadow-amber-500/50' :
                'bg-gradient-to-br from-slate-100 to-slate-200 border-white shadow-slate-300/50 hover:shadow-slate-400/50'
            }`}>
               <Bot className={`w-16 h-16 lg:w-20 lg:h-20 transition-all duration-300 ${
                   state === 'idle' ? 'text-slate-500' : 'text-white'
               }`} />
               {state === 'speaking' && (
                 <Activity className="absolute bottom-4 lg:bottom-6 text-white/90 w-6 h-6 lg:w-8 lg:h-8 animate-pulse" />
               )}
            </div>
        </div>

        {/* Output Text */}
        <div className="h-28 w-full flex items-center justify-center z-10 px-2 lg:px-4 text-center mt-2 lg:mt-4">
            {state === 'idle' && !aiResponse && (
                <p className="text-slate-400 font-medium text-base lg:text-lg">I'm ready. Tap the microphone below.</p>
            )}
            {state === 'listening' && (
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-lg lg:text-xl animate-pulse">Listening closely...</p>
            )}
            {state === 'processing' && (
                <div className="flex flex-col items-center text-amber-600">
                    <Loader2 className="w-6 h-6 lg:w-8 lg:h-8 animate-spin mb-2 lg:mb-3" />
                    <p className="font-bold text-base lg:text-lg">Synthesizing Answer...</p>
                </div>
            )}
            {(state === 'speaking' || (state === 'idle' && aiResponse)) && (
                <div className="flex flex-col items-center w-full max-w-lg">
                   {transcript && <p className="text-xs lg:text-sm text-slate-500 mb-2 lg:mb-3 bg-slate-100 px-3 py-1.5 rounded-full shadow-sm max-w-full truncate">"{transcript}"</p>}
                   <p className="text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-teal-700 leading-snug max-h-24 overflow-y-auto w-full px-1" style={{scrollbarWidth: 'none'}}>{aiResponse}</p>
                </div>
            )}
        </div>

        {/* Controls */}
        <div className="mt-auto pt-6 pb-2 z-10 w-full flex justify-center">
            {state === 'idle' || state === 'speaking' ? (
                <button 
                  onClick={startRecording}
                  className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-2xl text-white group"
                >
                    <Mic className="w-10 h-10 group-hover:text-green-400 transition-colors" />
                </button>
            ) : state === 'listening' ? (
                <button 
                  onClick={stopRecording}
                  className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-500/30 text-white animate-pulse"
                >
                    <Square className="w-8 h-8" fill="currentColor" />
                </button>
            ) : (
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed text-slate-400">
                    <Mic className="w-10 h-10" />
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
