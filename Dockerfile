FROM node:20.17.0-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --omit=dev


FROM nginx:stable AS production

COPY --from=build /app/dist/vinojcic-com/browser/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
