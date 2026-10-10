FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json tsconfig.base.json ./
COPY web/package.json web/package.json
COPY shared/package.json shared/package.json
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm --workspace shared run build
RUN npm --workspace web run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/web/.next ./web/.next
COPY --from=builder /app/web/package.json ./web/package.json
COPY --from=builder /app/web/next.config.js ./web/next.config.js
COPY --from=builder /app/web/public ./web/public
COPY --from=builder /app/shared ./shared
EXPOSE 3000
WORKDIR /app/web
CMD ["../node_modules/.bin/next", "start"]
