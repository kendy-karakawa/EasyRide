# Etapa 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
EXPOSE 80
CMD ["npm", "run", "start", "--", "-p", "80"]
