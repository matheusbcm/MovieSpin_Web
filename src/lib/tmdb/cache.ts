import { CachedResponse, MovieCacheKey } from '@/types/tmdb';

/**
 * In-memory cache for TMDB API responses
 * This helps reduce API calls and improve performance
 */

class TMDBCache {
  private cache = new Map<string, CachedResponse<any>>();
  private readonly DEFAULT_TTL = 15 * 60 * 1000; // 15 minutes
  private readonly POPULAR_TTL = 60 * 60 * 1000; // 1 hour for popular movies
  private readonly MOVIE_DETAILS_TTL = 2 * 60 * 60 * 1000; // 2 hours for movie details

  /**
   * Generate cache key from parameters
   */
  private generateKey(keyData: MovieCacheKey): string {
    const parts: string[] = [keyData.type];

    if (keyData.id) {
      parts.push(`id:${keyData.id}`);
    }

    if (keyData.params) {
      parts.push(`params:${keyData.params}`);
    }

    return parts.join('|');
  }

  /**
   * Get TTL based on cache type
   */
  private getTTL(type: MovieCacheKey['type']): number {
    switch (type) {
      case 'popular':
      case 'trending':
        return this.POPULAR_TTL;
      case 'movie':
        return this.MOVIE_DETAILS_TTL;
      case 'discover':
      case 'search':
      default:
        return this.DEFAULT_TTL;
    }
  }

  /**
   * Set cache entry
   */
  set<T>(keyData: MovieCacheKey, data: T): void {
    const key = this.generateKey(keyData);
    const ttl = this.getTTL(keyData.type);

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });

    // Clean up expired entries periodically
    this.cleanup();
  }

  /**
   * Get cache entry
   */
  get<T>(keyData: MovieCacheKey): T | null {
    const key = this.generateKey(keyData);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Check if cache has valid entry
   */
  has(keyData: MovieCacheKey): boolean {
    return this.get(keyData) !== null;
  }

  /**
   * Clear specific cache entry
   */
  delete(keyData: MovieCacheKey): boolean {
    const key = this.generateKey(keyData);
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: Date.now() - entry.timestamp,
        ttl: entry.ttl,
        expired: Date.now() - entry.timestamp > entry.ttl,
      })),
    };
  }
}

// Singleton instance
export const tmdbCache = new TMDBCache();

/**
 * Serialize params for cache key
 */
export function serializeParams(params: Record<string, any>): string {
  return JSON.stringify(params, Object.keys(params).sort());
}

/**
 * Cache decorator for TMDB API functions
 */
export function withCache<T extends any[], R>(
  cacheKeyFactory: (...args: T) => MovieCacheKey,
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const cacheKey = cacheKeyFactory(...args);

    // Try to get from cache first
    const cached = tmdbCache.get<R>(cacheKey);
    if (cached) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn(...args);
    tmdbCache.set(cacheKey, result);

    return result;
  };
}
