FROM node:14-alpine

ENV PORT 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

ARG HASURA_URL=${HASURA_URL}
ARG TELEGRAM_BOT_NAME=${TELEGRAM_BOT_NAME}

RUN npm install && npm run build && npm prune --production

ENV NODE_ENV='production'

EXPOSE 80
CMD npm run start