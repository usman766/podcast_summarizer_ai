import { IPodcastService, PodcastEpisode } from '@/types';

export class MockPodcastService implements IPodcastService {
  private mockEpisodes: PodcastEpisode[] = [
    {
      id: 'mock-episode-1',
      title: 'The Future of AI in Technology',
      description: 'In this episode, we explore the latest developments in artificial intelligence and how they\'re shaping the future of technology. From machine learning to neural networks, we cover the most important trends and innovations.',
      publisher: 'Tech Insights Podcast',
      thumbnail: 'https://placehold.co/300x300?text=AI+Tech',
      duration: 3600, // 1 hour
      publishedAt: '2024-01-15T10:00:00Z',
      listenNotesUrl: 'https://example.com/episode-1',
    },
    {
      id: 'mock-episode-2',
      title: 'Web Development Best Practices 2024',
      description: 'Join us as we discuss the latest web development best practices, including modern frameworks, performance optimization, and security considerations for building robust web applications.',
      publisher: 'Web Dev Weekly',
      thumbnail: 'https://placehold.co/300x300?text=Web+Dev',
      duration: 2700, // 45 minutes
      publishedAt: '2024-01-14T14:30:00Z',
      listenNotesUrl: 'https://example.com/episode-2',
    },
    {
      id: 'mock-episode-3',
      title: 'Cloud Computing Trends and Strategies',
      description: 'Explore the latest trends in cloud computing, including multi-cloud strategies, serverless architectures, and cost optimization techniques for modern businesses.',
      publisher: 'Cloud Tech Today',
      thumbnail: 'https://placehold.co/300x300?text=Cloud+Tech',
      duration: 3300, // 55 minutes
      publishedAt: '2024-01-13T09:15:00Z',
      listenNotesUrl: 'https://example.com/episode-3',
    },
    {
      id: 'mock-episode-4',
      title: 'Cybersecurity in the Digital Age',
      description: 'Learn about the latest cybersecurity threats and defense strategies, including zero-trust architecture, threat intelligence, and best practices for protecting digital assets.',
      publisher: 'Security Matters',
      thumbnail: 'https://placehold.co/300x300?text=Security',
      duration: 3000, // 50 minutes
      publishedAt: '2024-01-12T16:45:00Z',
      listenNotesUrl: 'https://example.com/episode-4',
    },
    {
      id: 'mock-episode-5',
      title: 'Data Science and Analytics',
      description: 'Discover how data science is transforming industries, from predictive analytics to machine learning applications in business intelligence and decision-making processes.',
      publisher: 'Data Insights',
      thumbnail: 'https://placehold.co/300x300?text=Data+Sci',
      duration: 3900, // 65 minutes
      publishedAt: '2024-01-11T11:20:00Z',
      listenNotesUrl: 'https://example.com/episode-5',
    },
  ];

  async fetchEpisodes(): Promise<PodcastEpisode[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.mockEpisodes;
  }

  async fetchEpisodeById(id: string): Promise<PodcastEpisode> {
    const episode = this.mockEpisodes.find(ep => ep.id === id);
    if (!episode) {
      throw new Error('Episode not found');
    }
    return episode;
  }
} 