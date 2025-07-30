import { useState } from 'react';
import Navigation from '../components/Navigation';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { User, Settings, Film, Heart, Clock, Star } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: 'March 2024',
    moviesWatched: 47,
    favoriteGenres: ['Action', 'Sci-Fi', 'Thriller'],
    totalWatchTime: '156 hours',
  };

  const favoriteMovies = movies.slice(0, 3);
  const watchLaterMovies = movies.slice(1, 4);

  const tabs = [
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'watchlater', name: 'Watch Later', icon: Clock },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <div className="movie-card mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-cinema-gold to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-cinema-dark" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="section-header text-cinema-gold mb-2">
                    {user.name}
                  </h1>
                  <p className="body-text">{user.email}</p>
                  <p className="metadata-text">Member since {user.joinDate}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-cinema-purple/20 rounded-lg">
                    <Film className="w-6 h-6 text-cinema-gold mx-auto mb-1" />
                    <div className="font-montserrat font-bold text-cinema-white">
                      {user.moviesWatched}
                    </div>
                    <div className="text-xs text-gray-400">Movies Watched</div>
                  </div>
                  <div className="text-center p-3 bg-cinema-purple/20 rounded-lg">
                    <Clock className="w-6 h-6 text-cinema-gold mx-auto mb-1" />
                    <div className="font-montserrat font-bold text-cinema-white">
                      {user.totalWatchTime}
                    </div>
                    <div className="text-xs text-gray-400">Watch Time</div>
                  </div>
                  <div className="text-center p-3 bg-cinema-purple/20 rounded-lg">
                    <Heart className="w-6 h-6 text-cinema-gold mx-auto mb-1" />
                    <div className="font-montserrat font-bold text-cinema-white">
                      {favoriteMovies.length}
                    </div>
                    <div className="text-xs text-gray-400">Favorites</div>
                  </div>
                  <div className="text-center p-3 bg-cinema-purple/20 rounded-lg">
                    <Star className="w-6 h-6 text-cinema-gold mx-auto mb-1" />
                    <div className="font-montserrat font-bold text-cinema-white">
                      8.7
                    </div>
                    <div className="text-xs text-gray-400">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-cinema-purple/20 p-1 rounded-lg">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-300 font-montserrat font-medium text-sm ${
                      activeTab === tab.id
                        ? 'bg-cinema-gold text-cinema-dark'
                        : 'text-cinema-white hover:text-cinema-gold hover:bg-cinema-purple/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'favorites' && (
              <div>
                <h2 className="section-header mb-6">Your Favorite Movies</h2>
                {favoriteMovies.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteMovies.map(movie => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-cinema-purple mx-auto mb-4" />
                    <p className="body-text">
                      No favorite movies yet. Start discovering!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'watchlater' && (
              <div>
                <h2 className="section-header mb-6">Watch Later List</h2>
                {watchLaterMovies.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {watchLaterMovies.map(movie => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-cinema-purple mx-auto mb-4" />
                    <p className="body-text">Your watch later list is empty.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="section-header mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="movie-card">
                    <h3 className="font-montserrat font-bold text-lg text-cinema-gold mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-hind font-medium text-cinema-white mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full px-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block font-hind font-medium text-cinema-white mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="movie-card">
                    <h3 className="font-montserrat font-bold text-lg text-cinema-gold mb-4">
                      Preferences
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-hind font-medium text-cinema-white mb-2">
                          Favorite Genres
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {user.favoriteGenres.map((genre, index) => (
                            <span
                              key={index}
                              className="bg-cinema-gold text-cinema-dark px-3 py-1 rounded-full text-sm font-hind font-medium"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="btn-primary">Save Changes</button>
                    <button className="btn-secondary">Change Password</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
