export const timeFrameFormat = {
    // Todo rename to constant name
    1: { count: 1, format: "minutes", abbr: "1m" },
    5: { count: 5, format: "minutes", abbr: "5m" },
    15: { count: 15, format: "minutes", abbr: "15m" },
    30: { count: 30, format: "minutes", abbr: "30m" },
    60: { count: 1, format: "hours", abbr: "1h" },
    120: { count: 2, format: "hours", abbr: "2h" },
    240: { count: 4, format: "hours", abbr: "4h" },
    480: { count: 8, format: "hours", abbr: "8h" },
    720: { count: 12, format: "hours", abbr: "12h" },
    1440: { count: 1, format: "days", abbr: "1d" }
};

export const nearestTrades = [
    // Todo rename to constant name
    { y: 1000, type: "closeLong" },
    { y: 1455, type: "short" }
];

export const DISPLAY_CLOSED_POSITIONS = 50;

export const SCREEN_TYPE = {
    BIGGEST: 1320,
    WIDE: 1200,
    DESKTOP: 992,
    TABLET: 768,
    PHONE: 480,
    SMALLEST: 320
};

export const MIN_NAME_LENGTH = 3;
export const MIN_PASSWORD_LENGTH = 6;
export const SECRET_CODE_LENGTH = 6;

export const LOCALHOST = "127.0.0.1";
//export const LOCALHOST = '127.0.0.1';

export const POLL_INTERVAL = +process.env.POLL_INTERVAL || 10000;
export const DOCS_URL = "https://support.cryptuoso.com";
export const TERMS_URL = "/terms-of-use";
export const PRIVACY_URL = "/privacy-policy";
export const SUPPORT_URL = "/support";
export const TELEGRAM_COMMUNITY_URL = "https://t.me/joinchat/ACVS-0zaWVBgAYm8gOKYHA";

export const color = {
    white: "#FFFFFF",
    black: "#000000",
    dark: "#242B4A",
    bg: "#091943",
    darkBg: "#1f233f",
    lightBg: "#2C3454",
    primary: "#0B98C5",
    secondary: "#5BECAE",
    accent: "#6987B9",
    danger: "#FF8B75",
    warn: "#FFF2BC",
    positive: "#1CA46B",
    negative: "#CD3E60",
    lightRed: "#CC6FA3",
    lightGreen: "#70e2bc",
    yellow: "#FEE338",
    rgba: {
        white: "rgba(255, 255, 255, 0.7)",
        whiteLight: "rgba(255, 255, 255, 0.15)",
        dark: "rgba(36, 43, 74, 0.7)",
        primary: "rgba(105, 135, 185, 0.2)"
    }
};

export const STATUS_COLORS = {
    started: color.positive,
    stopped: color.negative,
    paused: color.yellow
};

/*Регулярки*/
export const REGEXS = {
    telegram_id: /^\d{9}/g,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};

export const globalAny: any = global;

/*Роуты с аутентификацией*/
export const AUTH_ROUTES = ["/auth/signup", "/auth/login"];
export const MANAGE_ROUTES = [
    "/manage",
    "/manage/users",
    "/manage/robots",
    "/manage/user_signals",
    "/manage/user_robots",
    "/manage/support"
];

/*массив исключений для доступности роутов*/
export const ROUTES: Array<string> = [
    ...AUTH_ROUTES,
    "/profile",
    "/notifications",
    "/signals",
    "/robots",
    "/signals/search",
    "/robots/search",
    "/signals/robot/",
    "/robots/robot/",
    "/support"
];

export enum ROBOTS_AVAILABLE_CODES {
    No,
    Manager = 5,
    VIP = 10,
    User = 15,
    Anonymous = 20
}

export type VolumeDisplayUnits = {
    currency: string;
    asset: string;
};

export const httpErrors = {
    JWTError: "invalid-jwt"
};
