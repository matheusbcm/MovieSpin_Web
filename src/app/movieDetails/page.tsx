import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { movies } from '../data/movies';
import {
  ArrowLeft,
  Heart,
  Clock,
  Star,
  Calendar,
  User,
  Film,
} from 'lucide-react';
import { useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id || '0'));
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  if (!movie) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="section-header text-cinema-gold mb-4">
              Movie Not Found
            </h1>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-16">
        {/* Hero Section with Backdrop */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 4, 26, 0.7), rgba(10, 4, 26, 0.7)), url(${movie.backdrop})`,
          }}
        >
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-cinema-gold hover:text-yellow-400 transition-colors duration-300 mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-montserrat font-medium">
                  Back to Home
                </span>
              </Link>

              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-xl shadow-2xl"
                />

                <div className="flex-1 space-y-4">
                  <h1 className="hero-title text-4xl md:text-5xl">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-cinema-white">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-cinema-gold" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-cinema-gold" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-cinema-gold" />
                      <span>{movie.rating}/10</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((g, index) => (
                      <span
                        key={index}
                        className="bg-cinema-purple text-cinema-white px-3 py-1 rounded-full text-sm font-hind font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-4xl space-y-12">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="btn-primary text-lg px-8 py-4">
                Watch Now
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`btn-secondary flex items-center space-x-2 ${isFavorite ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                />
                <span>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </span>
              </button>
              <button
                onClick={() => setIsWatchLater(!isWatchLater)}
                className={`btn-secondary flex items-center space-x-2 ${isWatchLater ? 'bg-cinema-gold text-cinema-dark' : ''}`}
              >
                <Clock className="w-5 h-5" />
                <span>
                  {isWatchLater ? 'Added to Watch Later' : 'Watch Later'}
                </span>
              </button>
            </div>

            {/* Plot */}
            <div className="movie-card animate-fade-in">
              <h2 className="section-header mb-4">Plot</h2>
              <p className="body-text text-lg leading-relaxed">{movie.plot}</p>
            </div>

            {/* Cast & Crew */}
            <div className="movie-card animate-fade-in">
              <h2 className="section-header mb-6">Cast & Crew</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-montserrat font-bold text-lg text-cinema-gold mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Director
                  </h3>
                  <p className="body-text">{movie.director}</p>
                </div>

                <div>
                  <h3 className="font-montserrat font-bold text-lg text-cinema-gold mb-3">
                    Main Cast
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.cast.map((actor, index) => (
                      <div
                        key={index}
                        className="bg-cinema-purple/20 p-4 rounded-lg"
                      >
                        <p className="font-hind font-medium text-cinema-white">
                          {actor}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Stats */}
            <div className="movie-card animate-fade-in">
              <h2 className="section-header mb-6">Movie Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-cinema-purple/20 rounded-lg">
                  <Star className="w-8 h-8 text-cinema-gold mx-auto mb-2" />
                  <div className="font-montserrat font-bold text-xl text-cinema-white">
                    {movie.rating}
                  </div>
                  <div className="text-sm text-gray-400">IMDb Rating</div>
                </div>

                <div className="text-center p-4 bg-cinema-purple/20 rounded-lg">
                  <Calendar className="w-8 h-8 text-cinema-gold mx-auto mb-2" />
                  <div className="font-montserrat font-bold text-xl text-cinema-white">
                    {movie.year}
                  </div>
                  <div className="text-sm text-gray-400">Release Year</div>
                </div>

                <div className="text-center p-4 bg-cinema-purple/20 rounded-lg">
                  <Clock className="w-8 h-8 text-cinema-gold mx-auto mb-2" />
                  <div className="font-montserrat font-bold text-xl text-cinema-white">
                    {movie.duration}
                  </div>
                  <div className="text-sm text-gray-400">Runtime</div>
                </div>

                <div className="text-center p-4 bg-cinema-purple/20 rounded-lg">
                  <Film className="w-8 h-8 text-cinema-gold mx-auto mb-2" />
                  <div className="font-montserrat font-bold text-xl text-cinema-white">
                    {movie.genre.length}
                  </div>
                  <div className="text-sm text-gray-400">Genres</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
