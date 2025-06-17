import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      username: 'johndoe',
      name: 'John Doe',
      bio: 'Movie enthusiast and critic',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      username: 'janesmith',
      name: 'Jane Smith',
      bio: 'Cinema lover and filmmaker',
    },
  });

  // Create sample movies (these IDs should match TMDB IDs)
  const movie1 = await prisma.movie.upsert({
    where: { id: 550 }, // Fight Club
    update: {},
    create: {
      id: 550,
      title: 'Fight Club',
      overview:
        'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
      posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      backdropPath: '/52AfXWuzo8QF4AkJZ0L4joT1YVu.jpg',
      releaseDate: '1999-10-15',
      voteAverage: 8.4,
      voteCount: 27000,
      popularity: 85.2,
      originalLanguage: 'en',
      originalTitle: 'Fight Club',
      genreIds: [18, 53],
    },
  });

  const movie2 = await prisma.movie.upsert({
    where: { id: 13 }, // Forrest Gump
    update: {},
    create: {
      id: 13,
      title: 'Forrest Gump',
      overview:
        'A man with a low IQ has accomplished great things in his life and been present during significant historic events.',
      posterPath: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      backdropPath: '/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
      releaseDate: '1994-07-06',
      voteAverage: 8.5,
      voteCount: 25000,
      popularity: 92.1,
      originalLanguage: 'en',
      originalTitle: 'Forrest Gump',
      genreIds: [18, 35, 10749],
    },
  });

  // Create movie lists
  const list1 = await prisma.movieList.create({
    data: {
      name: 'My Favorite Movies',
      description: 'A collection of movies that changed my life',
      userId: user1.id,
      items: {
        create: [
          { movieId: movie1.id, order: 1 },
          { movieId: movie2.id, order: 2 },
        ],
      },
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      rating: 9,
      content:
        'An absolute masterpiece that explores themes of masculinity and consumerism.',
      userId: user1.id,
      movieId: movie1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 8,
      content: 'Heartwarming story with incredible performances.',
      userId: user2.id,
      movieId: movie2.id,
    },
  });

  // Create favorites
  await prisma.favorite.create({
    data: {
      userId: user1.id,
      movieId: movie1.id,
    },
  });

  // Create watchlist items
  await prisma.watchlist.create({
    data: {
      userId: user2.id,
      movieId: movie1.id,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log({
    users: [user1.username, user2.username],
    movies: [movie1.title, movie2.title],
    lists: [list1.name],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
