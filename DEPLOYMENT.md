# Virtual AI Chatbot - Deployment Guide

# Virtual AI Chatbot - API Analysis & Deployment Guide

## � **Deep API Analysis Results**

### **APIs Currently Used:**

#### 1. **OpenAI API** 🤖 ✅ **CONFIRMED**
- **Purpose**: AI conversation engine (main chatbot functionality)
- **Model**: `gpt-3.5-turbo`
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Implementation**: 
  - Service wrapper in `chatgpt-service.js`
  - Direct calls in `avatar-experience.js`
- **Required**: YES (core functionality)
- **Environment Variable**: `OPENAI_API_KEY`

#### 2. **ElevenLabs API** 🎵 ✅ **CONFIRMED**
- **Purpose**: Text-to-speech voice synthesis
- **Endpoint**: `https://api.elevenlabs.io/v1/text-to-speech/`
- **Voice ID**: `gllMMawbYGTja23oQ3Vu`
- **Implementation**: Direct calls in `avatar-experience.js`
- **Required**: OPTIONAL (for voice features)
- **Environment Variable**: `ELEVENLABS_API_KEY`

#### 3. **Firebase API** 🔐 ✅ **CONFIRMED**
- **Purpose**: User authentication (Google Sign-in)
- **Services**: Firebase Auth
- **Implementation**: `firebase-config.js`
- **Required**: YES (for user management)
- **Configuration**: Already in code (public config)

#### 4. **Google Gemini API** ✅ **AVAILABLE & TESTED**
- **Purpose**: Alternative AI conversation engine
- **Model**: `gemini-2.0-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/`
- **API Key**: `AIzaSyCjvMkx6TUTcbmzAKFhp6g3uU9c3ztzmS0`
- **Implementation**: New service created in `gemini-service.js`
- **Status**: Successfully tested via terminal ✅
- **Required**: OPTIONAL (alternative to OpenAI)
- **Environment Variable**: `GEMINI_API_KEY`

### 🚨 **CRITICAL SECURITY ISSUES FOUND**

#### **Exposed API Keys in Code:**
- ⚠️ **OpenAI API Key** exposed in `avatar-experience.js` line 441
- ⚠️ **ElevenLabs API Key** exposed in `avatar-experience.js` line 442

**These keys are visible to anyone who views your code!**

### **� Key Benefits:**

1. **💰 Cost Savings**: Gemini FREE TIER (0 cost vs OpenAI $0.002/1K tokens)
2. **🚀 Performance**: Gemini 2.0 Flash is fast and efficient  
3. **🔄 Flexibility**: Can easily switch back to OpenAI when needed
4. **🛡️ Reliability**: Dual AI service with automatic fallback

### 4. **Custom Backend API** 🛠
- **Purpose**: Chat history, conversations, messages
- **Endpoints**:
  - `POST /api/conversations` - Create conversation
  - `GET /api/conversations/:userId` - Get user conversations
  - `DELETE /api/conversations/:conversationId` - Delete conversation
  - `POST /api/messages` - Save messages
  - `GET /api/messages/:conversationId` - Get conversation messages
  - `GET /api/search` - Search functionality
  - `GET /api/health/database` - Health check

## 🚀 Deployment Steps

### Step 1: Prepare for GitHub
1. Update your backend URL in `chat-history-service.js` (line 8):
   ```javascript
   this.baseUrl = 'https://your-render-app-name.onrender.com/api';
   ```

### Step 2: Deploy Backend to Render
1. **Connect GitHub**: Link your repository to Render
2. **Service Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x
3. **Environment Variables** (Add these in Render dashboard):
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=virtual_ai
   DB_PORT=3306
   OPENAI_API_KEY=your_openai_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key (optional)
   NODE_ENV=production
   ```

### Step 3: Database Setup
**Option A: Use Render PostgreSQL** (Recommended)
- Add PostgreSQL service in Render
- Update `db-config.js` to use PostgreSQL instead of MySQL

**Option B: External MySQL**
- Use PlanetScale, Railway, or another MySQL provider
- Add connection details to environment variables

### Step 4: Deploy Frontend
**Option A: GitHub Pages**
1. Build the project: `npm run build`
2. Push the `dist` folder to `gh-pages` branch

**Option B: Netlify/Vercel**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Step 5: Update URLs
After deployment, update the backend URL in:
- `src/js/chat-history-service.js` (line 8)

## 🔧 Quick Setup Commands

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Test backend locally
npm run backend

# 4. Setup database (run once)
npm run setup-db
```

## 📝 Environment Variables Needed

### For Render (Backend)
- `OPENAI_API_KEY` - Get from OpenAI
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (virtual_ai)
- `ELEVENLABS_API_KEY` - Optional, for voice features

### For Frontend
- No environment variables needed (uses Firebase config in code)

## 🌐 Post-Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Database connected and tables created
- [ ] Frontend deployed to hosting service
- [ ] Backend URL updated in frontend code
- [ ] CORS configured for your frontend domain
- [ ] OpenAI API key working
- [ ] Firebase authentication working
- [ ] Test chat functionality
- [ ] Test voice features (if enabled)

## 🔗 Useful Links

- **Render**: https://render.com
- **OpenAI API**: https://platform.openai.com/api-keys
- **Firebase Console**: https://console.firebase.google.com
- **ElevenLabs**: https://elevenlabs.io/api