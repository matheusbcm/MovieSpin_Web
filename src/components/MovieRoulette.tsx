'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
          const response = await fetch('/api/movies/spin?count=1');
          if (response.ok) {
            const data = await response.json();
            if (data.movies && data.movies.length > 0) {
              setSelectedMovie(data.movies[0]);
            }
          } else {
            // TODO: Add proper error handling/notification
          }
        } catch {
          // TODO: Add proper error handling/notification
        }
        setIsSpinning(false);
      }, 2000);
    } catch {
      // TODO: Add proper error handling/notification
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

      {/* Enhanced Roulette Wheel with Framer Motion */}
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-cinema-gold/20 blur-xl"
          animate={{
            scale: isSpinning ? [1, 1.2, 1] : 1,
            opacity: isSpinning ? [0.3, 0.6, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isSpinning ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Main Wheel */}
        <motion.div
          className="relative w-48 h-48 rounded-full border-4 border-cinema-gold bg-gradient-to-br from-cinema-purple to-purple-800 flex items-center justify-center shadow-2xl"
          animate={{
            rotate: isSpinning ? 360 * 4 : 0,
            scale: isSpinning ? [1, 1.05, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: isSpinning ? 3 : 0,
              ease: 'easeOut',
              times: isSpinning ? [0, 0.8, 1] : [0, 1],
            },
            scale: {
              duration: 0.3,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Wheel Segments Visual Effect */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-20 bg-cinema-gold/30"
              style={{
                transformOrigin: '50% 96px',
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={{
                opacity: isSpinning ? [0.3, 0.8, 0.3] : 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: isSpinning ? Infinity : 0,
                repeatType: 'reverse',
              }}
            />
          ))}

          {/* Center Content */}
          <motion.div
            className="text-center z-10"
            animate={{
              scale: isSpinning ? [1, 0.9, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: isSpinning ? Infinity : 0,
              repeatType: 'reverse',
            }}
          >
            <motion.div
              className="w-16 h-16 bg-cinema-gold rounded-full flex items-center justify-center mb-2 shadow-lg"
              animate={{
                rotate: isSpinning ? -360 * 4 : 0,
                boxShadow: isSpinning
                  ? [
                      '0 0 0 rgba(255, 215, 0, 0)',
                      '0 0 20px rgba(255, 215, 0, 0.5)',
                      '0 0 0 rgba(255, 215, 0, 0)',
                    ]
                  : '0 0 0 rgba(255, 215, 0, 0)',
              }}
              transition={{
                rotate: {
                  duration: isSpinning ? 3 : 0,
                  ease: 'easeOut',
                },
                boxShadow: {
                  duration: 1.5,
                  repeat: isSpinning ? Infinity : 0,
                },
              }}
            >
              <span className="text-cinema-dark font-montserrat font-bold text-2xl">
                🎬
              </span>
            </motion.div>

            <motion.span
              className="font-montserrat font-bold text-cinema-gold uppercase text-sm tracking-wide"
              animate={{
                opacity: isSpinning ? [1, 0.7, 1] : 1,
              }}
              transition={{
                duration: 0.8,
                repeat: isSpinning ? Infinity : 0,
                repeatType: 'reverse',
              }}
            >
              {isSpinning ? 'Spinning...' : 'Movie Roulette'}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Pointer/Arrow */}
        <motion.div
          className="absolute top-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-cinema-gold z-20"
          animate={{
            scale: isSpinning ? [1, 1.2, 1] : 1,
            y: isSpinning ? [0, -2, 0] : 0,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpinning ? Infinity : 0,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Enhanced Spin Button */}
      <motion.button
        onClick={spinMovie}
        disabled={isSpinning}
        className="relative overflow-hidden bg-cinema-gold text-cinema-dark px-12 py-6 rounded-lg font-montserrat font-semibold text-xl shadow-lg"
        whileHover={
          !isSpinning
            ? {
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.5)',
                transition: { duration: 0.2 },
              }
            : {}
        }
        whileTap={
          !isSpinning
            ? {
                scale: 0.95,
                transition: { duration: 0.1 },
              }
            : {}
        }
        animate={{
          opacity: isSpinning ? 0.7 : 1,
          cursor: isSpinning ? 'not-allowed' : 'pointer',
        }}
      >
        {/* Button Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600"
          animate={{
            x: isSpinning ? ['0%', '100%', '0%'] : '0%',
          }}
          transition={{
            duration: 2,
            repeat: isSpinning ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Button Text */}
        <motion.span
          className="relative z-10"
          animate={{
            scale: isSpinning ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: isSpinning ? Infinity : 0,
            repeatType: 'reverse',
          }}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN FOR MOVIE'}
        </motion.span>

        {/* Loading Dots Animation */}
        {isSpinning && (
          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cinema-dark rounded-full"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.button>

      {/* Enhanced Movie Result with Dramatic Reveal */}
      <AnimatePresence>
        {selectedMovie && !isSpinning && (
          <motion.div
            className="max-w-md mx-auto"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.8,
              rotateX: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.9,
              transition: { duration: 0.3 },
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.2,
            }}
          >
            {/* Success Particles Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cinema-gold rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -30, -60],
                    x: [
                      0,
                      (Math.random() - 0.5) * 40,
                      (Math.random() - 0.5) * 80,
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4 + i * 0.1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="movie-card relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cinema-gold/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: 'easeInOut',
                }}
              />

              <div className="flex items-center space-x-4 relative z-10">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.img
                    src={
                      selectedMovie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                        : '/placeholder-poster.jpg'
                    }
                    alt={selectedMovie.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-lg"
                    initial={{ scale: 0.8, rotateY: -15 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  />

                  {/* Poster Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-cinema-gold/20 rounded-lg blur-sm -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                </motion.div>

                <motion.div
                  className="flex-1 text-left space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.h3
                    className="font-montserrat font-bold text-lg text-cinema-gold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    {selectedMovie.title}
                  </motion.h3>

                  <motion.p
                    className="text-sm text-cinema-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    {selectedMovie.release_date?.substring(0, 4) || 'N/A'}
                  </motion.p>

                  <motion.div
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <motion.span
                      className="metadata-text flex items-center"
                      animate={{
                        color: ['#f5f5f5', '#ffd700', '#f5f5f5'],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1,
                        ease: 'easeInOut',
                      }}
                    >
                      ★ {selectedMovie.vote_average.toFixed(1)}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="mt-4 pt-4 border-t border-cinema-purple/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/movie/${selectedMovie.id}`}
                    className="btn-secondary w-full block text-center relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">View Details</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieRoulette;
