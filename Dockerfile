FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN npm i -g turbo
WORKDIR /app

#FROM node:18-slim AS order-pod-builder
#WORKDIR /app
#
#COPY . .

#ENV NODE_ENV=production
#ARG ENV
#COPY deploy/$ENV/.env.$ENV .env
#
#RUN npm install -g pnpm
#RUN pnpm install
#RUN pnpm build


FROM base AS order-pod-builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

FROM node:18-slim AS order-pod-runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=order-pod-builder /app/next.config.mjs ./
COPY --from=order-pod-builder /app/package.json ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=order-pod-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=order-pod-builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=order-pod-builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000

CMD node server.js