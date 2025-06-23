import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Movie Spin</h1>
          <p className="text-gray-300">Junte-se à nossa comunidade cinéfila</p>
        </div>

        <div className="rounded-lg">
          <SignUp
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
            path="/sign-up"
            redirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm">
            Já tem uma conta?{' '}
            <Link
              href="/sign-in"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
