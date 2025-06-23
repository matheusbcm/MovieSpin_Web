# Configuração do Ambiente - Movie Spin

## Variáveis de Ambiente Necessárias

### 1. Clerk Authentication (Obrigatório)

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 2. TMDB API (Obrigatório)

```bash
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
```

**Como obter a API key do TMDB:**

1. Acesse https://www.themoviedb.org/
2. Crie uma conta gratuita
3. Vá em Settings > API
4. Solicite uma API Key (escolha "Developer")
5. Preencha os dados como projeto pessoal/educacional
6. Copie a API Key v3 (não o Access Token)

**⚠️ IMPORTANTE**: Use `TMDB_API_KEY` (sem `NEXT_PUBLIC_`) para maior segurança.
Esta variável fica no servidor e não é exposta no navegador.

### 3. Database (Obrigatório)

```bash
DATABASE_URL="file:./dev.db"
```

## Arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# TMDB API
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Database
DATABASE_URL="file:./dev.db"
```

## Compliance TMDB

⚠️ **IMPORTANTE**: O Movie Spin está registrado como uso "pessoal/educacional" no TMDB.
Antes de qualquer monetização, será necessário:

1. Contactar TMDB para acordo comercial
2. Implementar atribuição adequada (já implementado)
3. Respeitar limites de cache (6 meses máximo)

## Verificação

Após configurar as variáveis:

```bash
npm run build
```

Se o build for bem-sucedido, o ambiente está configurado corretamente.

## Testando as APIs

Após iniciar o servidor (`npm run dev`), você pode testar:

```bash
# Filmes populares
curl "http://localhost:3000/api/movies/popular"

# Buscar filmes (parâmetro "q" obrigatório)
curl "http://localhost:3000/api/movies/search?q=batman"

# Detalhes de um filme específico
curl "http://localhost:3000/api/movies/155"  # The Dark Knight

# Sistema de spin (para roleta)
curl "http://localhost:3000/api/movies/spin"
```
