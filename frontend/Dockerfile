FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/default.conf
COPY --from=builder /app/build ./
EXPOSE 80
