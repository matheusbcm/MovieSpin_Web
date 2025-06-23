import { TMDBError } from '@/types/tmdb';

/**
 * TMDB API Client
 * Base client for making requests to The Movie Database API
 */

const TMDB_BASE_URL =
  process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export class TMDBClient {
  private apiKey: string;
  private accessToken?: string;
  private rateLimitReset: number = 0;
  private requestCount: number = 0;
  private readonly MAX_REQUESTS_PER_SECOND = 40; // TMDB limit

  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || '';
    this.accessToken = process.env.TMDB_ACCESS_TOKEN;

    if (!this.apiKey) {
      throw new Error(
        'TMDB API key is required. Please set TMDB_API_KEY environment variable.'
      );
    }
  }

  /**
   * Rate limiting implementation
   */
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();

    // Reset counter every second
    if (now - this.rateLimitReset > 1000) {
      this.requestCount = 0;
      this.rateLimitReset = now;
    }

    // If we've hit the limit, wait
    if (this.requestCount >= this.MAX_REQUESTS_PER_SECOND) {
      const waitTime = 1000 - (now - this.rateLimitReset);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        this.requestCount = 0;
        this.rateLimitReset = Date.now();
      }
    }

    this.requestCount++;
  }

  /**
   * Make HTTP request to TMDB API
   */
  async request<T>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    await this.checkRateLimit();

    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

    // Add API key to params
    const searchParams = {
      api_key: this.apiKey,
      ...params,
    };

    // Build query string
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.accessToken && {
            Authorization: `Bearer ${this.accessToken}`,
          }),
        },
      });

      if (!response.ok) {
        // Try to parse error from TMDB
        let errorData: TMDBError;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            status_code: response.status,
            status_message: response.statusText,
            success: false,
          };
        }

        throw new TMDBAPIError(
          errorData.status_message || 'TMDB API request failed',
          errorData.status_code,
          endpoint
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TMDBAPIError) {
        throw error;
      }

      throw new TMDBAPIError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        0,
        endpoint
      );
    }
  }

  /**
   * Get full image URL from TMDB path
   */
  static getImageUrl(
    path: string | null,
    size:
      | 'w92'
      | 'w154'
      | 'w185'
      | 'w342'
      | 'w500'
      | 'w780'
      | 'original' = 'w500'
  ): string | null {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  /**
   * Get poster URL
   */
  static getPosterUrl(
    posterPath: string | null,
    size:
      | 'w92'
      | 'w154'
      | 'w185'
      | 'w342'
      | 'w500'
      | 'w780'
      | 'original' = 'w500'
  ): string | null {
    return this.getImageUrl(posterPath, size);
  }

  /**
   * Get backdrop URL
   */
  static getBackdropUrl(
    backdropPath: string | null,
    size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'
  ): string | null {
    if (!backdropPath) return null;
    return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
  }
}

/**
 * Custom error class for TMDB API errors
 */
export class TMDBAPIError extends Error {
  public statusCode: number;
  public endpoint: string;

  constructor(message: string, statusCode: number, endpoint: string) {
    super(message);
    this.name = 'TMDBAPIError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

// Singleton instance
export const tmdbClient = new TMDBClient();
