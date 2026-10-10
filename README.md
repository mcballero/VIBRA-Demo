# ThirdSpace AI

Production-ready monorepo for a personalized real-world experience recommender across mobile, web, and API surfaces.

## Stack

- `backend/`: NestJS API with JWT auth, Prisma, PostgreSQL, pgvector, Redis-backed feed caching
- `web/`: Next.js marketing site, auth pages, and feed preview
- `mobile/`: Expo React Native app with onboarding, swipeable feed, event detail, RSVP/feedback UI
- `shared/`: Shared TypeScript contracts used across clients and backend
- `docker-compose.yml`: Postgres with pgvector, Redis, backend, and web containers

## Core capabilities

- User onboarding with interests and preferences
- Personalized event feed
- Event detail pages
- RSVP system
- Feedback system (`LIKE`, `DISLIKE`, `ATTENDED`)
- Deterministic recommendation engine:
  - `+40` category matches a user interest
  - `+30` event is within 5 km
  - `+20` similar users liked it
  - `+10` event is trending
- Top 20 feed results cached in Redis per user

## Architecture notes

- Modular NestJS backend with `auth`, `users`, `events`, `recommendations`, and `engagement` modules
- PostgreSQL schema includes `users`, `events`, `rsvps`, and `feedback`
- `pgvector` columns store mock embeddings for users and events
- SQL indexes cover:
  - geo lookups via GiST point indexes
  - `user_id` lookups
  - category filtering
- Shared contracts reduce drift between mobile, web, and API payloads
- Redis cache keys are stored as `feed:{userId}`

## API surface

- `POST /auth/signup`
- `POST /auth/login`
- `GET /feed`
- `GET /events`
- `GET /events/:id`
- `POST /rsvp`
- `POST /feedback`

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start infrastructure

```bash
docker compose up -d postgres redis
```

### 3. Configure backend environment

```bash
cp backend/.env.example backend/.env
```

### 4. Generate Prisma client and apply schema

```bash
npm --workspace backend run prisma:generate
npm --workspace backend run prisma:migrate
```

### 5. Seed example events

```bash
npm --workspace backend run seed
```

### 6. Run apps

```bash
npm run dev:backend
npm run dev:web
npm run dev:mobile
```

## Full Docker workflow

```bash
docker compose up --build
```

This starts:

- API on `http://localhost:4000`
- Web app on `http://localhost:3000`
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

## Monorepo layout

```text
.
├── backend
│   ├── prisma
│   └── src
├── mobile
│   └── src
├── shared
│   └── src
├── web
│   └── src
├── docker-compose.yml
└── README.md
```

## Recommendation engine behavior

`backend/src/recommendations/recommendations.service.ts` computes a deterministic score per event and adds small tie-breakers from popularity and distance to keep ranking stable. Results are sorted descending by score, limited to 20, and cached in Redis for 5 minutes.

## Scalability direction

- Stateless API containers behind a load balancer
- Redis used as a feed cache and future hot-key/session layer
- Postgres + indexes sized for high-volume read workloads
- Shared package enables multiple clients to evolve consistently
- Recommendation service isolated so embeddings retrieval and offline ranking jobs can be upgraded later without changing client contracts

## Suggested next steps

- Add refresh tokens and password reset flows
- Move mock embeddings to async generation jobs
- Add observability: OpenTelemetry, structured logs, tracing
- Add background workers for feed precomputation and trending aggregation
- Add integration tests for auth, feed ranking, and engagement invalidation
