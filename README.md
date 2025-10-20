# Virtual AI

![Virtual AI Interface](web_interface.png)

AI-powered virtual assistant with 3D avatar and persistent chat history.

## Features

### Virtual AI (3D Interactive Character) 2025
- 3D virtual AI assistant with natural conversation capabilities
- Real-time performance using ChatGPT/Gemini API
- Interactive movement and emotion responses
- Planned integration with K2Think.ai API for enhanced realism (when access available)

### Core Features
- 3D avatar with realistic animations
- AI integration (Gemini & OpenAI)
- Persistent chat history (MySQL)
- Voice synthesis 
- Firebase authentication
- Real-time conversations

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Setup database
npm run setup-db

# Start backend
npm start

# Start frontend (in another terminal)
npm run dev:frontend
```

## Configuration

Create `backend/.env` file:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=virtual_ai_chat
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

## Development

```bash
# Frontend development server
npm run dev:frontend

# Backend development server
npm run dev:backend

# Build frontend for production
npm run build
```

## Project Structure

```
virtual-ai/
├── frontend/           # Frontend application
│   ├── src/           # JavaScript modules
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
├── backend/           # Backend API server
│   ├── src/           # Server code
│   ├── .env           # Environment variables
│   └── package.json   # Backend dependencies
└── package.json       # Root workspace configuration
```

## Tech Stack

- **Frontend**: Vite, Three.js, JavaScript, GSAP
- **Backend**: Node.js, Express
- **Database**: MySQL
- **AI**: Gemini API, OpenAI API
- **Auth**: Firebase
- **3D Rendering**: Three.js with GLTFLoader, OrbitControls, Post-processing
- **Animation**: GSAP Timeline, Three.js AnimationMixer
- **Audio**: Web Audio API, Real-time lip sync with visemes

## 3D Avatar Features

### 3D Model & Rendering
- **High-quality 3D avatar** with realistic facial features
- **Professional lighting setup** with key, fill, and rim lights
- **Contact shadows** and environmental lighting
- **Post-processing effects** with bloom and anti-aliasing
- **Responsive 3D scene** with orbit controls

### Facial Expressions & Emotions
- **6 Core Expressions**: Default, Smile, Sad, Surprised, Angry, Funny Face, Talking
- **Morph Target Animation** with smooth transitions
- **Context-aware reactions** based on conversation content
- **Automatic winking** during speech for natural behavior
- **Dynamic facial movements** synchronized with voice

### Animation System
- **Idle animations** for natural standing behavior  
- **Gesture animations** triggered by conversation context
- **Greeting animations** with waving and smiling
- **Temporary animation** system returning to idle state
- **GSAP-powered** smooth transitions and timing

### Advanced Lip Sync
- **Real-time viseme mapping** (A-H phonemes to mouth shapes)
- **Audio calibration** for optimal speech detection
- **Volume-based** mouth movement intensity
- **Phoneme-accurate** lip synchronization
- **Natural speech patterns** with breathing animations

### Interactive Reactions
- **Greeting Detection**: "Hi/Salam" triggers waving + smile
- **Emotion Recognition**: AI response tone affects facial expressions
- **Voice Response**: Real-time mouth movements during speech
- **Random Behaviors**: Subtle winks and micro-expressions
- **Cultural Responses**: Islamic phrases trigger appropriate reactions

## License

MIT
