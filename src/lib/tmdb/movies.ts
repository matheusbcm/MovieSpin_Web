import {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBDiscoverResponse,
  TMDBSearchResponse,
  TMDBDiscoverParams,
  TMDBSearchParams,
} from '@/types/tmdb';
import { tmdbClient } from './client';
import { withCache, tmdbCache, serializeParams } from './cache';

/**
 * TMDB Movies Service Layer
 * High-level functions for fetching movie data with caching
 */

/**
 * Get popular movies
 */
export const getPopularMovies = withCache(
  (page: number = 1) => ({
    type: 'popular' as const,
    params: serializeParams({ page }),
  }),
  async (page: number = 1): Promise<TMDBDiscoverResponse> => {
    return tmdbClient.request<TMDBDiscoverResponse>('/movie/popular', {
      page,
      language: 'pt-BR',
    });
  }
);

/**
 * Get trending movies
 */
export const getTrendingMovies = withCache(
  (timeWindow: 'day' | 'week' = 'week', page: number = 1) => ({
    type: 'trending' as const,
    params: serializeParams({ timeWindow, page }),
  }),
  async (
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBDiscoverResponse> => {
    return tmdbClient.request<TMDBDiscoverResponse>(
      `/trending/movie/${timeWindow}`,
      {
        page,
        language: 'pt-BR',
      }
    );
  }
);

/**
 * Discover movies with filters
 */
export const discoverMovies = withCache(
  (params: TMDBDiscoverParams = {}) => ({
    type: 'discover' as const,
    params: serializeParams(params),
  }),
  async (params: TMDBDiscoverParams = {}): Promise<TMDBDiscoverResponse> => {
    const defaultParams = {
      language: 'pt-BR',
      include_adult: false,
      page: 1,
      sort_by: 'popularity.desc' as const,
      ...params,
    };

    return tmdbClient.request<TMDBDiscoverResponse>(
      '/discover/movie',
      defaultParams
    );
  }
);

/**
 * Search movies
 */
export const searchMovies = withCache(
  (params: TMDBSearchParams) => ({
    type: 'search' as const,
    params: serializeParams(params),
  }),
  async (params: TMDBSearchParams): Promise<TMDBSearchResponse> => {
    const defaultParams = {
      language: 'pt-BR',
      include_adult: false,
      page: 1,
      ...params,
    };

    return tmdbClient.request<TMDBSearchResponse>(
      '/search/movie',
      defaultParams
    );
  }
);

/**
 * Get movie details by ID
 */
export const getMovieById = withCache(
  (id: number) => ({
    type: 'movie' as const,
    id,
  }),
  async (id: number): Promise<TMDBMovieDetails> => {
    return tmdbClient.request<TMDBMovieDetails>(`/movie/${id}`, {
      language: 'pt-BR',
    });
  }
);

/**
 * Get multiple movies by IDs
 */
export async function getMoviesByIds(
  ids: number[]
): Promise<TMDBMovieDetails[]> {
  const promises = ids.map(id => getMovieById(id));
  const results = await Promise.allSettled(promises);

  return results
    .filter(
      (result): result is PromiseFulfilledResult<TMDBMovieDetails> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value);
}

/**
 * Get random movies for spinning
 */
export async function getRandomMovies(
  filters: TMDBDiscoverParams = {},
  count: number = 20
): Promise<TMDBMovie[]> {
  // Get a random page between 1-500 (TMDB limit)
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const response = await discoverMovies({
    ...filters,
    page: randomPage,
  });

  // Shuffle the results and return requested count
  const shuffled = response.results.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get movies by genre
 */
export async function getMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBDiscoverResponse> {
  return discoverMovies({
    with_genres: genreId.toString(),
    page,
  });
}

/**
 * Get highly rated movies
 */
export async function getHighlyRatedMovies(
  page: number = 1
): Promise<TMDBDiscoverResponse> {
  return discoverMovies({
    sort_by: 'vote_average.desc',
    vote_average_gte: 7.0, // Highly rated movies
    page,
  });
}

/**
 * Get recent movies
 */
export async function getRecentMovies(
  page: number = 1
): Promise<TMDBDiscoverResponse> {
  const currentYear = new Date().getFullYear();

  return discoverMovies({
    sort_by: 'release_date.desc',
    primary_release_year: currentYear,
    page,
  });
}

/**
 * Get movies for spin with specific criteria
 */
export async function getSpinMovies(
  options: {
    genres?: number[];
    minRating?: number;
    maxRating?: number;
    year?: number;
    count?: number;
  } = {}
): Promise<TMDBMovie[]> {
  const { genres, minRating, maxRating, year, count = 10 } = options;

  const filters: TMDBDiscoverParams = {};

  if (genres && genres.length > 0) {
    filters.with_genres = genres.join(',');
  }

  if (minRating !== undefined) {
    filters.vote_average_gte = minRating;
  }

  if (maxRating !== undefined) {
    filters.vote_average_lte = maxRating;
  }

  if (year) {
    filters.primary_release_year = year;
  }

  return getRandomMovies(filters, count);
}

/**
 * Cache utilities
 */
export const movieCache = {
  /**
   * Clear all movie cache
   */
  clear: () => tmdbCache.clear(),

  /**
   * Get cache statistics
   */
  getStats: () => tmdbCache.getStats(),

  /**
   * Preload popular movies
   */
  preloadPopular: async () => {
    await getPopularMovies(1);
    await getTrendingMovies('week', 1);
  },
};
