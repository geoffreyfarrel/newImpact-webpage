# Use the latest Node.js LTS version for better performance
FROM node:20-alpine AS base

# Set metadata
LABEL maintainer="geoffrey" version="1.0" description="impact-frontend"

# Set working directory inside the container
WORKDIR /impact-webpage-frontend

# Install dependencies separately for better caching
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy only necessary project files (ignoring `.git`, `.next`, etc.)
COPY . .

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=5010
ENV HOSTNAME=0.0.0.0

# Build the Next.js app
RUN npm run build

# Expose the port your app will run on
EXPOSE 5010

# Start the Next.js server
CMD ["npm", "run", "start"]
