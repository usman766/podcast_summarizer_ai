# 🚀 Podcast Summarizer Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   LISTEN_NOTES_API_KEY=your_listen_notes_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=mongodb://localhost:27017/podcast_summarizer
   MONGODB_DB_NAME=podcast_summarizer
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Get API Keys**

   ### Listen Notes API
   - Visit: https://www.listennotes.com/api/docs/
   - Sign up for a free account
   - Get your API key from the dashboard

   ### Google Gemini AI
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy the key to your `.env.local` file

   ### MongoDB
   - Set up a MongoDB instance (local or cloud)
   - Update the `MONGODB_URI` in your `.env.local` file

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to http://localhost:3000

## Architecture Overview

This application follows SOLID principles:

- **Single Responsibility**: Each service has one clear purpose
- **Open/Closed**: Services can be extended without modification
- **Liskov Substitution**: Services implement interfaces
- **Interface Segregation**: Separate interfaces for different concerns
- **Dependency Inversion**: High-level modules depend on abstractions

## Key Features

✅ **Podcast Discovery**: Fetches episodes from Listen Notes API  
✅ **AI Summarization**: Uses Google Gemini for intelligent summaries  
✅ **Persistent Storage**: Saves summaries to MongoDB  
✅ **Clean Architecture**: Follows SOLID principles  
✅ **Responsive Design**: Works on all devices  
✅ **Error Handling**: Comprehensive error management  

## File Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
├── services/          # Business logic layer
├── types/             # TypeScript interfaces
└── utils/             # Utility functions
```

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure all API keys are correctly set in `.env.local`
   - Check that the keys are valid and have proper permissions

2. **MongoDB Connection Issues**
   - Verify MongoDB is running
   - Check the connection string format
   - Ensure network access is configured

3. **Build Errors**
   - Run `npm run type-check` to check TypeScript
   - Run `npm run lint` to check code quality

### Development Commands

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

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check the README.md for detailed documentation

---

**Happy coding! 🎵** 