import { StepProps, TradingStepType } from './types';

export const supportContent = () => (
  [
    {
      icon: 'help',
      iconColor: '#5BECAE', //secondary
      title: 'Documentation',
      text: 'Learn all about Cryptuoso Platform.\n How to use and configure signals, robots and exchange accounts.',
      button: 'DOCUMENTATION',
      buttonType: 'outline-secondary',
      href: process.env.DOCS_URL
    },
    {
      icon: 'telegram',
      iconColor: '#0B98C5', //primary
      title: 'Telegram \n Community',
      text: 'Having common questions with signals or robots? \n Ask your question in our Community Group and we will help you.',
      button: 'Telegram Community',
      buttonType: 'outline-primary',
      href: process.env.TELEGRAM_COMMUNITY_URL
    },
    {
      icon: 'robot',
      iconColor: '#FFF2BC', //warn
      title: 'Telegram Bot',
      text: 'Have a personal problem regarding connecting an exchange or billing? \n Use support section in our Telegram Bot.',
      button: 'TELEGRAM BOT',
      buttonType: 'outline-warn',
      href: process.env.TELEGRAM_BOT_URL
    }
  ]
);

export const steps: StepProps[] = [
  { date: '2017', title: 'Public Trading\nSignals' },
  { date: '2018', title: 'Cryptuoso\nTrading Engine' },
  { date: 'Q2 2019', title: 'Cryptuoso\nLanding Page' },
  { date: 'Q3 2019', title: 'Premium individual trading\nfor private investors' },
  { date: 'Q4 2019', title: 'Cryptuoso Trading\nTelegram Bot (Beta)' },
  { date: 'Q1 2020', title: 'Cryptuoso Trading\nWeb App (Beta)' },
  { date: 'Q2 2020', title: 'Cryptuoso Trading\nMobile App (Beta)' },
];

export const tradingSteps: TradingStepType[] = [
  {
    accent: 'Inspect',
    text: ' robots public statistics we collected on over 2,5 years of trading in&nbsp;the cryptocurrency market.'
  },
  {
    accent: 'Choose',
    text: ' your favorite robots for work on long term or medium-term intervals.'
  },
  {
    accent: 'Combine',
    text: ' robots into a single unit as&nbsp;a&nbsp;portfolio of automated trading systems.'
  }
];

export const descriptionRobots = [
  {
    imgStyle: { width: 52, height: 52 },
    title: 'Automatic',
    text: 'All robots work in the cloud in 24/7 mode and do not require installation software on your computer. Thus, signals and transactions will not be missed and you can monitor trading with any device.'
  },
  {
    imgStyle: { width: 72, height: 48 },
    title: 'Instant',
    text: 'Cryptocurrency markets are very volatile and often require immediate decision making. The robot instantly reacts to market fluctuations and uses both stop loss and market orders according to algorithms to minimize drawdown.'
  },
  {
    imgStyle: { width: 50, height: 52 },
    title: 'Secure',
    text: 'The robots use customizable API exchange keys, which only allow make deals but not manage your account. We store your keys in secure encrypted storage.'
  },
  {
    imgStyle: { width: 49, height: 52 },
    title: 'Simple',
    text: 'Just add your exchange account and subscribe to robots for transactions. Complete a few steps and you&apos;re done.'
  }
];
