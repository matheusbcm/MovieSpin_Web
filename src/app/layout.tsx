import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Montserrat,
  Lora,
  Hind_Madurai,
} from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

const hindMadurai = Hind_Madurai({
  variable: '--font-hind',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Movie Spin - Descubra Filmes de Forma Divertida',
  description:
    'Gire a roleta e descubra filmes personalizados para o seu humor. Sistema de recomendação com gamificação.',
  keywords: 'filmes, recomendação, cinema, entretenimento, gamificação',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${lora.variable} ${hindMadurai.variable} antialiased min-h-screen flex flex-col`}
        >
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
