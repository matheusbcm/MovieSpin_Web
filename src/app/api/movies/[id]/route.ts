import { NextRequest, NextResponse } from 'next/server';
import { getMovieById } from '@/lib/tmdb/movies';
import { TMDBAPIError } from '@/lib/tmdb/client';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const movieId = parseInt(resolvedParams.id, 10);

    // Validate movie ID
    if (isNaN(movieId) || movieId < 1) {
      return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
    }

    const movie = await getMovieById(movieId);

    return NextResponse.json(movie);
  } catch (error) {
    console.error(`Error fetching movie:`, error);

    if (error instanceof TMDBAPIError) {
      // Handle 404 specifically for movies not found
      if (error.statusCode === 404) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }

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
