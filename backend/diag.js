require('dotenv').config();
const axios = require('axios');
const Groq = require('groq-sdk');

async function check() {
    try {
        console.log('Testing Groq Connection...');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'test signal' }],
            model: 'llama-3.3-70b-versatile'
        });
        console.log('[OK] Groq LLaMA 3.3 Responded!');

        console.log('Testing Deepgram TTS Connection...');
        const deepgramTtsUrl = 'https://api.deepgram.com/v1/speak?model=aura-asteria-en';
        await axios.post(deepgramTtsUrl, { text: 'test signal' }, {
            headers: {
                'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('[OK] Deepgram TTS Responded!');

    } catch (e) {
        console.error('[ERROR]', e.response ? e.response.data : e.message);
    }
}
check();
