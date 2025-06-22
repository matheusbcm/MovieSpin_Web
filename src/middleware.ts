import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define rotas que requerem autenticação
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/lists(.*)',
  '/favorites(.*)',
  '/watchlist(.*)',
  '/reviews(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Se for uma rota protegida, requer autenticação
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    // Executar middleware em todas as rotas exceto arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas de API
    '/(api|trpc)(.*)',
  ],
};
