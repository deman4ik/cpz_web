import { StepProps, TradingStepType, DescriptionRobotsType, DescriptionFirstLineType } from "./types";
import { DOCS_URL, TELEGRAM_COMMUNITY_URL, color } from "config/constants";

export const supportContent = [
    {
        icon: "help",
        iconColor: color.secondary, //secondary
        title: "Documentation",
        text: "Learn all about Cryptuoso Robots.\n How to configure and use signals, robots and exchange accounts.",
        button: "DOCUMENTATION",
        buttonType: "outline-secondary",
        href: DOCS_URL
    },
    {
        icon: "telegram",
        iconColor: color.primary, //primary
        title: "Telegram \n Community",
        text:
            "Have questions about signals or robots? \n Ask your question in our Community Group and we will help you.",
        button: "Telegram Community",
        buttonType: "outline-primary",
        href: TELEGRAM_COMMUNITY_URL
    },
    {
        icon: "robot",
        iconColor: color.warn, //warn
        title: "Telegram Bot",
        text:
            "Have a personal problem regarding connecting an exchange or billing? \n Use support section in our Telegram Bot.",
        button: "TELEGRAM BOT",
        buttonType: "outline-warn",
        href: `https://t.me/${process.env.TELEGRAM_BOT_NAME}`
    }
];

export const steps: StepProps[] = [
    { date: "2017", title: "Public Trading\nSignals" },
    { date: "2018", title: "Cryptuoso\nTrading Engine (Alpha)" },
    { date: "Q2 2019", title: "Cryptuoso\nLanding Page" },
    {
        date: "Q3 2019",
        title: "Premium individual trading\nfor private investors"
    },
    { date: "Q4 2019", title: "Cryptuoso Trading\nTelegram Bot (Beta)" },
    { date: "Q2 2020", title: "Cryptuoso Trading\nWeb App (Beta)" },
    { date: "Q4 2020", title: "Cryptuoso Trading\nRobots (Release)" },
    { date: "Q1 2021", title: "Cryptuoso Trading\nMobile App (Beta)" }
];

export const tradingSteps: TradingStepType[] = [
    {
        accent: "Inspect",
        text: " robots' public statistics we've collected in over 2,5 years of trading on the cryptocurrency market."
    },
    {
        accent: "Choose",
        text: " your favorite robots to work in long-term or medium-term intervals."
    },
    {
        accent: "Combine",
        text: " robots into a single unit as a portfolio of automated trading systems."
    }
];

export const descriptionRobots: DescriptionRobotsType[] = [
    {
        imgStyle: { width: 52, height: 52 },
        title: "Reliable",
        text:
            "Robots are cloud-based and do not require installation of software on your computer. Thus, signals and transactions will never be missed, and you can use any device to monitor your trading performance."
    },
    {
        imgStyle: { width: 72, height: 48 },
        title: "Instant",
        text:
            "Cryptocurrency markets are very volatile and often require immediate decision making. Robots instantly react to market fluctuations and use both stop-loss and market orders according to algorithms to minimize potential drawdown."
    },
    {
        imgStyle: { width: 50, height: 52 },
        title: "Secure",
        text:
            "Our robots use customizable API exchange keys, which allow to make deals, but not to manage your account. We store your keys in a secure, encrypted storage."
    },
    {
        imgStyle: { width: 49, height: 52 },
        title: "Simple",
        text:
            "Just add your exchange account and subscribe to robots for transactions. Complete a few steps and you are done."
    }
];

export const descriptionFirstLine: DescriptionFirstLineType[] = [
    {
        imgStyle: { width: 250, height: 120 },
        imgSrc: "signals",
        title: "Receive Signals",
        text:
            "Use robot signals as indicators for trading and trade manually. You will be able to view the approximate statistics of your trade with signals in your account."
    },
    {
        imgStyle: { width: 250, height: 120 },
        imgSrc: "robots",
        title: "Automatic Trading",
        text:
            "Connect your cryptocurrency exchange account (Binance, Bitfinex, Kraken) to our robots for automatic trading. Robots execute all deals for you, so you only need to keep track of the current positions and your trading performance."
    }
];

export const pricingContent = [
    {
        icon: "planet",
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        title: "1 months",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        button: "Get started",
        buttonType: "outline-warn",
        href: "#"
    },
    {
        icon: "planet",
        iconColors: { colorFrom: "#979797", colorTo: "#E5E5E5" },
        title: "3 months",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        button: "Get started",
        buttonType: "outline-primary",
        href: "#"
    },
    {
        icon: "planet",
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        title: "6 months",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        button: "Get started",
        buttonType: "outline-secondary",
        href: "#"
    },
    {
        icon: "planet",
        iconColors: { colorFrom: "#979797", colorTo: "#E5E5E5" },
        title: "1 year",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        button: "Get started",
        buttonType: "outline-warn",
        href: "#"
    },
    {
        icon: "planet",
        iconColors: { colorFrom: "#74C2FB", colorTo: "#248BD6" },
        title: "2 years",
        text: `Daily Signals from our Robots
            Telegram public channel
            Instagram public page
            Telegram Community Support
            Web Community Chat Support`,
        button: "Get started",
        buttonType: "outline-primary",
        href: "#"
    }
];
