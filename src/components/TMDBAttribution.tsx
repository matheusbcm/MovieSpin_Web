import Image from 'next/image';

interface TMDBAttributionProps {
  variant?: 'footer' | 'inline' | 'page';
  className?: string;
}

export default function TMDBAttribution({
  variant = 'footer',
  className = '',
}: TMDBAttributionProps) {
  const baseClasses =
    'flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400';

  const variantClasses = {
    footer: 'flex-col sm:flex-row text-center sm:text-left',
    inline: 'flex-row',
    page: 'flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="flex items-center gap-2">
        <span>Powered by</span>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-80 transition-opacity"
          aria-label="The Movie Database"
        >
          <Image
            src="/tmdb-logo.svg"
            alt="TMDB Logo"
            width={64}
            height={32}
            className="h-6 w-auto"
          />
        </a>
      </div>

      <div className="text-xs leading-relaxed max-w-2xl">
        <p>
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}

/**
 * Compact version for footers
 */
export function TMDBAttributionCompact({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1 text-xs text-gray-500 ${className}`}
    >
      <span>Data by</span>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center hover:opacity-80 transition-opacity"
        aria-label="The Movie Database"
      >
        <Image
          src="/tmdb-logo.svg"
          alt="TMDB"
          width={48}
          height={24}
          className="h-4 w-auto"
        />
      </a>
    </div>
  );
}
