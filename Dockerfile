FROM node:12.4.0-alpine as build
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest AS deploy
EXPOSE 80
COPY --from=build /app/public /usr/share/nginx/html