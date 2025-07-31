'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TMDBMovie } from '@/types/tmdb';

const MovieRoulette = () => {
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinMovie = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedMovie(null);

    try {
      // Simulate spinning animation delay
      setTimeout(async () => {
        try {
          // Chamar API route para buscar filme aleatório
          const response = await fetch('/api/movies/random?count=1');
          if (response.ok) {
            const randomMovies = await response.json();
            if (randomMovies.length > 0) {
              setSelectedMovie(randomMovies[0]);
            }
          } else {
            console.error('Erro na resposta da API:', response.status);
          }
        } catch (fetchError) {
          console.error('Erro ao buscar filme aleatório:', fetchError);
        }
        setIsSpinning(false);
      }, 2000);
    } catch (error) {
      console.error('Erro geral no spin:', error);
      setIsSpinning(false);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="section-header">Ready for your next movie?</h2>
        <p className="body-text max-w-md mx-auto">
          Cannot decide what to watch? Let fate choose for you with our movie
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
                src={
                  selectedMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                    : '/placeholder-poster.jpg'
                }
                alt={selectedMovie.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="flex-1 text-left space-y-2">
                <h3 className="font-montserrat font-bold text-lg text-cinema-gold">
                  {selectedMovie.title}
                </h3>
                <p className="text-sm text-cinema-white">
                  {selectedMovie.release_date?.substring(0, 4) || 'N/A'}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="metadata-text">
                    ★ {selectedMovie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cinema-purple/30">
              <Link
                href={`/movie/${selectedMovie.id}`}
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
