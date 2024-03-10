FROM node:20.11.1 AS build
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . ./
RUN npm run build
RUN npm prune

FROM node:20.11.1-alpine
WORKDIR /app
COPY --from=build /app/.output /app/.output
CMD ["node", ".output/server/index.mjs"]
