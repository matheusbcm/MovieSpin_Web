import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Movie Spin</h1>
          <div className="flex items-center space-x-4">
            {userId ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-white mb-6">🎬 Movie Spin</h2>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Descubra filmes incríveis de forma divertida! Gire a roleta e
            encontre o filme perfeito para o seu humor.
          </p>

          {!userId && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/sign-up"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Começar Agora - Grátis
              </Link>
              <Link
                href="/sign-in"
                className="border border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Já tenho conta
              </Link>
            </div>
          )}

          {userId && (
            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Ir para Dashboard
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Spin Aleatório
            </h3>
            <p className="text-gray-300">
              Deixe a sorte decidir! Nossa roleta encontra filmes baseados no
              seu humor.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Personalizado
            </h3>
            <p className="text-gray-300">
              Recomendações inteligentes baseadas nos seus gostos e histórico.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Gamificação
            </h3>
            <p className="text-gray-300">
              Ganhe badges, complete desafios e compartilhe com amigos.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-20 text-center">
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              🚧 Em Desenvolvimento
            </h3>
            <p className="text-yellow-200">
              O Movie Spin está sendo desenvolvido! O sistema de autenticação já
              está funcionando. Em breve: roleta de filmes, listas
              personalizadas e muito mais.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Movie Spin - Descubra filmes de forma divertida
          </p>
        </div>
      </footer>
    </div>
  );
}
