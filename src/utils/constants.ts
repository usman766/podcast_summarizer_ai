// API Endpoints
export const API_ENDPOINTS = {
  LISTEN_NOTES_BASE: 'https://listen-api.listennotes.com/api/v2',
  EPISODES: '/episodes',
  SEARCH: '/search',
} as const;

// Environment Variables
export const ENV_VARS = {
  LISTEN_NOTES_API_KEY: process.env.LISTEN_NOTES_API_KEY || '',
  GEMINI_API_KEY: 'AIzaSyALqLO2zR461NRf5d_pkBFUqX7suuJHzN8',
  MONGODB_URI: process.env.MONGODB_URI || '',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'podcast_summarizer',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  LOADING_DELAY: 1000,
  MAX_DESCRIPTION_LENGTH: 200,
  EPISODES_PER_PAGE: 10,
} as const;
  
// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API key is missing. Please check your environment variables.',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  SUMMARIZATION_FAILED: 'Failed to generate summary. Please try again.',
  EPISODE_NOT_FOUND: 'Episode not found.',
  DATABASE_ERROR: 'Database error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SUMMARY_GENERATED: 'Summary generated successfully!',
  SUMMARY_SAVED: 'Summary saved successfully!',
} as const;

// Gemini Configuration
export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-flash',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
} as const;

// MongoDB Configuration
export const MONGODB_CONFIG = {
  COLLECTION_NAME: 'summaries',
  INDEX_FIELDS: ['episodeId'],
} as const; 