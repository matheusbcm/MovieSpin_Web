# 🗄️ Database Documentation

## Overview

Movie Spin uses PostgreSQL as the primary database with Prisma as the ORM. The database stores user information, movie data, reviews, lists, and social features.

## Schema Design

### Core Models

#### Users

- **Purpose**: Store user account information and preferences
- **Key Fields**: id, email, username, name, avatar, bio
- **Relations**: One-to-many with MovieLists, Reviews, Favorites, Watchlist

#### Movies

- **Purpose**: Cache movie data from TMDB API for performance
- **Key Fields**: id (TMDB ID), title, overview, poster_path, release_date, vote_average
- **Relations**: Many-to-many with Users through various junction tables

#### MovieLists

- **Purpose**: User-created collections of movies
- **Key Fields**: id, name, description, is_public, user_id
- **Relations**: Belongs to User, has many MovieListItems

#### Reviews

- **Purpose**: User ratings and reviews of movies
- **Key Fields**: id, rating (1-10), content, user_id, movie_id
- **Relations**: Belongs to User and Movie

#### Favorites & Watchlist

- **Purpose**: Simple many-to-many relationships for user preferences
- **Key Fields**: id, user_id, movie_id, created_at
- **Relations**: Junction tables between Users and Movies

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env` with your PostgreSQL credentials:

```
DATABASE_URL="postgresql://username:password@localhost:5432/movie_spin_db?schema=public"
```

### 2. Database Creation

Create the database (replace with your credentials):

```sql
CREATE DATABASE movie_spin_db;
```

### 3. Run Migrations

Generate Prisma client and create tables:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Seed Data (Optional)

Populate with sample data for development:

```bash
npm run db:seed
```

## Available Scripts

| Script                | Description                        |
| --------------------- | ---------------------------------- |
| `npm run db:generate` | Generate Prisma client             |
| `npm run db:push`     | Push schema changes to database    |
| `npm run db:migrate`  | Create and run migrations          |
| `npm run db:studio`   | Open Prisma Studio (database GUI)  |
| `npm run db:seed`     | Populate database with sample data |

## Data Relationships

```
User (1) -----> (*) MovieList
User (1) -----> (*) Review
User (*) <----> (*) Movie [Favorites]
User (*) <----> (*) Movie [Watchlist]

MovieList (1) -> (*) MovieListItem
MovieListItem (*) -> (1) Movie

Review (*) -> (1) User
Review (*) -> (1) Movie
```

## Best Practices

### 1. Movie Data Caching

- Movies are cached from TMDB API to reduce external API calls
- Movie IDs match TMDB IDs for easy synchronization
- Update movie data periodically or on-demand

### 2. User Data Privacy

- Personal information should be handled according to privacy policies
- Implement proper access controls for user data
- Consider data anonymization for analytics

### 3. Performance Considerations

- Index frequently queried fields (user_id, movie_id)
- Use pagination for large datasets
- Consider read replicas for heavy read operations

### 4. Data Integrity

- Use foreign key constraints to maintain referential integrity
- Implement proper validation at both database and application levels
- Use transactions for operations affecting multiple tables

## Migration Strategy

### Development

- Use `db:push` for rapid schema iteration
- Create migrations for significant changes

### Production

- Always use migrations (`db:migrate`)
- Test migrations on staging environment first
- Backup database before major migrations

## Troubleshooting

### Common Issues

1. **Connection Failed**

   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Confirm credentials and database exists

2. **Migration Errors**

   - Check for conflicting schema changes
   - Resolve data conflicts before migration
   - Use `prisma db reset` for development (⚠️ destroys data)

3. **Prisma Client Issues**
   - Run `npm run db:generate` after schema changes
   - Restart development server after client generation

### Useful Commands

```bash
# Reset database (development only)
npx prisma db reset

# View current schema
npx prisma db pull

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

## Security Considerations

- Never commit `.env` files with real credentials
- Use strong passwords for database users
- Implement proper access controls
- Regular security updates for dependencies
- Monitor for unusual database activity

---

For more information, refer to the [Prisma Documentation](https://www.prisma.io/docs/) and [PostgreSQL Documentation](https://www.postgresql.org/docs/).
