import { Prisma } from '../generated/prisma';

// User types
export type UserWithLists = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        items: {
          include: {
            movie: true;
          };
        };
      };
    };
  };
}>;

export type UserWithReviews = Prisma.UserGetPayload<{
  include: {
    reviews: {
      include: {
        movie: true;
      };
    };
  };
}>;

// Movie types
export type MovieWithReviews = Prisma.MovieGetPayload<{
  include: {
    reviews: {
      include: {
        user: true;
      };
    };
  };
}>;

export type MovieWithDetails = Prisma.MovieGetPayload<{
  include: {
    reviews: {
      include: {
        user: true;
      };
    };
    favorites: true;
    watchlist: true;
  };
}>;

// List types
export type MovieListWithItems = Prisma.MovieListGetPayload<{
  include: {
    items: {
      include: {
        movie: true;
      };
      orderBy: {
        order: 'asc';
      };
    };
    user: true;
  };
}>;

export type MovieListWithItemsAndUser = Prisma.MovieListGetPayload<{
  include: {
    items: {
      include: {
        movie: true;
      };
    };
    user: true;
  };
}>;

// Review types
export type ReviewWithMovieAndUser = Prisma.ReviewGetPayload<{
  include: {
    movie: true;
    user: true;
  };
}>;

// Input types for forms
export type CreateMovieListInput = Omit<
  Prisma.MovieListCreateInput,
  'user' | 'items'
> & {
  movieIds?: number[];
};

export type CreateReviewInput = Omit<
  Prisma.ReviewCreateInput,
  'user' | 'movie'
> & {
  movieId: number;
  userId: string;
};

export type UpdateReviewInput = Partial<
  Omit<Prisma.ReviewUpdateInput, 'user' | 'movie'>
>;

export type CreateUserInput = Omit<
  Prisma.UserCreateInput,
  'lists' | 'reviews' | 'favorites' | 'watchlist'
>;

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface MovieSearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

// Database error types
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
