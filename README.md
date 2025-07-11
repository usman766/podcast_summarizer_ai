# 🎵 Podcast Summarizer

An AI-powered web application that fetches podcast episodes from the Listen Notes API and generates intelligent summaries using Google's Gemini AI model. Built with Next.js, TypeScript, and MongoDB following SOLID principles.

## ✨ Features

- **Podcast Discovery**: Fetch and display podcast episodes from Listen Notes API
- **AI Summarization**: Generate intelligent summaries using Google Gemini AI
- **Persistent Storage**: Save summaries to MongoDB for future reference
- **Clean Architecture**: Built following SOLID principles with proper separation of concerns
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS
- **Error Handling**: Comprehensive error handling and loading states

## 🏗️ Architecture

The application follows clean architecture principles with clear separation of concerns:

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── EpisodeCard.tsx
│   └── SummaryDisplay.tsx
├── services/          # Business logic layer
│   ├── AppService.ts      # Main orchestrator
│   ├── PodcastService.ts  # Listen Notes API
│   ├── SummarizationService.ts # Gemini AI
│   └── StorageService.ts  # MongoDB operations
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
└── hooks/             # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance
- Listen Notes API key
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd podcast-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
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

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 API Keys Setup

### Listen Notes API
1. Visit [Listen Notes](https://www.listennotes.com/api/docs/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

### MongoDB
1. Set up a MongoDB instance (local or cloud)
2. Update the `MONGODB_URI` in your `.env.local` file

## 🏛️ SOLID Principles Implementation

### Single Responsibility Principle (SRP)
- `PodcastService`: Handles only podcast-related operations
- `SummarizationService`: Manages only AI summarization
- `StorageService`: Responsible only for data persistence

### Open/Closed Principle (OCP)
- Services implement interfaces allowing for easy extension
- New summarization models can be added without modifying existing code

### Liskov Substitution Principle (LSP)
- All services implement their respective interfaces
- Any implementation can be substituted without breaking functionality

### Interface Segregation Principle (ISP)
- Separate interfaces for different concerns:
  - `IPodcastService`
  - `ISummarizationService`
  - `IStorageService`

### Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions
- `AppService` orchestrates through interfaces

## 🎨 UI/UX Features

- **Clean Design**: Modern, minimalist interface
- **Responsive Layout**: Works on desktop and mobile
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Visual Feedback**: Clear indication of summarized episodes

## 🔄 User Flow

1. **Episode Discovery**: App loads and fetches podcast episodes
2. **Episode Selection**: User clicks on an episode to select it
3. **Summary Generation**: User clicks "Summarize" button
4. **AI Processing**: App sends episode data to Gemini AI
5. **Display Results**: Generated summary is displayed
6. **Persistence**: Summary is saved to MongoDB for future access

## 🛠️ Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Database**: MongoDB
- **API**: Listen Notes API
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
assessment-oop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── episodes/      # Podcast episodes endpoint
│   │   │   └── summarize/     # Summarization endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page component
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── EpisodeCard.tsx   # Episode display component
│   │   └── SummaryDisplay.tsx # Summary display component
│   ├── services/             # Business logic
│   │   ├── AppService.ts     # Main orchestrator
│   │   ├── PodcastService.ts # Listen Notes integration
│   │   ├── SummarizationService.ts # Gemini AI integration
│   │   └── StorageService.ts # MongoDB operations
│   ├── types/                # TypeScript interfaces
│   │   └── index.ts          # All type definitions
│   └── utils/                # Utility functions
│       ├── constants.ts      # App constants
│       ├── helpers.ts        # Helper functions
│       └── cn.ts            # Class name utility
├── package.json              # Dependencies and scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md               # Project documentation
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `LISTEN_NOTES_API_KEY`
- `GEMINI_API_KEY`
- `MONGODB_URI`
- `MONGODB_DB_NAME`

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Listen Notes API](https://www.listennotes.com/api/docs/) for podcast data
- [Google Gemini AI](https://ai.google.dev/) for AI summarization
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for data persistence

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ following SOLID principles and modern development practices.** 