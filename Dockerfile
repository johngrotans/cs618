FROM node:20 AS build
ARG VITE_BACKEND_URL=https://super-pancake-69qjpx9rxq6r26vj-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

# Start the SSR server
CMD ["npm", "start"]
