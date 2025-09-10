import { NextRequest, NextResponse } from 'next/server';
import { getRandomMovies } from '@/lib/tmdb/movies';

/**
 * GET /api/movies/random
 * Busca filmes aleatórios da API do TMDB
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '1');

    // Validar parâmetros
    if (count < 1 || count > 20) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 20' },
        { status: 400 }
      );
    }

    const movies = await getRandomMovies({}, count);

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching random movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random movies' },
      { status: 500 }
    );
  }
}
