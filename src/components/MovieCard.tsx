import { Link } from 'react-router-dom';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`movie-card group block ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-cinema-gold text-cinema-dark px-2 py-1 rounded-md font-hind font-medium text-xs">
          ★ {movie.rating}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-montserrat font-bold text-lg text-cinema-white group-hover:text-cinema-gold transition-colors duration-300">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="metadata-text">{movie.year}</span>
          <span className="metadata-text">{movie.duration}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g, index) => (
            <span
              key={index}
              className="bg-cinema-purple/30 text-cinema-white px-2 py-1 rounded-full text-xs font-hind"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
