import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { LogIn, User, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="movie-card animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-cinema-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-cinema-dark" />
              </div>
              <h1 className="section-header text-cinema-gold mb-2">
                {isLogin ? 'Welcome Back' : 'Join CineRoulette'}
              </h1>
              <p className="body-text text-center">
                {isLogin
                  ? 'Sign in to continue your movie discovery journey'
                  : 'Create an account to save your favorite movies'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block font-hind font-medium text-cinema-white"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cinema-gold" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white placeholder-gray-400 focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-hind font-medium text-cinema-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cinema-gold" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white placeholder-gray-400 focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block font-hind font-medium text-cinema-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cinema-gold" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white placeholder-gray-400 focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block font-hind font-medium text-cinema-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cinema-gold" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-cinema-dark border border-cinema-purple/30 rounded-lg text-cinema-white placeholder-gray-400 focus:border-cinema-gold focus:outline-none focus:ring-2 focus:ring-cinema-gold/20 transition-all duration-300"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary w-full text-lg py-4">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-8 text-center">
              <p className="body-text mb-4">
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cinema-gold hover:text-yellow-400 font-montserrat font-medium uppercase tracking-wide transition-colors duration-300"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="mt-6 text-center">
                <Link
                  to="/forgot-password"
                  className="text-cinema-purple hover:text-purple-400 font-hind text-sm transition-colors duration-300"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
