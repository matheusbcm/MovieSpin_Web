import { useState } from 'react';
import { movies } from '../data/movies';
import { Link } from 'react-router-dom';

const MovieRoulette = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinMovie = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedMovie(null);

    // Simulate spinning animation delay
    setTimeout(() => {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setSelectedMovie(randomMovie);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="section-header">Ready for your next movie?</h2>
        <p className="body-text max-w-md mx-auto">
          Can't decide what to watch? Let fate choose for you with our movie
          roulette!
        </p>
      </div>

      {/* Roulette Wheel Simulation */}
      <div className="relative">
        <div
          className={`w-48 h-48 mx-auto rounded-full border-4 border-cinema-gold bg-gradient-to-br from-cinema-purple to-purple-800 flex items-center justify-center ${isSpinning ? 'animate-spin-slow' : ''}`}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-cinema-gold rounded-full flex items-center justify-center mb-2">
              <span className="text-cinema-dark font-montserrat font-bold text-2xl">
                🎬
              </span>
            </div>
            <span className="font-montserrat font-bold text-cinema-gold uppercase text-sm tracking-wide">
              {isSpinning ? 'Spinning...' : 'Movie Roulette'}
            </span>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinMovie}
        disabled={isSpinning}
        className={`btn-primary text-xl px-12 py-6 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN FOR MOVIE'}
      </button>

      {/* Selected Movie Result */}
      {selectedMovie && !isSpinning && (
        <div className="animate-fade-in max-w-md mx-auto">
          <div className="movie-card">
            <div className="flex items-center space-x-4">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="flex-1 text-left space-y-2">
                <h3 className="font-montserrat font-bold text-lg text-cinema-gold">
                  {selectedMovie.title}
                </h3>
                <p className="text-sm text-cinema-white">
                  {selectedMovie.year} • {selectedMovie.duration}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="metadata-text">
                    ★ {selectedMovie.rating}
                  </span>
                  <span className="text-cinema-white text-sm">
                    {selectedMovie.genre.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cinema-purple/30">
              <Link
                to={`/movie/${selectedMovie.id}`}
                className="btn-secondary w-full block text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRoulette;
