import React from 'react';
import { PodcastSummary, PodcastEpisode } from '@/types';
import { formatDate } from '@/utils/helpers';

interface SummaryDisplayProps {
  summary: PodcastSummary;
  episode: PodcastEpisode;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  summary,
  episode,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Summary
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Episode: {episode.title}</span>
          <span>•</span>
          <span>Generated: {formatDate(summary.createdAt.toISOString())}</span>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {summary.summary}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Last updated: {formatDate(summary.updatedAt.toISOString())}</span>
          <span className="text-blue-600 font-medium">AI Generated</span>
        </div>
      </div>
    </div>
  );
}; 