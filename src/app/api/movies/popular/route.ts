import { NextRequest, NextResponse } from 'next/server';
import { getPopularMovies } from '@/lib/tmdb/movies';
import { TMDBAPIError } from '@/lib/tmdb/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);

    // Validate page parameter
    if (page < 1 || page > 1000) {
      return NextResponse.json(
        { error: 'Page must be between 1 and 1000' },
        { status: 400 }
      );
    }

    const movies = await getPopularMovies(page);

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching popular movies:', error);

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
