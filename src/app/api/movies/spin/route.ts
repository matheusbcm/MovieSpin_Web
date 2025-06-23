import { NextRequest, NextResponse } from 'next/server';
import { getSpinMovies } from '@/lib/tmdb/movies';
import { TMDBAPIError } from '@/lib/tmdb/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filter parameters
    const genresParam = searchParams.get('genres');
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');
    const year = searchParams.get('year');
    const count = searchParams.get('count');

    // Build options object
    const options: Parameters<typeof getSpinMovies>[0] = {};

    if (genresParam) {
      // Parse genres: "28,35,18" -> [28, 35, 18]
      const genres = genresParam
        .split(',')
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id) && id > 0);

      if (genres.length > 0) {
        options.genres = genres;
      }
    }

    if (minRating) {
      const rating = parseFloat(minRating);
      if (!isNaN(rating) && rating >= 0 && rating <= 10) {
        options.minRating = rating;
      }
    }

    if (maxRating) {
      const rating = parseFloat(maxRating);
      if (!isNaN(rating) && rating >= 0 && rating <= 10) {
        options.maxRating = rating;
      }
    }

    if (year) {
      const yearNum = parseInt(year, 10);
      if (
        !isNaN(yearNum) &&
        yearNum >= 1900 &&
        yearNum <= new Date().getFullYear() + 5
      ) {
        options.year = yearNum;
      }
    }

    if (count) {
      const countNum = parseInt(count, 10);
      if (!isNaN(countNum) && countNum >= 1 && countNum <= 50) {
        options.count = countNum;
      }
    }

    const movies = await getSpinMovies(options);

    return NextResponse.json({
      movies,
      filters: options,
      count: movies.length,
    });
  } catch (error) {
    console.error('Error getting spin movies:', error);

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
