import { PodcastService } from './PodcastService';
import { MockPodcastService } from './MockPodcastService';
import { SummarizationService } from './SummarizationService';
// import { MockSummarizationService } from './MockSummarizationService';
import { StorageService } from './StorageService';
import { PodcastEpisode, PodcastSummary, AppState, IStorageService } from '@/types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, ENV_VARS } from '@/utils/constants';
import { generateId } from '@/utils/helpers';

// Mock storage service for development
class MockStorageService implements IStorageService {
  async saveSummary(summary: PodcastSummary): Promise<void> {
    if (typeof window !== 'undefined') {
      const summaries = JSON.parse(localStorage.getItem('podcast-summaries') || '[]');
      const existingIndex = summaries.findIndex((s: any) => s.episodeId === summary.episodeId);
      if (existingIndex >= 0) {
        summaries[existingIndex] = summary;
      } else {
        summaries.push(summary);
      }
      localStorage.setItem('podcast-summaries', JSON.stringify(summaries));
    }
  }

  async getSummary(episodeId: string): Promise<PodcastSummary | null> {
    if (typeof window !== 'undefined') {
      const summaries = JSON.parse(localStorage.getItem('podcast-summaries') || '[]');
      const summary = summaries.find((s: any) => s.episodeId === episodeId);
      return summary ? { ...summary, createdAt: new Date(summary.createdAt), updatedAt: new Date(summary.updatedAt) } : null;
    }
    return null;
  }

  async getAllSummaries(): Promise<PodcastSummary[]> {
    if (typeof window !== 'undefined') {
      const summaries = JSON.parse(localStorage.getItem('podcast-summaries') || '[]');
      return summaries.map((s: any) => ({ ...s, createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) }));
    }
    return [];
  }
}

export class AppService {
  private podcastService: PodcastService | MockPodcastService;
  private summarizationService: SummarizationService;
  private storageService: StorageService | MockStorageService;

  constructor() {
    // Use mock podcast service if Listen Notes API key is not available
    const hasListenNotesKey = ENV_VARS.LISTEN_NOTES_API_KEY && ENV_VARS.LISTEN_NOTES_API_KEY !== '';
    const hasMongoUri = ENV_VARS.MONGODB_URI && ENV_VARS.MONGODB_URI !== '';

    this.podcastService = hasListenNotesKey ? new PodcastService() : new MockPodcastService();
    this.summarizationService = new SummarizationService(); // Always use real Gemini
    this.storageService = hasMongoUri ? new StorageService() : new MockStorageService();
  }

  async fetchEpisodes(): Promise<PodcastEpisode[]> {
    try {
      return await this.podcastService.fetchEpisodes();
    } catch (error) {
      console.error('Error fetching episodes:', error);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  async generateSummary(episode: PodcastEpisode): Promise<PodcastSummary> {
    try {
      // Check if summary already exists
      const existingSummary = await this.storageService.getSummary(episode.id);
      if (existingSummary) {
        return existingSummary;
      }

      // Generate content for summarization
      const content = this.buildContentForSummarization(episode);
      
      // Generate summary using AI
      const summaryText = await this.summarizationService.summarizeContent(content);
      // console.log('Summary text: ai', summaryText);

      // Create summary object
      const summary: PodcastSummary = {
        id: generateId(),
        episodeId: episode.id,
        summary: summaryText,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to database
      await this.storageService.saveSummary(summary);
      
      return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error(ERROR_MESSAGES.SUMMARIZATION_FAILED);
    }
  }

  async getSummary(episodeId: string): Promise<PodcastSummary | null> {
    try {
      return await this.storageService.getSummary(episodeId);
    } catch (error) {
      console.error('Error getting summary:', error);
      throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  async getAllSummaries(): Promise<PodcastSummary[]> {
    try {
      return await this.storageService.getAllSummaries();
    } catch (error) {
      console.error('Error getting all summaries:', error);
      throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    }
  }

  private buildContentForSummarization(episode: PodcastEpisode): string {
    const content = [
      `Title: ${episode.title}`,
      `Publisher: ${episode.publisher}`,
      `Description: ${episode.description}`,
    ].join('\n\n');

    return content;
  }
} 