import TMDBAttribution from '@/components/TMDBAttribution';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Termos de Uso - Movie Spin
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Sobre o Movie Spin
              </h2>
              <p className="mb-4">
                O Movie Spin é uma plataforma de recomendação de filmes que
                utiliza gamificação para tornar a descoberta de novos filmes uma
                experiência divertida e envolvente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Dados de Filmes - TMDB
              </h2>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <TMDBAttribution variant="page" />
              </div>

              <div className="space-y-4">
                <p>
                  <strong>Fonte dos Dados:</strong> Todos os dados de filmes,
                  incluindo informações, sinopses, imagens e metadados, são
                  fornecidos pela The Movie Database (TMDB) através de suas APIs
                  públicas.
                </p>

                <p>
                  <strong>Disclaimer Obrigatório:</strong> Este website utiliza
                  TMDB e as APIs do TMDB, mas não é endossado, certificado ou
                  aprovado pelo TMDB.
                </p>

                <p>
                  <strong>Licenciamento:</strong> O Movie Spin utiliza os dados
                  do TMDB sob os termos de uso não-comerciais do TMDB. Este é um
                  projeto de desenvolvimento/portfólio sem fins lucrativos.
                </p>

                <p>
                  <strong>Atribuição:</strong> Conforme exigido pelos termos do
                  TMDB, toda utilização de dados é devidamente creditada e
                  inclui links para o TMDB como fonte original.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Uso Permitido</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Usar a plataforma para descobrir e explorar filmes</li>
                <li>Criar listas pessoais de filmes</li>
                <li>Avaliar e revisar filmes (funcionalidade futura)</li>
                <li>Compartilhar descobertas com outros usuários</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Uso Proibido</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Extrair ou fazer scraping massivo dos dados</li>
                <li>Redistribuir os dados do TMDB sem autorização</li>
                <li>Usar a plataforma para fins comerciais sem autorização</li>
                <li>Violar os termos de uso do TMDB</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Privacidade</h2>
              <p className="mb-4">
                O Movie Spin utiliza o Clerk para autenticação e não coleta
                dados pessoais além daqueles necessários para o funcionamento da
                plataforma. Consulte nossa política de privacidade para mais
                detalhes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Limitações de Responsabilidade
              </h2>
              <p className="mb-4">
                O Movie Spin é fornecido &quot;como está&quot; sem garantias.
                Não nos responsabilizamos pela precisão dos dados fornecidos
                pelo TMDB ou por qualquer dano decorrente do uso da plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
              <p>
                Para questões sobre estes termos ou sobre o uso do Movie Spin,
                entre em contato através do nosso sistema de suporte.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
