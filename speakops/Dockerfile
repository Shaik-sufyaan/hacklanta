FROM oven/bun:1.2.8-alpine AS base
WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
COPY middleware.ts ./

RUN bun install
RUN bun run build

EXPOSE 3001

CMD ["bun", "run", "dist/index.js"]
