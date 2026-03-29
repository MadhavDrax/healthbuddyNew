# HealthBuddy

A full-stack health and wellness application that provides AI-powered health advice, real-time chat, and personalized health tracking.

![HealthBuddy](https://img.shields.io/badge/Health-AI%20Powered-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## Features

- **AI Health Chat**: Get instant, personalized health advice powered by Groq's Llama 3.3-70b model
- **Real-time Communication**: WebSocket-based chat via Socket.IO
- **Health Tips**: Discover daily wellness tips covering nutrition, exercise, mental health, and sleep
- **User Profiles**: Track personal health metrics (age, weight, height, blood group)
- **Speech-to-Text**: Convert voice messages to text using AssemblyAI (optional)
- **Responsive Design**: Modern, mobile-friendly React UI with Tailwind CSS

## Tech Stack

| Category | Backend | Frontend |
|----------|---------|----------|
| Runtime | Node.js | React 19 |
| Framework | Express.js | Vite |
| Database | MongoDB (Mongoose) | - |
| Real-time | Socket.IO | socket.io-client |
| AI/LLM | Groq API | - |
| Styling | - | Tailwind CSS |
| Icons | - | Lucide React |
| HTTP Client | Axios | Axios |

## Project Structure

```
healthbuddy/
├── backend/
│   ├── index.js                 # Main application entry point
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Environment configuration
│   ├── dockerfile               # Docker container config
│   └── src/
│       ├── config/
│       │   ├── database.js      # MongoDB connection
│       │   └── constants.js     # App constants
│       ├── models/
│       │   ├── User.js          # User schema
│       │   ├── Message.js       # Chat message schema
│       │   └── HealthTip.js     # Health tip schema
│       ├── routes/
│       │   ├── chat.js          # Chat endpoints
│       │   ├── speech.js        # Speech endpoints
│       │   ├── health.js        # Health tips endpoints
│       │   └── userRoutes.js    # User CRUD endpoints
│       ├── services/
│       │   ├── groq.js          # Groq AI service
│       │   └── assemblyai.js    # AssemblyAI service
│       └── utils/
│           ├── logger.js        # Winston logger
│           ├── rateLimit.js     # Rate limiter
│           └── errors.js        # Error classes
│
└── frontend/
    ├── src/
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # Entry point
    │   ├── index.css            # Tailwind styles
    │   ├── components/
    │   │   └── Layout.jsx       # Navigation layout
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page
    │   │   ├── Chat.jsx         # AI chat interface
    │   │   ├── HealthTips.jsx   # Health tips page
    │   │   └── Profile.jsx      # User profile
    │   ├── context/
    │   │   └── AuthContext.jsx  # Auth state management
    │   └── services/
    │       ├── api.js           # API client
    │       └── socket.js        # Socket.IO client
    ├── package.json             # Frontend dependencies
    ├── tailwind.config.js       # Tailwind configuration
    ├── vite.config.js           # Vite configuration
    └── .env                     # Frontend environment
```

## Getting Started

### Prerequisites

- Node.js 18+ (v20 recommended)
- MongoDB Atlas account or local MongoDB
- Groq API key (get from https://console.groq.com)
- AssemblyAI API key (optional, for speech features)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Edit `.env` file:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ASSEMBLY_AI_API_KEY=your_assemblyai_api_key
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

### Chat (`/api/chat`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/message` | Send message to AI assistant |
| GET | `/history/:userId` | Get user's chat history |

### Health Tips (`/api/health`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tips?category=` | Get random health tip |

Categories: `nutrition`, `exercise`, `mental-health`, `sleep`, `general`

### Users (`/api/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/createuser` | Create new user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Speech (`/api/speech`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transcribe` | Transcribe audio to text |
| POST | `/tts` | Convert text to speech |

### WebSocket Events (Socket.IO)
| Event | Direction | Description |
|-------|-----------|-------------|
| `send_message` | Client → Server | Send chat message |
| `receive_message` | Server → Client | Receive AI response |

## Configuration

### CORS Settings

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (alternative React port)
- `https://healthbuddy-x0enff.flutterflow.app` (FlutterFlow app)

To add more origins, edit `backend/index.js`:
```javascript
const corsOptions = {
  origin: ['https://healthbuddy-x0enff.flutterflow.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

### Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configure via `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS` in `.env`

## Running in Production

### Using Docker (Backend)

```bash
cd backend
docker build -t healthbuddy-backend .
docker run -p 3001:3001 --env-file .env healthbuddy-backend
```

### Building Frontend for Production

```bash
cd frontend
npm run build
# Serve the dist/ folder with any static file server
```

## Troubleshooting

### CORS Errors

If you encounter CORS errors:
1. Ensure backend `index.js` has your frontend URL in `corsOptions`
2. Check that the frontend is using the correct API URL in `.env`
3. Restart both servers after making changes

### Socket.IO Connection Issues

1. Verify the backend server is running on port 3001
2. Check that Vite proxy is configured in `vite.config.js`
3. Ensure firewall allows WebSocket connections

### Database Connection Errors

1. Verify MongoDB URI is correct in `.env`
2. Check network access is allowed in MongoDB Atlas
3. Ensure IP is whitelisted in MongoDB Atlas

## Screenshots

### Home Page
Landing page with feature cards and quick actions

### Chat Interface
Real-time AI-powered health conversation

### Health Tips
Category-based wellness tips

### User Profile
Personal health metrics management

## Author

Madhav

## License

ISC

## Acknowledgments

- [Groq](https://groq.com) for fast AI inference
- [AssemblyAI](https://assemblyai.com) for speech-to-text
- [Socket.IO](https://socket.io) for real-time communication
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide Icons](https://lucide.dev) for beautiful icons
