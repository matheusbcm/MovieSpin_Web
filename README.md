# 🎬 Movie Spin

Sistema de recomendação de filmes com gamificação, desenvolvido com Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma e PostgreSQL.

## 🚀 Status do Projeto

### ✅ TICKET #004 - Sistema de Autenticação - CONCLUÍDO

Implementação completa do sistema de autenticação com **Clerk**:

- ✅ **Instalação e Configuração**: @clerk/nextjs e svix
- ✅ **ClerkProvider**: Integrado no layout principal
- ✅ **Middleware de Proteção**: Rotas protegidas e públicas
- ✅ **Páginas de Autenticação**: Sign-in e Sign-up personalizadas
- ✅ **Integração com Prisma**: Sincronização automática de usuários
- ✅ **Webhooks**: Endpoints para manter dados sincronizados
- ✅ **Dashboard**: Interface para usuários autenticados
- ✅ **Home Page**: Landing page com navegação condicional

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Autenticação**: Clerk (OAuth + Email/Password)
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Qualidade de Código**: ESLint, Prettier, Husky, lint-staged
- **Testes**: Jest, Testing Library
- **Deploy**: Vercel

## 🎯 Funcionalidades Implementadas

### Autenticação e Usuários

- Login/Registro com email e senha
- OAuth com Google e GitHub
- Proteção de rotas autenticadas
- Gerenciamento de sessão
- Dashboard personalizado
- Sincronização automática com banco de dados

### Infraestrutura

- Pipeline CI/CD com Vercel
- Qualidade de código com ESLint + Prettier
- Pre-commit hooks com Husky
- Testes automatizados
- Schema de banco completo

## 🔧 Configuração

### 1. Clonar e Instalar Dependências

```bash
git clone <repository-url>
cd movie-spin
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no exemplo:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/movie_spin"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Configurar Banco de Dados

```bash
# Executar migrações
npx prisma db push

# (Opcional) Popular com dados de exemplo
npx prisma db seed
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

## 📚 Documentação

- [Sistema de Autenticação](./docs/CLERK_AUTHENTICATION.md) - Guia completo do Clerk
- [Schema do Banco](./docs/DATABASE.md) - Estrutura e relacionamentos
- [Plano de Ação](./docs/PLANO_DE_ACAO_MOVIE_SPIN.md) - Roadmap completo

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Executar em desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run lint         # Verificar qualidade do código
npm run format       # Formatar código
npm run test         # Executar testes
npm run db:generate  # Gerar cliente Prisma
npm run db:push      # Aplicar mudanças no banco
npm run db:seed      # Popular banco com dados de exemplo
```

## 🎯 Próximos Passos

1. **TICKET #005**: Integração com API do TMDB
2. **TICKET #006**: Sistema de roleta de filmes
3. **TICKET #007**: Gerenciamento de listas de filmes
4. **TICKET #008**: Sistema de reviews e avaliações

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Movie Spin** - Descubra filmes de forma divertida! 🎬✨
