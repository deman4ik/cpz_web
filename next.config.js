/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
require("dotenv").config();

module.exports = withPlugins([[withImages, { esModule: true }]], {
    env: {
        HASURA_URL: process.env.HASURA_URL,
        AUTH_API_URL: process.env.AUTH_API_URL,
        TELEGRAM_BOT_NAME: process.env.TELEGRAM_BOT_NAME,
        DEV_REFRESH_TOKEN: process.env.DEV_REFRESH_TOKEN,
        POLL_INTERVAL: process.env.POLL_INTERVAL,
    },
});
