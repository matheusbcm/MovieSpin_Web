import Link from 'next/link';
import { TMDBMovie } from '@/types/tmdb';
// import Image from 'next/image';

interface MovieCardProps {
  movie: TMDBMovie;
  className?: string;
}

const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={`movie-card group block ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="w-full h-64 relative">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder-poster.jpg'
            }
            alt={movie.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-3 right-3 bg-cinema-gold text-cinema-dark px-2 py-1 rounded-md font-hind font-medium text-xs">
          ★ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-montserrat font-bold text-lg text-cinema-white group-hover:text-cinema-gold transition-colors duration-300">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="metadata-text">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </span>
        </div>

        {movie.genre_ids && (
          <div className="flex flex-wrap gap-1">
            {movie.genre_ids.slice(0, 2).map((genreId, index) => (
              <span
                key={index}
                className="bg-cinema-purple/30 text-cinema-white px-2 py-1 rounded-full text-xs font-hind"
              >
                {genreId}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
