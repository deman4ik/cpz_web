require("dotenv").config();

module.exports = {
    env: {
        HASURA_URL: process.env.HASURA_URL,
        AUTH_API_URL: process.env.AUTH_API_URL,
        TELEGRAM_BOT_NAME: process.env.TELEGRAM_BOT_NAME,
        DEV_REFRESH_TOKEN: process.env.DEV_REFRESH_TOKEN,
        POLL_INTERVAL: process.env.POLL_INTERVAL,
        ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
        DEBUG_MODE: process.env.DEBUG_MODE
    },
    poweredByHeader: false,
    trailingSlash: true
};
