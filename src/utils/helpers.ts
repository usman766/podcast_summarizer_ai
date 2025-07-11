import { PodcastEpisode, PodcastSummary } from '@/types';

// Format duration from seconds to readable format
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Format date to readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Check if episode has summary
export const hasSummary = (
  episodeId: string,
  summaries: PodcastSummary[]
): boolean => {
  return summaries.some(summary => summary.episodeId === episodeId);
};

// Get summary for episode
export const getSummaryForEpisode = (
  episodeId: string,
  summaries: PodcastSummary[]
): PodcastSummary | null => {
  return summaries.find(summary => summary.episodeId === episodeId) || null;
};

// Validate API response
export const validateApiResponse = (response: any): boolean => {
  return response && typeof response === 'object' && !response.error;
};

// Sanitize text for AI processing
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[^\w\s.,!?-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Retry function with exponential backoff
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError!;
}; 