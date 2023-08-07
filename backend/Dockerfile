FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build # &&  npm run migrate:up

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist/
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
