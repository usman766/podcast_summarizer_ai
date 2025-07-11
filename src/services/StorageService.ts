import { MongoClient, Db, Collection } from 'mongodb';
import { IStorageService, PodcastSummary } from '@/types';
import { ENV_VARS, MONGODB_CONFIG, ERROR_MESSAGES } from '@/utils/constants';
import { generateId } from '@/utils/helpers';

export class StorageService implements IStorageService {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private collection: Collection | null = null;

  constructor() {
    if (!ENV_VARS.MONGODB_URI) {
      throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }
  }

  private async connect(): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(ENV_VARS.MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(ENV_VARS.MONGODB_DB_NAME);
      this.collection = this.db.collection(MONGODB_CONFIG.COLLECTION_NAME);
      
      // Create index for faster queries
      await this.collection.createIndex({ episodeId: 1 }, { unique: true });
    }
  }

  private async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collection = null;
    }
  }

  async saveSummary(summary: PodcastSummary): Promise<void> {
    try {
      await this.connect();
      
      if (!this.collection) {
        throw new Error('Database connection not established');
      }

      const summaryDoc = {
        ...summary,
        id: summary.id || generateId(),
        createdAt: summary.createdAt || new Date(),
        updatedAt: new Date(),
      };

      await this.collection.updateOne(
        { episodeId: summary.episodeId },
        { $set: summaryDoc },
        { upsert: true }
      );
    } catch (error) {
      console.error('Error saving summary:', error);
      throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    } finally {
      await this.disconnect();
    }
  }

  async getSummary(episodeId: string): Promise<PodcastSummary | null> {
    try {
      await this.connect();
      
      if (!this.collection) {
        throw new Error('Database connection not established');
      }

      const result = await this.collection.findOne({ episodeId });
      
      if (!result) {
        return null;
      }

      return {
        id: result.id,
        episodeId: result.episodeId,
        summary: result.summary,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt),
      };
    } catch (error) {
      console.error('Error getting summary:', error);
      throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    } finally {
      await this.disconnect();
    }
  }

  async getAllSummaries(): Promise<PodcastSummary[]> {
    try {
      await this.connect();
      
      if (!this.collection) {
        throw new Error('Database connection not established');
      }

      const results = await this.collection.find({}).toArray();
      
      return results.map(result => ({
        id: result.id,
        episodeId: result.episodeId,
        summary: result.summary,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt),
      }));
    } catch (error) {
      console.error('Error getting all summaries:', error);
      throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
    } finally {
      await this.disconnect();
    }
  }
} 