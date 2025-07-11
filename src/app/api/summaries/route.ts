import { NextRequest, NextResponse } from 'next/server';
import { AppService } from '@/services/AppService';
import { ERROR_MESSAGES } from '@/utils/constants';

export async function GET(request: NextRequest) {
  try {
    const appService = new AppService();
    const summaries = await appService.getAllSummaries();
    return NextResponse.json({ summaries });
  } catch (error) {
    console.error('Error in summaries API:', error);
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.DATABASE_ERROR,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 