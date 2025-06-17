import { prisma } from './prisma';
import { DatabaseError } from '../types/prisma';

/**
 * Database utility functions for common operations
 */

export class DatabaseUtils {
  /**
   * Check if database connection is healthy
   */
  static async checkConnection(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  /**
   * Get database statistics
   */
  static async getStats() {
    try {
      const [userCount, movieCount, reviewCount, listCount] = await Promise.all(
        [
          prisma.user.count(),
          prisma.movie.count(),
          prisma.review.count(),
          prisma.movieList.count(),
        ]
      );

      return {
        users: userCount,
        movies: movieCount,
        reviews: reviewCount,
        lists: listCount,
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new DatabaseError('Failed to fetch database statistics');
    }
  }

  /**
   * Safely disconnect from database
   */
  static async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }

  /**
   * Execute database transaction
   */
  static async transaction<T>(
    operations: (
      tx: Omit<
        typeof prisma,
        | '$connect'
        | '$disconnect'
        | '$on'
        | '$transaction'
        | '$use'
        | '$extends'
      >
    ) => Promise<T>
  ): Promise<T> {
    try {
      return await prisma.$transaction(operations);
    } catch {
      throw new DatabaseError('Transaction failed');
    }
  }

  /**
   * Clean up expired data (for maintenance)
   */
  static async cleanup() {
    try {
      // Example: Remove old sessions, temporary data, etc.
      const result = await prisma.$executeRaw`
        DELETE FROM sessions WHERE expires_at < NOW() - INTERVAL '30 days'
      `;

      return { deletedRows: result };
    } catch {
      throw new DatabaseError('Cleanup operation failed');
    }
  }
}

/**
 * Movie-specific database operations
 */
export class MovieDatabase {
  /**
   * Cache movie from TMDB data
   */
  static async cacheMovie(movieData: {
    id: number;
    title: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult?: boolean;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    video?: boolean;
  }) {
    try {
      return await prisma.movie.upsert({
        where: { id: movieData.id },
        update: {
          title: movieData.title,
          overview: movieData.overview,
          posterPath: movieData.poster_path,
          backdropPath: movieData.backdrop_path,
          releaseDate: movieData.release_date,
          voteAverage: movieData.vote_average,
          voteCount: movieData.vote_count,
          popularity: movieData.popularity,
          adult: movieData.adult || false,
          originalLanguage: movieData.original_language,
          originalTitle: movieData.original_title,
          genreIds: movieData.genre_ids,
          video: movieData.video || false,
        },
        create: {
          id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          posterPath: movieData.poster_path,
          backdropPath: movieData.backdrop_path,
          releaseDate: movieData.release_date,
          voteAverage: movieData.vote_average,
          voteCount: movieData.vote_count,
          popularity: movieData.popularity,
          adult: movieData.adult || false,
          originalLanguage: movieData.original_language,
          originalTitle: movieData.original_title,
          genreIds: movieData.genre_ids,
          video: movieData.video || false,
        },
      });
    } catch {
      throw new DatabaseError(`Failed to cache movie: ${movieData.title}`);
    }
  }

  /**
   * Get popular movies from cache
   */
  static async getPopularMovies(limit = 20) {
    try {
      return await prisma.movie.findMany({
        orderBy: { popularity: 'desc' },
        take: limit,
      });
    } catch {
      throw new DatabaseError('Failed to fetch popular movies');
    }
  }

  /**
   * Search movies in cache
   */
  static async searchMovies(query: string, limit = 20) {
    try {
      return await prisma.movie.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { originalTitle: { contains: query, mode: 'insensitive' } },
            { overview: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
        orderBy: { popularity: 'desc' },
      });
    } catch {
      throw new DatabaseError(`Failed to search movies: ${query}`);
    }
  }
}

/**
 * User-specific database operations
 */
export class UserDatabase {
  /**
   * Get user with all relations
   */
  static async getUserWithDetails(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          lists: {
            include: {
              items: {
                include: { movie: true },
                orderBy: { order: 'asc' },
              },
            },
          },
          reviews: {
            include: { movie: true },
            orderBy: { createdAt: 'desc' },
          },
          favorites: {
            include: { movie: true },
            orderBy: { createdAt: 'desc' },
          },
          watchlist: {
            include: { movie: true },
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    } catch {
      throw new DatabaseError(`Failed to fetch user details: ${userId}`);
    }
  }

  /**
   * Get user activity summary
   */
  static async getUserActivity(userId: string) {
    try {
      const [reviewCount, listCount, favoriteCount, watchlistCount] =
        await Promise.all([
          prisma.review.count({ where: { userId } }),
          prisma.movieList.count({ where: { userId } }),
          prisma.favorite.count({ where: { userId } }),
          prisma.watchlist.count({ where: { userId } }),
        ]);

      return {
        reviews: reviewCount,
        lists: listCount,
        favorites: favoriteCount,
        watchlist: watchlistCount,
      };
    } catch {
      throw new DatabaseError(`Failed to fetch user activity: ${userId}`);
    }
  }
}

export default DatabaseUtils;
