# Prepare base environment
FROM node:alpine AS base

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG APP_PORT=4000
ENV APP_PORT=${APP_PORT}

# Create app directory
WORKDIR /usr/src/app
EXPOSE 3000

# Prepare production environment
FROM base AS production

# Copy dependencies
COPY ["package.json", "tsconfig.json", "yarn.lock", ".npmrc", "./"]
COPY src ./src

# Prepare production application
RUN yarn global add pm2 typescript
RUN yarn install --frozen-lockfile
RUN yarn build

# Start production application
CMD [ "yarn", "start:prod" ]

# Prepare development environment
FROM base AS development
COPY . ./

# Prepare dev application
RUN yarn install

# Start dev application
CMD [ "yarn", "start:dev" ]
