const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');

// Setup multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/speak', auth, upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        const audioBuffer = req.file.buffer;

        // 1. Convert Speech to Text (STT) using Deepgram
        const deepgramSttUrl = 'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true';
        console.log('Sending audio to Deepgram for STT...');
        const sttResponse = await axios.post(deepgramSttUrl, audioBuffer, {
            headers: {
                'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                // Generic content type or specific to the recorded blob. Usually webm.
                'Content-Type': req.file.mimetype || 'audio/webm'
            }
        });

        const channels = sttResponse.data?.results?.channels;
        if (!channels || channels.length === 0) {
            throw new Error('No transcription results returned from Deepgram STT');
        }

        const transcript = channels[0].alternatives[0].transcript;
        console.log('Transcribed Text:', transcript);

        if (!transcript || transcript.trim() === '') {
             // If nothing detected, return a default audio saying "I didn't catch that"
            return handleEmptyAudio(res);
        }

        // 2. Generate AI Response using Groq LLM
        console.log('Generating AI response via Groq...');
        const groqRes = await groq.chat.completions.create({
            messages: [
                { 
                    role: 'system', 
                    content: 'You are HealthBuddy, a highly advanced, compassionate medical and wellness AI robot. Respond strictly in 2-3 short, conversational sentences. Keep it extremely natural, friendly, and helpful. Do not use markdown like bolding or bullet points, because your text will be converted to speech.' 
                },
                { 
                    role: 'user', 
                    content: transcript 
                }
            ],
            model: 'llama-3.3-70b-versatile'
        });

        const aiTextRes = groqRes.choices[0].message.content;
        console.log('AI Response:', aiTextRes);

        // 3. Convert Text to Speech (TTS) using Deepgram Aura
        console.log('Converting text to speech using Deepgram Aura...');
        const deepgramTtsUrl = 'https://api.deepgram.com/v1/speak?model=aura-asteria-en';
        const ttsResponse = await axios.post(deepgramTtsUrl, { text: aiTextRes }, {
            headers: {
                'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        });

        // 4. Send Audio Buffer back to client
        res.set('Content-Type', 'audio/mpeg');
        res.set('X-Transcript', encodeURIComponent(transcript));
        res.set('X-AI-Response', encodeURIComponent(aiTextRes));
        res.send(ttsResponse.data);

    } catch (error) {
        console.error("Error processing voice flow:", error.message);
        if (error.response) {
            console.error("API Error Data:", error.response.data || error.response);
            return res.status(500).json({ error: error.response.data?.error?.message || error.response.data || 'API Error' });
        }
        res.status(500).json({ error: error.message || 'Internal server error processing voice' });
    }
});

async function handleEmptyAudio(res) {
     try {
         const fallbackText = "I'm sorry, I couldn't hear what you said. Could you please repeat that?";
         const deepgramTtsUrl = 'https://api.deepgram.com/v1/speak?model=aura-asteria-en';
         const ttsResponse = await axios.post(deepgramTtsUrl, { text: fallbackText }, {
             headers: {
                 'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                 'Content-Type': 'application/json'
             },
             responseType: 'arraybuffer'
         });
         
         res.set('Content-Type', 'audio/mpeg');
         res.set('X-Transcript', encodeURIComponent(""));
         res.set('X-AI-Response', encodeURIComponent(fallbackText));
         res.send(ttsResponse.data);
     } catch(err) {
         res.status(500).json({ error: 'Failed to process audio' });
     }
}

module.exports = router;
