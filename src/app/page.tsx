'use client';

// import Navigation from '@/components/Navigation';
import MovieRoulette from '@/components/MovieRoulette';
import MovieCard from '@/components/MovieCard';
import { getPopularMovies } from '@/lib/tmdb/movies';

export default async function HomePage() {
  // Buscar filmes populares da API TMDB
  const popularMoviesResponse = await getPopularMovies();
  const featuredMovies = popularMoviesResponse.results.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="hero-title">
              Discover Your Next
              <br />
              <span className="text-cinema-white">Movie Adventure</span>
            </h1>
            <p className="body-text text-xl max-w-2xl mx-auto">
              Tired of endless scrolling? Let our movie roulette surprise you
              with the perfect film for tonight.
            </p>
          </div>

          {/* Movie Roulette Component */}
          <div className="animate-slide-up">
            <MovieRoulette />
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-cinema-purple/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-header mb-4">Featured Movies</h2>
            <p className="body-text max-w-lg mx-auto">
              Handpicked selections from our curated collection of must-watch
              films.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto space-y-6">
          <h2 className="section-header">Ready to Start Watching?</h2>
          <p className="body-text max-w-md mx-auto">
            Join thousands of movie lovers who have discovered their new
            favorite films through Movie Spin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Spin Again</button>
            <button className="btn-secondary">Browse All Movies</button>
          </div>
        </div>
      </section>
    </div>
  );
}
