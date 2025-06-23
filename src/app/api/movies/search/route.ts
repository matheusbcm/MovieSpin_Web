import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/lib/tmdb/movies';
import { TMDBAPIError } from '@/lib/tmdb/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const year = searchParams.get('year');

    // Validate required parameters
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    if (page < 1 || page > 1000) {
      return NextResponse.json(
        { error: 'Page must be between 1 and 1000' },
        { status: 400 }
      );
    }

    const searchParams_obj = {
      query: query.trim(),
      page,
      ...(year && { year: parseInt(year, 10) }),
    };

    const movies = await searchMovies(searchParams_obj);

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error searching movies:', error);

    if (error instanceof TMDBAPIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
