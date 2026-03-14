# ====================
# NestJS Dockerfile
# ====================
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Expose container port
EXPOSE 3000

# Start app directly with Node (avoids npm SIGTERM issue)
CMD ["node", "dist/main"]