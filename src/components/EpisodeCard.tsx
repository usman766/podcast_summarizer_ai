import React from 'react';
import Image from 'next/image';
import { PodcastEpisode } from '@/types';
import { formatDuration, formatDate, truncateText } from '@/utils/helpers';
import { UI_CONSTANTS } from '@/utils/constants';

interface EpisodeCardProps {
  episode: PodcastEpisode;
  onSelect: (episode: PodcastEpisode) => void;
  isSelected: boolean;
  hasSummary: boolean;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onSelect,
  isSelected,
  hasSummary,
}) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(episode)}
    >
      <div className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={episode.thumbnail}
              alt={episode.title}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {episode.title}
              </h3>
              {hasSummary && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Summarized
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-2">
              {episode.publisher}
            </p>
            
            <p className="text-sm text-gray-700 mb-3">
              {truncateText(episode.description, UI_CONSTANTS.MAX_DESCRIPTION_LENGTH)}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatDate(episode.publishedAt)}</span>
              <span>{formatDuration(episode.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 