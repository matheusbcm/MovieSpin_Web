import { currentUser, User as ClerkUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

/**
 * Sincroniza ou cria um usuário do Clerk no banco de dados Prisma
 */
export async function syncUser(clerkUser: ClerkUser) {
  if (!clerkUser) return null;

  const existingUser = await prisma.user.findUnique({
    where: { id: clerkUser.id },
  });

  // Prepare data, filtering out undefined values
  const userData: any = {
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    emailVerified:
      clerkUser.primaryEmailAddress?.verification?.status === 'verified',
  };

  if (clerkUser.username) userData.username = clerkUser.username;
  if (clerkUser.firstName) userData.firstName = clerkUser.firstName;
  if (clerkUser.lastName) userData.lastName = clerkUser.lastName;
  if (clerkUser.imageUrl) userData.imageUrl = clerkUser.imageUrl;
  if (clerkUser.lastSignInAt)
    userData.lastSignInAt = new Date(clerkUser.lastSignInAt);

  if (existingUser) {
    // Atualiza usuário existente
    return await prisma.user.update({
      where: { id: clerkUser.id },
      data: {
        ...userData,
        updatedAt: new Date(),
      },
    });
  } else {
    // Cria novo usuário
    return await prisma.user.create({
      data: {
        id: clerkUser.id,
        ...userData,
      },
    });
  }
}

/**
 * Obtém o usuário atual do Clerk e sincroniza com o banco
 */
export async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  return await syncUser(clerkUser);
}

/**
 * Obtém um usuário do banco de dados por ID
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      lists: {
        orderBy: { updatedAt: 'desc' },
        take: 5,
      },
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { movie: true },
      },
      favorites: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { movie: true },
      },
      _count: {
        select: {
          lists: true,
          reviews: true,
          favorites: true,
          watchlist: true,
        },
      },
    },
  });
}

/**
 * Atualiza o perfil do usuário
 */
export async function updateUserProfile(
  id: string,
  data: { username?: string; bio?: string }
) {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}
