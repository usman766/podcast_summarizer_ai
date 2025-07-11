import { NextRequest, NextResponse } from 'next/server';
import { AppService } from '@/services/AppService';
import { MockPodcastService } from '@/services/MockPodcastService';
import { ENV_VARS, ERROR_MESSAGES } from '@/utils/constants';

export async function GET(request: NextRequest) {
  try {
    // Use mock service if no API key
    const useMock = !ENV_VARS.LISTEN_NOTES_API_KEY || ENV_VARS.LISTEN_NOTES_API_KEY === '';
    const appService = useMock
      ? { fetchEpisodes: () => new MockPodcastService().fetchEpisodes() }
      : new AppService();

    const episodes = await appService.fetchEpisodes();
    return NextResponse.json({ episodes });
  } catch (error) {
    console.error('Error in episodes API:', error);
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.NETWORK_ERROR,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 