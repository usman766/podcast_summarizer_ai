'use client';

import { useState, useEffect } from 'react';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  publisher: string;
  thumbnail: string;
  duration: number;
  publishedAt: string;
}

interface PodcastSummary {
  id: string;
  episodeId: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function HomePage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [summaries, setSummaries] = useState<PodcastSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSummary, setCurrentSummary] = useState<PodcastSummary | null>(null);
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    fetchEpisodes();
    fetchSummaries();
  }, []);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/episodes');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setEpisodes(data.episodes || []);
      setIsMockMode(data.episodes?.some((ep: any) => ep.id.startsWith('mock-')));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummaries = async () => {
    try {
      const response = await fetch('/api/summaries');
      const data = await response.json();
      setSummaries(data.summaries || []);
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleEpisodeSelect = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
    setCurrentSummary(null);
  };

  const handleSummarize = async () => {
    if (!selectedEpisode) return;
    // Only call if no summary exists
    if (summaries.find(s => s.episodeId === selectedEpisode.id)) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ episode: selectedEpisode }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const summary = data.summary;
      setCurrentSummary(summary);
      setSummaries(prev => {
        const existing = prev.find(s => s.episodeId === summary.episodeId);
        if (existing) {
          return prev.map(s => s.episodeId === summary.episodeId ? summary : s);
        }
        return [...prev, summary];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const hasSummary = (episodeId: string) => {
    return summaries.some(summary => summary.episodeId === episodeId);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateInput: string | Date): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const summaryForSelected = selectedEpisode ? summaries.find(s => s.episodeId === selectedEpisode.id) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎵 Podcast Summarizer
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered podcast episode summaries
              </p>
              {isMockMode && (
                <p className="text-blue-600 text-sm mt-1">
                  🔧 Running in demo mode with mock data
                </p>
              )}
            </div>
            <button
              onClick={fetchEpisodes}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Refresh Episodes'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Podcast Episodes
            </h2>
            
            {loading && episodes.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
                      selectedEpisode?.id === episode.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleEpisodeSelect(episode)}
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={episode.thumbnail}
                            alt={episode.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {episode.title}
                            </h3>
                            {hasSummary(episode.id) && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Summarized
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {episode.publisher}
                          </p>
                          
                          <p className="text-sm text-gray-700 mb-3">
                            {episode.description.substring(0, 150)}...
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{formatDate(episode.publishedAt)}</span>
                            <span>{formatDuration(episode.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Summary
              </h2>
              {selectedEpisode && !summaryForSelected && (
                <button
                  onClick={handleSummarize}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Generating...' : 'Summarize'}
                </button>
              )}
              {selectedEpisode && summaryForSelected && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                  Summarized
                </span>
              )}
            </div>

            {selectedEpisode ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedEpisode.title}
                </h3>
                
                {summaryForSelected ? (
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {summaryForSelected.summary}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Generated: {formatDate(summaryForSelected.createdAt)}</span>
                        <span className="text-blue-600 font-medium">AI Generated</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      Click "Summarize" to generate an AI-powered summary.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    Select an episode from the list to view or generate a summary.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 