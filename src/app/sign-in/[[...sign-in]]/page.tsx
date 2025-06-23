import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Movie Spin</h1>
          <p className="text-gray-300">Entre para descobrir filmes incríveis</p>
        </div>

        <div className="rounded-lg">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-none border-0',
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
                footerActionLink: 'text-purple-600 hover:text-purple-700',
              },
            }}
            routing="path"
            path="/sign-in"
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm">
            Novo no Movie Spin?{' '}
            <Link
              href="/sign-up"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Crie sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
