FROM node:12-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

ARG HASURA_URL=${HASURA_URL}
ARG AUTH_API_URL=${AUTH_API_URL}
ARG TELEGRAM_BOT_NAME=${TELEGRAM_BOT_NAME}

RUN npm install && npm run build && npm prune --production

ENV NODE_ENV='production'
RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime", "pm.config.json"]