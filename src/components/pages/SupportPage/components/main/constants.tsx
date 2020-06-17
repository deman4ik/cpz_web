import React from "react";
import Link from "next/link";
// constants
import { TELEGRAM_COMMUNITY_URL } from "config/constants";
//styles
import styles from "../../styles/Main.module.css";
import stylesMain from "components/pages/SupportPage/styles/Main.module.css";
// icons
import {
    RobotIcon,
    MultiLineChartIcon,
    TelegramIcon,
    AccountPlus,
    EmailIcon,
    TextSearch,
    PlayListCheck,
    MessageAlert,
    SheildKey,
    TextBoxSearch,
    PlusBox,
    Check
} from "assets/icons/svg";

/*icons constants*/
export const ICON_SIZE = 35;
export const ICON_COLOR = "#ffffff";
export const STEP_CARD_ICONS = {
    robots: <RobotIcon size={ICON_SIZE} color={ICON_COLOR} />,
    signals: <MultiLineChartIcon size={ICON_SIZE} color={ICON_COLOR} />,
    apiKey: <SheildKey size={ICON_SIZE} color={ICON_COLOR} />,
    community: <TelegramIcon size={ICON_SIZE} color={ICON_COLOR} />,
    accountPlus: <AccountPlus size={ICON_SIZE} color={ICON_COLOR} />,
    email: <EmailIcon size={ICON_SIZE} color={ICON_COLOR} />,
    textSearch: <TextSearch size={ICON_SIZE} color={ICON_COLOR} />,
    playCheck: <PlayListCheck size={ICON_SIZE} color={ICON_COLOR} />,
    messageAlert: <MessageAlert size={ICON_SIZE} color={ICON_COLOR} />,
    boxSearch: <TextBoxSearch size={ICON_SIZE} color={ICON_COLOR} />,
    plus: <PlusBox size={ICON_SIZE} color={ICON_COLOR} />,
    check: <Check size={ICON_SIZE} color={ICON_COLOR} />
};

/*steps card interface*/
export interface stepsCard {
    title: React.ReactNode | string;
    icon?: string;
}

/*Main steps cards*/
export const SIGNALS_CARDS: Array<stepsCard> = [
    {
        title: (
            <>
                Learn about manual сryptocurrency trading with{" "}
                <a href="https://support.cryptuoso.com/signals" className={styles.step_card_accent}>
                    Cryptuoso Signals
                </a>
            </>
        ),
        icon: "signals"
    },
    {
        title: (
            <>
                Choose robot for manual trading on{" "}
                <Link href="/signals/search">
                    <span className={styles.step_card_accent}>Signals Page</span>
                </Link>{" "}
                <a href="https://support.cryptuoso.com/signals#howtochooseasignalrobottofollow?">Learn how to here</a>
            </>
        ),
        icon: "textSearch"
    },
    {
        title: (
            <>
                Subscribe to Signal Robot and enter your trading amount{" "}
                <a
                    href="https://support.cryptuoso.com/signals#howtosubscribeonsignalsinourwebapp?"
                    className={styles.step_card_accent}>
                    Learn how to here
                </a>
            </>
        ),
        icon: "playCheck"
    },
    {
        title: (
            <>
                Wait for Signals and execute them on your exchange{" "}
                <Link href="/signals/search">
                    <span className={styles.step_card_accent}>Signals Page</span>
                </Link>
            </>
        ),
        icon: "messageAlert"
    },
    {
        title: (
            <>
                Add your Telegram account and turn on notifications on{" "}
                <Link href="/profile">
                    <span className={styles.step_card_accent}>Profile Page</span>
                </Link>{" "}
                to immediately receive signals
            </>
        ),
        icon: "community"
    }
];

/*Main steps cards*/
export const ROBOTS_CARDS: Array<stepsCard> = [
    {
        title: (
            <>
                Learn about automated сryptocurrency trading with{" "}
                <a href="https://support.cryptuoso.com/robots" className={styles.step_card_accent}>
                    Cryptuoso Robots
                </a>
            </>
        ),
        icon: "robots"
    },
    {
        title: (
            <>
                Generate your API Keys on your exchange and add them to your Cryptuoso Account.{" "}
                <a href="https://support.cryptuoso.com/exchange-accounts" className={styles.step_card_accent}>
                    Learn how to here
                </a>
            </>
        ),
        icon: "apiKey"
    },
    {
        title: (
            <>
                Choose robot for automated trading on{" "}
                <Link href="/robots/search">
                    <span className={styles.step_card_accent}>Robots Page</span>
                </Link>{" "}
                <a href="https://support.cryptuoso.com/robots#howtochoosearobot?">Learn how to here</a>
            </>
        ),
        icon: "textSearch"
    },
    {
        title: (
            <>
                Add chosen Robot, enter your trading amount and link it with your API Keys.{" "}
                <a
                    href="https://support.cryptuoso.com/robots#howtostartrobotinourwebapp?"
                    className={styles.step_card_accent}>
                    Learn how to here.
                </a>
            </>
        ),
        icon: "plus"
    },
    {
        title: <>Start Robot and wait for deals. Robot will do all trading automatically for you.</>,
        icon: "check"
    }
];

/*Telegram card*/
export const TG_CARD = {
    title: (
        <>
            Having common questions with signals or robots? Ask it in our{" "}
            <a href={TELEGRAM_COMMUNITY_URL} className={stylesMain.step_card_accent}>
                Telegram Community
            </a>{" "}
            and we will help you.
        </>
    ),
    icon: "community"
};

/*First not auth card*/
export const NOT_AUTH_CARD = {
    title: (
        <>
            Create your{" "}
            <Link href="/auth/login">
                <span className={stylesMain.step_card_accent}>Cryptuoso Account</span>
            </Link>{" "}
            with Telegram or Email
        </>
    ),
    icon: "accountPlus"
};

/*Second not auth card*/
export const NOT_AUTH_CARD_SECOND = {
    title: (
        <div>
            Can&apos;t create or activate your account? Send us email to{" "}
            <a href="mailto:support@cryptuoso.com" className={stylesMain.step_card_accent}>
                support@cryptuoso.com
            </a>
        </div>
    ),
    icon: "email"
};
