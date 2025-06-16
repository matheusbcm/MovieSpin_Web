import { render, screen } from '@testing-library/react';
import MovieCard from '../MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie',
    poster_path: '/test-poster.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
  };

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    // Check if movie title is rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();

    // Check if movie overview is rendered
    expect(screen.getByText('This is a test movie')).toBeInTheDocument();

    // Check if movie rating is rendered (formatted to 1 decimal place)
    expect(screen.getByText('8.5')).toBeInTheDocument();

    // Check if movie release date is rendered (only year)
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders movie poster with correct alt text', () => {
    render(<MovieCard movie={mockMovie} />);

    const poster = screen.getByAltText('Test Movie poster');
    expect(poster).toBeInTheDocument();

    // Check if the poster has the data-testid attribute
    const imageElement = screen.getByTestId('next-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', 'Test Movie poster');
  });

  it('displays formatted rating correctly', () => {
    const movieWithDecimalRating = {
      ...mockMovie,
      vote_average: 7.23456,
    };

    render(<MovieCard movie={movieWithDecimalRating} />);

    // Should format to 1 decimal place
    expect(screen.getByText('7.2')).toBeInTheDocument();
  });
});
