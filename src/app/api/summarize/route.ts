import { NextRequest, NextResponse } from 'next/server';
import { AppService } from '@/services/AppService';
import { PodcastEpisode } from '@/types';
import { ERROR_MESSAGES } from '@/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { episode } = body;

    if (!episode || !episode.id) {
      return NextResponse.json(
        { error: 'Episode data is required' },
        { status: 400 }
      );
    }

    const appService = new AppService();
    const summary = await appService.generateSummary(episode as PodcastEpisode);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SUMMARIZATION_FAILED,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 