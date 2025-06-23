import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/user';
import { TMDBAttributionCompact } from '@/components/TMDBAttribution';

export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect to sign-in if not authenticated
  if (!userId) {
    redirect('/sign-in');
  }

  // Sync user with database
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Movie Spin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo{user?.firstName ? `, ${user.firstName}` : ''} ao Movie
            Spin! 🎬
          </h2>
          <p className="text-gray-600">
            Sua plataforma personalizada para descobrir filmes incríveis.
          </p>
          {user && (
            <div className="mt-4 text-sm text-gray-500">
              <p>👤 Conectado como: {user.email}</p>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎲</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Spin Aleatório
                </h3>
                <p className="text-sm text-gray-500">Descubra algo novo</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Favoritos</h3>
                <p className="text-sm text-gray-500">Seus filmes favoritos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Listas</h3>
                <p className="text-sm text-gray-500">Suas coleções</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
                <p className="text-sm text-gray-500">Suas avaliações</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Em Desenvolvimento</h3>
          <p className="text-lg mb-6">
            Estamos trabalhando nas funcionalidades principais do Movie Spin. Em
            breve você poderá:
          </p>
          <ul className="space-y-2 text-sm">
            <li>• Girar a roleta para descobrir filmes personalizados</li>
            <li>• Criar e gerenciar suas listas de filmes</li>
            <li>• Avaliar e revisar filmes</li>
            <li>• Compartilhar descobertas com amigos</li>
            <li>• Ganhar badges e conquistas</li>
          </ul>
        </div>

        {/* TMDB Attribution */}
        <div className="flex justify-center pt-6">
          <TMDBAttributionCompact />
        </div>
      </main>
    </div>
  );
}
