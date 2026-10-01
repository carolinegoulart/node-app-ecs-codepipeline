FROM public.ecr.aws/docker/library/node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install prod dependencies only
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

RUN chmod +x docker/entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["docker/entrypoint.sh"]
