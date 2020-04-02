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
