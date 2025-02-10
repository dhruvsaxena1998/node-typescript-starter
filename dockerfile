# 1st Stage (Builder)
FROM node:lts-alpine3.20 AS builder
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# 2nd Stage (Server)
FROM node:lts-alpine3.20 AS server
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy dist, package.json, pnpm-lock.yaml and .env
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/.env /app/.env

# Install app dependencies
RUN pnpm install --prod

# Expose ports
EXPOSE 3000

# Command to run the server
CMD ["node", "./dist/src/index.js"]