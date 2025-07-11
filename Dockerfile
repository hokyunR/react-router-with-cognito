FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Build the admin app
FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run -r build
RUN pnpm deploy --filter=web --prod /prod/web

# Production
FROM base AS web
COPY --from=build /prod/web /prod/web
WORKDIR /prod/web
EXPOSE 3000
CMD ["pnpm", "start"]
