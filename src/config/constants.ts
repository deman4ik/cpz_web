
export const timeFrameFormat = {
  // Todo rename to constant name
  1: { count: 1, format: 'minutes', abbr: '1m' },
  5: { count: 5, format: 'minutes', abbr: '5m' },
  15: { count: 15, format: 'minutes', abbr: '15m' },
  30: { count: 30, format: 'minutes', abbr: '30m' },
  60: { count: 1, format: 'hours', abbr: '1h' },
  120: { count: 2, format: 'hours', abbr: '2h' },
  240: { count: 4, format: 'hours', abbr: '4h' },
  480: { count: 8, format: 'hours', abbr: '8h' },
  720: { count: 12, format: 'hours', abbr: '12h' },
  1440: { count: 1, format: 'days', abbr: '1d' }
};

export const nearestTrades = [
  // Todo rename to constant name
  { y: 1000, type: 'closeLong' },
  { y: 1455, type: 'short' }
];

// export const IS_WEB = Platform.OS === 'web';
// export const IS_ANDROID = Platform.OS === 'android';
// export const IS_IOS = Platform.OS === 'ios';

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

export const LOCALHOST = 'localhost:3000';
//export const LOCALHOST = '127.0.0.1:80';

export const POLL_INTERVAL = +process.env.POLL_INTERVAL || 10000;
