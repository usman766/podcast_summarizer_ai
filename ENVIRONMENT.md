# 🔧 Environment Setup Guide

## Quick Start (Demo Mode)

The application can run in **demo mode** without any API keys for testing and development:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to http://localhost:3000

The app will automatically use mock data and localStorage for persistence when API keys are not provided.

## Production Setup

For production use with real APIs, you'll need to set up the following:

### 1. Listen Notes API
- Visit: https://www.listennotes.com/api/docs/
- Sign up for a free account
- Get your API key from the dashboard

### 2. Google Gemini AI
- Visit: https://makersuite.google.com/app/apikey
- Create a new API key
- Copy the key

### 3. MongoDB
- Set up a MongoDB instance (local or cloud)
- Get your connection string

### 4. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Listen Notes API Configuration
LISTEN_NOTES_API_KEY=your_listen_notes_api_key_here

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/podcast_summarizer
MONGODB_DB_NAME=podcast_summarizer

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Demo Mode Features

When running in demo mode (no API keys), the app provides:

✅ **Mock Podcast Episodes** - 5 sample episodes with realistic data  
✅ **Mock AI Summaries** - Pre-generated summaries for each episode  
✅ **Local Storage** - Summaries saved to browser localStorage  
✅ **Full UI Experience** - Complete user interface functionality  
✅ **Error Handling** - Graceful fallbacks for missing APIs  

## Switching Between Modes

The app automatically detects your environment:

- **Demo Mode**: No API keys provided → Uses mock services
- **Production Mode**: All API keys provided → Uses real services

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   npm run dev -- -p 3001
   ```

2. **TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Linting issues**
   ```bash
   npm run lint
   ```

4. **Build errors**
   ```bash
   npm run build
   ```

### API Key Issues

- Ensure API keys are correctly formatted
- Check that keys have proper permissions
- Verify network connectivity
- Check API rate limits

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `LISTEN_NOTES_API_KEY`
- `GEMINI_API_KEY`
- `MONGODB_URI`
- `MONGODB_DB_NAME`

---

**The app is designed to work seamlessly in both demo and production modes! 🚀** 