/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
require('dotenv').config();

module.exports = withPlugins(
  [
    [ withImages, { esModule: true } ],
  ], {
    exportTrailingSlash: true,
    env: {
      API_URL: process.env.API_URL,
      WS_URL: process.env.WS_URL,
      AUTH_API_URL: process.env.AUTH_API_URL,
      TELEGRAM_BOT_URL: process.env.TELEGRAM_BOT_URL,
      TELEGRAM_COMMUNITY_URL: process.env.TELEGRAM_COMMUNITY_URL,
      DOCS_URL: process.env.DOCS_URL,
      TERMS_URL: process.env.TERMS_URL,
      PRIVACY_URL: process.env.PRIVACY_URL,
      SUPPORT_URL: process.env.SUPPORT_URL,
      DEV_REFRESH_TOKEN: process.env.DEV_REFRESH_TOKEN,
      BOT_NAME: process.env.BOT_NAME,
      POLL_INTERVAL: process.env.POLL_INTERVAL
    }
  }
);
