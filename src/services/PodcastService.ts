import axios from 'axios';
import { IPodcastService, PodcastEpisode, ListenNotesResponse, ApiError } from '@/types';
import { API_ENDPOINTS, ENV_VARS, ERROR_MESSAGES } from '@/utils/constants';
import { validateApiResponse, retry } from '@/utils/helpers';

export class PodcastService implements IPodcastService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = ENV_VARS.LISTEN_NOTES_API_KEY;
    this.baseUrl = API_ENDPOINTS.LISTEN_NOTES_BASE;
    
    if (!this.apiKey) {
      throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-ListenAPI-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await retry(async () => {
        const result = await axios.get(url, {
          headers,
          params,
          timeout: 10000,
        });
        return result.data;
      });

      if (!validateApiResponse(response)) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.error || ERROR_MESSAGES.NETWORK_ERROR,
          status: error.response?.status || 500,
          code: error.code,
        };
        throw apiError;
      }
      throw error;
    }
  }

  async fetchEpisodes(): Promise<PodcastEpisode[]> {
    try {
      const response = await this.makeRequest<ListenNotesResponse>(API_ENDPOINTS.EPISODES, {
        type: 'episodes',
        q: 'technology', // Default search term
        only_in: 'title,description',
        language: 'English',
        safe_mode: 1,
        len_min: 10,
        len_max: 60,
        published_after: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // Last 30 days
      });

      return response.episodes.map(this.mapEpisodeData);
    } catch (error) {
      console.error('Error in PodcastService.fetchEpisodes:', error);
      throw error;
    }
  }

  async fetchEpisodeById(id: string): Promise<PodcastEpisode> {
    try {
      const response = await this.makeRequest<any>(`${API_ENDPOINTS.EPISODES}/${id}`);
      return this.mapEpisodeData(response);
    } catch (error) {
      console.error('Error fetching episode by ID:', error);
      throw error;
    }
  }

  private mapEpisodeData(episodeData: any): PodcastEpisode {
    return {
      id: episodeData.id,
      title: episodeData.title,
      description: episodeData.description,
      publisher: episodeData.publisher,
      thumbnail: episodeData.image || episodeData.thumbnail,
      audioUrl: episodeData.audio,
      duration: episodeData.audio_length_sec,
      publishedAt: episodeData.pub_date_ms,
      listenNotesUrl: episodeData.listennotes_url,
    };
  }
} 