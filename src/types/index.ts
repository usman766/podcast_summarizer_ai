// Podcast Episode Interface
export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  publisher: string;
  thumbnail: string;
  audioUrl?: string;
  duration: number;
  publishedAt: string;
  listenNotesUrl: string;
}

// Podcast Summary Interface
export interface PodcastSummary {
  id: string;
  episodeId: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Interfaces
export interface ListenNotesResponse {
  episodes: PodcastEpisode[];
  total: number;
  next_episode_pub_date: number;
  has_next: boolean;
}

export interface SummarizationRequest {
  episodeId: string;
  content: string;
}

export interface SummarizationResponse {
  summary: string;
  episodeId: string;
}

// Service Interfaces (SOLID - Interface Segregation Principle)
export interface IPodcastService {
  fetchEpisodes(): Promise<PodcastEpisode[]>;
  fetchEpisodeById(id: string): Promise<PodcastEpisode>;
}

export interface ISummarizationService {
  summarizeContent(content: string): Promise<string>;
}

export interface IStorageService {
  saveSummary(summary: PodcastSummary): Promise<void>;
  getSummary(episodeId: string): Promise<PodcastSummary | null>;
  getAllSummaries(): Promise<PodcastSummary[]>;
}

// UI State Interfaces
export interface AppState {
  episodes: PodcastEpisode[];
  selectedEpisode: PodcastEpisode | null;
  summaries: PodcastSummary[];
  loading: boolean;
  error: string | null;
}

// Component Props Interfaces
export interface EpisodeCardProps {
  episode: PodcastEpisode;
  onSelect: (episode: PodcastEpisode) => void;
  isSelected: boolean;
  hasSummary: boolean;
}

export interface SummaryDisplayProps {
  summary: PodcastSummary;
  episode: PodcastEpisode;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Environment Variables Interface
export interface EnvironmentConfig {
  LISTEN_NOTES_API_KEY: string;
  GEMINI_API_KEY: string;
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;
} 