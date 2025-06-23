// TMDB API Response Types

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: TMDBCollection | null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string | null;
}

export interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBMoviesResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export type TMDBSearchResponse = TMDBMoviesResponse;

export type TMDBDiscoverResponse = TMDBMoviesResponse;

// Genre mapping for our application
export const TMDB_GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
} as const;

export type TMDBGenreId = keyof typeof TMDB_GENRES;
export type TMDBGenreName = (typeof TMDB_GENRES)[TMDBGenreId];

// API Request Parameters
export interface TMDBDiscoverParams {
  page?: number;
  sort_by?:
    | 'popularity.desc'
    | 'release_date.desc'
    | 'vote_average.desc'
    | 'vote_count.desc';
  with_genres?: string; // comma separated genre IDs
  primary_release_year?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  certification_country?: string;
  certification?: string;
  include_adult?: boolean;
  language?: string;
}

export interface TMDBSearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  region?: string;
  year?: number;
}

// Error handling
export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}

// Cache types
export interface CachedResponse<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface MovieCacheKey {
  type: 'discover' | 'search' | 'movie' | 'popular' | 'trending';
  params?: string; // Serialized parameters
  id?: number; // For specific movie requests
}
